const REQUIRED_TRACEABILITY_ROOT_KEYS = ['schema_version', 'generated_at', 'contracts'];
const REQUIRED_TRACEABILITY_CONTRACT_KEYS = [
  'contract_id',
  'source_path',
  'source_range',
  'spec_path',
  'verification_cmd',
  'last_verified_sha',
  'inference_flag',
];

const REQUIRED_NO_SPEC_IMPACT_KEYS = ['change_id', 'pr_ref', 'touched_src_paths', 'rationale', 'reviewer', 'date'];

export const REQUIRED_CI_WORKFLOW_NAME = 'spec-governance-gate';
export const REQUIRED_CI_JOB_ID = 'verify-spec-governance';
export const REQUIRED_CI_COMMAND = 'npm run verify:spec-governance';

const isPlainObject = (value) => Object.prototype.toString.call(value) === '[object Object]';

const isNonEmptyString = (value) => typeof value === 'string' && value.trim().length > 0;

const normalizeScalar = (value) => {
  const trimmed = value.trim();
  const quoteMatch = trimmed.match(/^(["'])(.*)\1$/);
  if (quoteMatch) {
    return quoteMatch[2];
  }
  return trimmed;
};

const normalizePathSet = (paths) =>
  new Set(
    (paths ?? [])
      .map((path) => (typeof path === 'string' ? path.trim() : ''))
      .filter(Boolean),
  );

const isIsoDateTimeString = (value) => {
  if (!isNonEmptyString(value)) {
    return false;
  }
  if (Number.isNaN(Date.parse(value))) {
    return false;
  }
  return /\d{4}-\d{2}-\d{2}T/.test(value);
};

const isIsoDateString = (value) => {
  if (!isNonEmptyString(value)) {
    return false;
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }
  return !Number.isNaN(Date.parse(`${value}T00:00:00Z`));
};

export function validateTraceabilityContractShape(traceability) {
  const errors = [];

  if (!isPlainObject(traceability)) {
    return {
      ok: false,
      errors: ['Traceability contract root must be an object.'],
    };
  }

  for (const key of REQUIRED_TRACEABILITY_ROOT_KEYS) {
    if (!(key in traceability)) {
      errors.push(`Missing required root key: ${key}`);
    }
  }

  if (!isNonEmptyString(traceability.schema_version)) {
    errors.push('schema_version must be a non-empty string.');
  }

  if (!isIsoDateTimeString(traceability.generated_at)) {
    errors.push('generated_at must be a valid ISO-8601 datetime string.');
  }

  if (!Array.isArray(traceability.contracts) || traceability.contracts.length === 0) {
    errors.push('contracts must be a non-empty array.');
  }

  if (Array.isArray(traceability.contracts)) {
    for (const [index, contract] of traceability.contracts.entries()) {
      if (!isPlainObject(contract)) {
        errors.push(`contracts[${index}] must be an object.`);
        continue;
      }

      for (const key of REQUIRED_TRACEABILITY_CONTRACT_KEYS) {
        if (!(key in contract)) {
          errors.push(`contracts[${index}] missing required key: ${key}`);
        }
      }

      if (!isNonEmptyString(contract.contract_id)) {
        errors.push(`contracts[${index}].contract_id must be a non-empty string.`);
      }

      if (!isNonEmptyString(contract.source_path) || !contract.source_path.startsWith('src/')) {
        errors.push(`contracts[${index}].source_path must start with "src/".`);
      }

      if (!isNonEmptyString(contract.source_range)) {
        errors.push(`contracts[${index}].source_range must be a non-empty string.`);
      }

      if (!isNonEmptyString(contract.spec_path) || !contract.spec_path.startsWith('spec/')) {
        errors.push(`contracts[${index}].spec_path must start with "spec/".`);
      }

      if (!isNonEmptyString(contract.verification_cmd)) {
        errors.push(`contracts[${index}].verification_cmd must be a non-empty string.`);
      }

      if (!isNonEmptyString(contract.last_verified_sha)) {
        errors.push(`contracts[${index}].last_verified_sha must be a non-empty string.`);
      }

      if (typeof contract.inference_flag !== 'boolean') {
        errors.push(`contracts[${index}].inference_flag must be a boolean.`);
      }
    }
  }

  return {
    ok: errors.length === 0,
    errors,
  };
}

export function parseNoSpecImpactYaml(yamlText) {
  const errors = [];

  if (!isNonEmptyString(yamlText)) {
    return {
      ok: false,
      data: null,
      errors: ['no-spec-impact YAML must be non-empty text.'],
    };
  }

  const lines = yamlText.split(/\r?\n/);
  const data = {};
  let lineIndex = 0;

  while (lineIndex < lines.length) {
    const rawLine = lines[lineIndex];
    const trimmed = rawLine.trim();

    if (!trimmed || trimmed.startsWith('#')) {
      lineIndex += 1;
      continue;
    }

    if (/^\s/.test(rawLine)) {
      errors.push(`Unexpected indentation at line ${lineIndex + 1}: ${rawLine}`);
      lineIndex += 1;
      continue;
    }

    const keyMatch = rawLine.match(/^([a-z_]+):(.*)$/);
    if (!keyMatch) {
      errors.push(`Invalid YAML mapping at line ${lineIndex + 1}: ${rawLine}`);
      lineIndex += 1;
      continue;
    }

    const [, key, rawValue] = keyMatch;

    if (!REQUIRED_NO_SPEC_IMPACT_KEYS.includes(key)) {
      errors.push(`Unknown top-level key: ${key}`);
    }

    if (Object.hasOwn(data, key)) {
      errors.push(`Duplicate top-level key: ${key}`);
    }

    if (key === 'touched_src_paths') {
      if (rawValue.trim().length > 0) {
        errors.push('touched_src_paths must be declared as a YAML list on following lines.');
      }

      const paths = [];
      lineIndex += 1;

      while (lineIndex < lines.length) {
        const listLine = lines[lineIndex];
        const listTrimmed = listLine.trim();

        if (!listTrimmed || listTrimmed.startsWith('#')) {
          lineIndex += 1;
          continue;
        }

        if (!/^\s/.test(listLine)) {
          break;
        }

        const itemMatch = listLine.match(/^\s*-\s+(.+)$/);
        if (!itemMatch) {
          errors.push(`Invalid touched_src_paths list item at line ${lineIndex + 1}: ${listLine}`);
          lineIndex += 1;
          continue;
        }

        paths.push(normalizeScalar(itemMatch[1]));
        lineIndex += 1;
      }

      data[key] = paths;
      continue;
    }

    const scalarValue = normalizeScalar(rawValue);
    if (!isNonEmptyString(scalarValue)) {
      errors.push(`Key ${key} must have a non-empty value.`);
    }

    data[key] = scalarValue;
    lineIndex += 1;
  }

  for (const key of REQUIRED_NO_SPEC_IMPACT_KEYS) {
    if (!(key in data)) {
      errors.push(`Missing required key: ${key}`);
    }
  }

  if (Array.isArray(data.touched_src_paths)) {
    if (data.touched_src_paths.length === 0) {
      errors.push('touched_src_paths must contain at least one src/** path.');
    }

    for (const [index, path] of data.touched_src_paths.entries()) {
      if (!isNonEmptyString(path) || !path.startsWith('src/')) {
        errors.push(`touched_src_paths[${index}] must start with "src/".`);
      }
    }
  }

  if ('date' in data && !isIsoDateString(data.date)) {
    errors.push('date must use YYYY-MM-DD format.');
  }

  for (const scalarKey of ['change_id', 'pr_ref', 'rationale', 'reviewer']) {
    if (scalarKey in data && !isNonEmptyString(data[scalarKey])) {
      errors.push(`${scalarKey} must be a non-empty string.`);
    }
  }

  return {
    ok: errors.length === 0,
    data,
    errors,
  };
}

export function validateExactPathCoverage(changedSrcPaths, declaredSrcPaths) {
  const changed = normalizePathSet(changedSrcPaths);
  const declared = normalizePathSet(declaredSrcPaths);

  const missing = [...changed].filter((path) => !declared.has(path)).sort();
  const extra = [...declared].filter((path) => !changed.has(path)).sort();

  return {
    ok: missing.length === 0 && extra.length === 0,
    missing,
    extra,
  };
}

export function validateRequiredCiCheckContract(workflowYamlText) {
  const errors = [];

  if (!isNonEmptyString(workflowYamlText)) {
    return {
      ok: false,
      errors: ['Workflow YAML must be non-empty text.'],
    };
  }

  const workflowNameMatch = workflowYamlText.match(/^name:\s*([^\n#]+?)\s*$/m);
  const workflowName = workflowNameMatch ? workflowNameMatch[1].trim() : '';

  if (!workflowNameMatch) {
    errors.push('Workflow must declare top-level name.');
  } else if (workflowName !== REQUIRED_CI_WORKFLOW_NAME) {
    errors.push(
      `Workflow name must be "${REQUIRED_CI_WORKFLOW_NAME}", received "${workflowName}".`,
    );
  }

  const jobIdPattern = new RegExp(`^\\s{2}${REQUIRED_CI_JOB_ID}:\\s*$`, 'm');
  if (!jobIdPattern.test(workflowYamlText)) {
    errors.push(`Workflow must include jobs.${REQUIRED_CI_JOB_ID}.`);
  }

  if (!workflowYamlText.includes(REQUIRED_CI_COMMAND)) {
    errors.push(`Workflow must run command: ${REQUIRED_CI_COMMAND}`);
  }

  return {
    ok: errors.length === 0,
    errors,
  };
}
