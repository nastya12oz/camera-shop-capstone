import { formatDate, sortByTop, getSearchedCameras, getSortedCameras, getAllSearchParams, getFilteredCameras } from './utils';
import { SortDirection, SortType, TFilterCategory, FilterType, LevelFilterType } from './const';
import { makeFakeCameras, makeFakeReviews } from './mock/mock';
import dayjs from 'dayjs';

describe('utils', () => {
  describe('formatDate', () => {
    it('should format a date string to "D MMMM" format', () => {
      const date = '2021-04-12';
      const formattedDate = formatDate(date);
      expect(formattedDate).toBe('12 апреля');
    });
  });
  describe('sortByTop', () => {
    it('should sort reviews by creation date in descending order', () => {
      const reviews = makeFakeReviews();
      const sortedReviews = reviews.sort(sortByTop);
      expect(sortedReviews).toEqual(reviews.sort((a, b) => dayjs(b.createAt).diff(dayjs(a.createAt))));
    });
  });

  describe('getSearchedCameras', () => {
    it('should return cameras that match the search value', () => {
      const cameras = makeFakeCameras();
      const searchValue = cameras[0].name.slice(0, 3);
      const searchedCameras = getSearchedCameras(cameras, searchValue);
      expect(searchedCameras).toEqual(cameras.filter((camera) => camera.name.toLowerCase().includes(searchValue.toLowerCase())));
    });
  });

  describe('getSortedCameras', () => {
    it('should sort cameras by price in ascending order', () => {
      const cameras = makeFakeCameras();
      const sortType = { type: SortType.Price, direction: SortDirection.Up };
      const sortedCameras = getSortedCameras(cameras, sortType);
      expect(sortedCameras).toEqual(cameras.sort((a, b) => a.price - b.price));
    });
  });

  describe('getAllSearchParams', () => {
    it('should return an object with all search parameters', () => {
      const params = new URLSearchParams('type=digital&level=professional');
      const allParams = getAllSearchParams(params);
      expect(allParams).toEqual({ type: 'digital', level: 'professional' });
    });
  });

  describe('getFilteredCameras', () => {
    it('should return cameras filtered by category, type, level, and price range', () => {
      const cameras = makeFakeCameras();
      const filteredCameras = getFilteredCameras(cameras, TFilterCategory.Photocamera, [FilterType.Digital], [LevelFilterType.Professional], 10000, 50000);
      expect(filteredCameras).toEqual(cameras.filter((camera) => camera.category === 'Фотоаппарат' && camera.type === 'Цифровая' && camera.level === 'Профессиональный' && camera.price >= 10000 && camera.price <= 50000));
    });
  });
});
