import { getSortType } from './sort-process.selectors';
import { makeFakeStore } from '../../mock/mock';
import { SortDirection, SortType } from '../../const';

describe('Sort-process selectors', () => {
  const initialState = makeFakeStore({
    SORT: {
      sortType: {
        type: SortType.Price,
        direction: SortDirection.Up,
      },
    },
  });

  it('getSortType selector should return the current sort type', () => {
    const sortType = getSortType(initialState);
    expect(sortType).toEqual({
      type: SortType.Price,
      direction: SortDirection.Up,
    });
  });
});
