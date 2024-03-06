import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { TSort } from '../../types/state';

export const getSortType = (state: Pick<State, NameSpace.Sort>): TSort => state[NameSpace.Sort].sortType;
