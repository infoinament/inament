import wallShelfMainImage from '../assets/objects/wall-shelf/main.webp';
import wallShelfDetailTopImage from '../assets/objects/wall-shelf/detail-top.webp';
import wallShelfDetailBottomImage from '../assets/objects/wall-shelf/detail-bottom.webp';
import kitchenRackImage1 from '../assets/objects/kitchen-rack/img-kitchen-rack-1.webp';
import kitchenRackImage2 from '../assets/objects/kitchen-rack/img-kitchen-rack-2.webp';
import kitchenRackImage3 from '../assets/objects/kitchen-rack/img-kitchen-rack-3.webp';
import pocketTrayImage1 from '../assets/objects/pocket-tray/img-pocket-tray-1.webp';
import pocketTrayImage2 from '../assets/objects/pocket-tray/img-pocket-tray-2.webp';
import pocketTrayImage3 from '../assets/objects/pocket-tray/img-pocket-tray-3.webp';
import plainShelfImage1 from '../assets/objects/plain-shelf/img-plain-shelf-1.webp';
import plainShelfImage2 from '../assets/objects/plain-shelf/img-plain-shelf-2.webp';
import plainShelfImage3 from '../assets/objects/plain-shelf/img-plain-shelf-3.webp';

const WALL_SHELF_BULLET_POINTS = [
  '견고한 오크를 손으로 직접 조각하여 제작했습니다.',
  '티크 스테인으로 마감했습니다.',
  '벽에 안정적으로 밀착되도록 비례를 잡았습니다.',
  '두 개의 선반과 서랍으로 구성되어 있습니다.',
  '작은 물건을 올려두기에 안성맞춤입니다.',
];

const KITCHEN_RACK_BULLET_POINTS = [
  '오크의 결을 살려 내추럴한 무드를 담았습니다.',
  '하드 오일 마감으로 방수성, 내구성을 높였습니다.',
  '균형 잡힌 비례와 안정감으로 공간이 편안해집니다.',
  '오븐 옆이나 주방 코너, 어디에 두어도 좋습니다.',
  '자주 쓰는 접시부터 커피잔, 레시피북까지 가지런히 수납할 수 있어요.',
];

const POCKET_TRAY_BULLET_POINTS = [
  '패턴 유리로 텍스쳐와 디테일이 돋보입니다.',
  '하드 오일로 방수성과 체리의 색을 살렸습니다.',
  '커피, 온더락, 악세서리까지 다양하게 올려두세요.',
  '실용적이면서도 테이블에 따뜻함과 질감을 더해줍니다.',
];

const PLAIN_SHELF_BULLET_POINTS = [
  '오래 두어도 질리지 않는 정갈한 디자인입니다.',
  '내구성과 결을 살린 깊이 있는 오일 마감입니다.',
  '뒷판을 넣어서 물건이 뒤로 넘어가지 않습니다.',
  '걸레받이가 있어 바닥 청소가 용이합니다.',
  '주방부터 거실까지 집 어디에 두어도 어울립니다.',
  '책, 도자기, 주방용품 등 다양하게 수납할 수 있고, 잡동사니는 라탄 바구니에 넣어 연출해도 좋아요.',
];

export const PRODUCT_OBJECTS = [
  {
    id: 'wall-shelf',
    name: 'Wall Shelf',
    sizeText: 'Size(mm) W560 x D162 x H526',
    detailTitle: '앤티크에서 영감을 받은 벽걸이 선반',
    bulletPoints: WALL_SHELF_BULLET_POINTS,
    images: [wallShelfMainImage, wallShelfDetailTopImage, wallShelfDetailBottomImage],
    layoutVars: {},
  },
  {
    id: 'kitchen-rack',
    name: 'Kitchen Rack',
    sizeText: 'Size(mm) W495 x D250 x H520',
    detailTitle: '단정한 무게감의 스탠딩 키친랙',
    bulletPoints: KITCHEN_RACK_BULLET_POINTS,
    images: [kitchenRackImage1, kitchenRackImage2, kitchenRackImage3],
    layoutVars: {},
  },
  {
    id: 'pocket-tray',
    name: 'Pocket Tray',
    sizeText: 'Size(mm) W100 x D100 x H20',
    detailTitle: '체리와 민트 빛 유리의 포켓 트레이',
    bulletPoints: POCKET_TRAY_BULLET_POINTS,
    images: [pocketTrayImage1, pocketTrayImage2, pocketTrayImage3],
    layoutVars: {},
  },
  {
    id: 'plain-shelf',
    name: 'Plain Shelf',
    sizeText: 'Size(mm) W1200 x D285 x H865',
    detailTitle: '정갈한 오픈형 오크 수납장',
    bulletPoints: PLAIN_SHELF_BULLET_POINTS,
    images: [plainShelfImage1, plainShelfImage2, plainShelfImage3],
    layoutVars: {},
  },
];
