
import { TCamera, TCamerasList, TCameraType, TCameraCategory, TLevel, TPromo, TPromosList } from '../types/cameras';
import { TReview, TReviews } from '../types/reviews';
import { random, system, datatype, date, name } from 'faker';
import { ThunkDispatch } from 'redux-thunk';
import { State } from '../types/state';
import { Action } from 'redux';
import { createAPI } from '../services/api';
import { SortType, SortDirection } from '../const';

export type AppThunkDispatch = ThunkDispatch<State, ReturnType<typeof createAPI>, Action>;

export const extractActionsTypes = (actions: Action<string>[]) => actions.map(({type}) => type);

const TYPES = ['Коллекционная', 'Моментальная', 'Цифровая', 'Плёночная'];
const CATEGORIES = ['Видеокамера', 'Фотоаппарат'];
const LEVELS = ['Любительский', 'Нулевой', 'Профессиональный'];

function randomInteger(min:number, max: number) {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

export const makeFakeCamera = (): TCamera => ({
  id: datatype.number(),
  name: random.words(),
  vendorCode: crypto.randomUUID(),
  type: TYPES[Math.floor(Math.random() * TYPES.length)] as TCameraType,
  category: CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)] as TCameraCategory,
  description: random.words(),
  level: LEVELS[Math.floor(Math.random() * LEVELS.length)] as TLevel,
  price: datatype.number(),
  rating: randomInteger(1,5),
  reviewCount: datatype.number(),
  previewImg: system.filePath(),
  previewImg2x: system.filePath(),
  previewImgWebp: system.filePath(),
  previewImgWebp2x: system.filePath(),
});

export const makeFakeCameras = (): TCamerasList => Array.from({length: 10}, makeFakeCamera);

export const makeFakeReview = (): TReview => ({
  id: crypto.randomUUID(),
  createAt: String(date.recent()),
  cameraId: datatype.number(),
  userName: name.findName(),
  advantage: random.words(),
  disadvantage: random.words(),
  review: random.words(),
  rating: randomInteger(1,5),
});

export const makeFakeReviews = (): TReviews => Array.from({length: 10}, makeFakeReview);

export const makeFakePromoCard = (): TPromo => ({
  id: datatype.number(),
  name: random.words(),
  previewImg: system.filePath(),
  previewImg2x: system.filePath(),
  previewImgWebp: system.filePath(),
  previewImgWebp2x: system.filePath(),
});

export const makeFakePromo = (): TPromosList => Array.from({length: 10}, makeFakePromoCard);

export const makeFakeStore = (initialState?: Partial<State>): State => ({
  CAMERAS: {
    camerasList: [],
    camera: null,
    hasCameraError: false,
    similarsList: [],
    isCameraDataLoading: false,
    promoList: [],
    isCameraListLoading: false,
    filteredCameras: [],
  },
  REVIEWS: {
    reviews: [],
    isReviewSending: false,
    hasReviewSendingError: false,
    isReviewSentSuccessfully: false,
  },
  SORT: {
    sortType: {
      type: SortType.Default,
      direction: SortDirection.Default,
    },
  },
  ...initialState,
});
