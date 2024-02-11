export const BACKEND_URL = 'https://camera-shop.accelerator.htmlacademy.pro';
export const REQUEST_TIMEOUT = 5000;
export const ITEMS_PER_PAGE = 9;
export const DISPLAYED_CARDS_IN_SLIDER = 3;
export const DISPLAYED_REVIEWS = 3;


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
  Promo = 'PROMO',
  Reviews = 'REVIEWS',
  Order = 'ORDER',
}

export enum CameraTab {
  Property = 'Характеристики',
  Description = 'Описание',
}
