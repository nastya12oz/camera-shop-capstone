export const BACKEND_URL = 'https://camera-shop.accelerator.htmlacademy.pro';
export const REQUEST_TIMEOUT = 5000;
export const ITEMS_PER_PAGE = 9;
export const DISPLAYED_CARDS_IN_SLIDER = 3;
export const DISPLAYED_REVIEWS = 3;
export const STARS_COUNT = 5;
export const MIN_SEARCHED_VALUE = 3;


export enum AppRoute {
  Catalog = '/',
  Product = '/product/:id'
}

export enum APIRoute {
  Products = 'cameras',
  Promo = 'promo',
  Reviews = 'cameras/id/reviews',
  Review = 'reviews',
}

export enum NameSpace {
  Cameras = 'CAMERAS',
  Reviews = 'REVIEWS',
  Order = 'ORDER',
  Sort = 'SORT'
}

export enum CameraTab {
  Property = 'Property',
  Description = 'Description',
}

export enum TextReviewValues {
  MIN = 10,
  MAX = 160
}

export enum ReviewValues {
  MIN = 2,
  MAX = 15
}

export enum SortType {
  Default ='',
  Price = 'price',
  Popular = 'popular',
}

export enum SortDirection {
  Default = '',
  Up = 'up',
  Down = 'down'
}

export enum FilterType {
  Digital = 'digital',
  Film = 'film',
  Snapshot = 'snapshot',
  Collection = 'collection',
}

export enum LevelFilterType {
  Zero = 'zero',
  NonProfessional = 'non-professional',
  Professional = 'professional',
}

export enum Filter {
  Category = 'category',
  Type = 'type',
  Level = 'level',
}

export enum TFilterCategory {
  Photocamera = 'photocamera',
  Videocamera = 'videocamera',
}

export const FilterNameSpace = {
  photocamera: 'Фотокамера',
  videocamera: 'Видеокамера',
  digital: 'Цифровая',
  film: 'Плёночная',
  snapshot: 'Моментальная',
  collection: 'Коллекционная',
  zero: 'Нулевой',
  ['non-professional']: 'Любительский',
  professional: 'Профессиональный',
};

export const FilterName = {
  photocamera: 'Фотоаппарат',
  videocamera: 'Видеокамера',
  digital: 'Цифровая',
  film: 'Плёночная',
  snapshot: 'Моментальная',
  collection: 'Коллекционная',
  zero: 'Нулевой',
  ['non-professional']: 'Любительский',
  professional: 'Профессиональный',
};
