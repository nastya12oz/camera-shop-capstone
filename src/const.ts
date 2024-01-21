export const BACKEND_URL = ' https://camera-shop.accelerator.pages.academy/';
export const REQUEST_TIMEOUT = 5000;
export const ITEMS_PER_PAGE = 9;

export enum AppRoute {
  Catalog = '/',
  Product = 'Product/:id'
}

export enum APIRoute {
  Cameras = '/cameras',
  Camera = '/cameras/{cameraId}',
  Similar = '/cameras/{cameraId}/similar',
  Promo = '/promo',
  Reviews = '/cameras/{cameraId}/reviews',
  AddReview = '/reviews',
  Coupons = '/coupons',
  AddOrder = '/orders'
}

export enum NameSpace {
  Cameras = 'CAMERAS',
  Promo = 'PROMO',
  Reviews = 'REVIEWS',
  Order = 'ORDER',
}
