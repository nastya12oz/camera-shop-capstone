import { sortProcess, setSortType } from './sort-process.slice';
import { SortDirection, SortType } from '../../const';
import { makeFakeStore } from '../../mock/mock';

describe('Sort-process slice', () => {
  const initialState = makeFakeStore().SORT;

  it('should return the initial state on first run', () => {
    const result = sortProcess.reducer(undefined, { type: '' });
    expect(result.sortType).toEqual({
      type: SortType.Default,
      direction: SortDirection.Default,
    });
  });

  it('should handle "setSortType" action', () => {
    const newSortType = {
      type: SortType.Price,
      direction: SortDirection.Up,
    };
    const expectedState = {
      ...initialState,
      sortType: newSortType,
    };
    const action = setSortType(newSortType);
    const result = sortProcess.reducer(initialState, action);
    expect(result).toEqual(expectedState);
  });
});
