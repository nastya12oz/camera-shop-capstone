import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { TPromosList } from '../../types/promo';


export const getPromoList = (state: Pick<State, NameSpace.Promo>): TPromosList => state[NameSpace.Promo].promoList;
export const getPromoListErrorStatus = (state: Pick<State, NameSpace.Promo>): boolean => state[NameSpace.Promo].hasPromoListError;
export const getPromoListLoadingStatus = (state: Pick<State, NameSpace.Promo>): boolean => state[NameSpace.Promo].isPromoListDataLoading;
