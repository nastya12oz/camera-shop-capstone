import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { TCamerasList, TCamera, TPromosList } from '../../types/cameras';


export const getCamerasList = (state: Pick<State, NameSpace.Cameras>): TCamerasList => state[NameSpace.Cameras].camerasList;
export const getCamera = (state: Pick<State, NameSpace.Cameras>): TCamera | null => state[NameSpace.Cameras].camera;
export const getCameraErrorStatus = (state: Pick<State, NameSpace.Cameras>): boolean => state[NameSpace.Cameras].hasCameraError;
export const getSimilarsList = (state: Pick<State, NameSpace.Cameras>): TCamerasList => state[NameSpace.Cameras].similarsList;
export const getCameraLoadingStatus = (state: Pick<State, NameSpace.Cameras>): boolean => state[NameSpace.Cameras].isCameraDataLoading;
export const getPromoList = (state: Pick<State, NameSpace.Cameras>): TPromosList => state[NameSpace.Cameras].promoList;
export const getFilteresCameras = (state: Pick<State, NameSpace.Cameras>): TCamerasList => state[NameSpace.Cameras].filteredCameras;
