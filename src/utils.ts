import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { TReview, TReviews } from './types/reviews';
import { TCamerasList } from './types/cameras';
import { TFilterCategory, MIN_SEARCHED_VALUE, SortDirection, SortType, FilterType, LevelFilterType, FilterNameSpace, FilterName } from './const';

import { TSort } from './types/state';


export const formatDate = (dateString: string): string =>
  dayjs(dateString).locale('ru').format('D MMMM');

export function sortByTop(reviewA: TReview, reviewB: TReview) {
  return dayjs(reviewB.createAt).diff(reviewA.createAt);
}

export const sortByDate = (reviews: TReviews) => [...reviews].sort(sortByTop);

export function getSearchedCameras(cameras: TCamerasList, value: string) {
  return cameras.filter((camera) => {
    if (value.length >= MIN_SEARCHED_VALUE) {
      return camera.name.toLowerCase().includes(value.toLocaleLowerCase());
    }
  });
}

const sortByRating = {
  [SortDirection.Default]: (cameras: TCamerasList) => cameras,
  [SortDirection.Down]: (cameras: TCamerasList) => [...cameras].sort((a,b) => b.rating - a.rating),
  [SortDirection.Up]: (cameras: TCamerasList) => [...cameras].sort((a, b) => a.rating - b.rating),
};

const sortByPrice = {
  [SortDirection.Default]: (cameras: TCamerasList) => cameras,
  [SortDirection.Down]: (cameras: TCamerasList) => [...cameras].sort((a,b) => b.price - a.price),
  [SortDirection.Up]: (cameras: TCamerasList) => [...cameras].sort((a, b) => a.price - b.price),
};

export function getSortedCameras(cameras: TCamerasList, sortType: TSort) {
  if (sortType.type === SortType.Price) {
    return sortByPrice[sortType.direction](cameras);
  }
  if (sortType.type === SortType.Popular) {
    return sortByRating[sortType.direction](cameras);
  }
  return cameras;
}

export const getAllSearchParams = (params: URLSearchParams) => {
  let allParams = {};
  for (const [key, value] of params.entries()) {
    allParams = {...allParams, [key]: value};
  }
  return allParams;
};

const categoryFilter = {
  [TFilterCategory.Photocamera]: (cameras: TCamerasList) => cameras.filter((camera) => camera.category === FilterName.photocamera),
  [TFilterCategory.Videocamera]: (cameras: TCamerasList) => cameras.filter((camera) => camera.category === FilterNameSpace.videocamera),
};

const typeFilter = {
  [FilterType.Digital]: (cameras: TCamerasList) => cameras.filter((camera) => camera.type === FilterNameSpace.digital),
  [FilterType.Film]: (cameras: TCamerasList) => cameras.filter((camera) => camera.type === FilterNameSpace.film),
  [FilterType.Snapshot]: (cameras: TCamerasList) => cameras.filter((camera) => camera.type === FilterNameSpace.snapshot),
  [FilterType.Collection]: (cameras: TCamerasList) => cameras.filter((camera) => camera.type === FilterNameSpace.collection),
};

const levelFilter = {
  [LevelFilterType.Zero]: (cameras: TCamerasList) => cameras.filter((camera) => camera.level === FilterNameSpace.zero),
  [LevelFilterType.NonProfessional]: (cameras: TCamerasList) => cameras.filter((camera) => camera.level === FilterNameSpace['non-professional']),
  [LevelFilterType.Professional]: (cameras: TCamerasList) => cameras.filter((camera) => camera.level === FilterNameSpace.professional),
};

export const getFilteredCameras = (
  cameras: TCamerasList,
  category: TFilterCategory | null,
  types: FilterType[],
  levels: LevelFilterType[],
  minPrice: number,
  maxPrice: number,
) => {
  let filteredCameras = cameras;

  filteredCameras = category ? categoryFilter[category](filteredCameras) : filteredCameras;

  filteredCameras = types && types.length ? types.map((type) => typeFilter[type](filteredCameras)).flat() : filteredCameras;

  filteredCameras = levels && levels.length ? levels.map((level) => levelFilter[level](filteredCameras)).flat() : filteredCameras;

  filteredCameras = minPrice && maxPrice ? filteredCameras.filter((camera) => camera.price >= minPrice && camera.price <= maxPrice) : filteredCameras;

  return filteredCameras;
};
