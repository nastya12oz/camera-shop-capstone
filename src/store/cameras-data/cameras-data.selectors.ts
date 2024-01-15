import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { TCamerasList, TCamera } from '../../types/cameras';


export const getCamerasList = (state: Pick<State, NameSpace.Cameras>): TCamerasList => state[NameSpace.Cameras].camerasList;
export const getCamerasListErrorStatus = (state: Pick<State, NameSpace.Cameras>): boolean => state[NameSpace.Cameras].hasCamerasListError;
export const getCamerasListLoadingStatus = (state: Pick<State, NameSpace.Cameras>): boolean => state[NameSpace.Cameras].isCameraDataLoading;
export const getCamera = (state: State): TCamera | null => state[NameSpace.Cameras].camera;
export const getCameraErrorStatus = (state: Pick<State, NameSpace.Cameras>): boolean => state[NameSpace.Cameras].hasCameraError;
export const getCameraLoadingStatus = (state: Pick<State, NameSpace.Cameras>): boolean => state[NameSpace.Cameras].isCameraDataLoading;
export const getSimilarsList = (state: Pick<State, NameSpace.Cameras>): TCamerasList => state[NameSpace.Cameras].similarsList;
export const getSimilarsListErrorStatus = (state: Pick<State, NameSpace.Cameras>): boolean => state[NameSpace.Cameras].hasSimilarsError;
export const getSimilarsListLoadingStatus = (state: Pick<State, NameSpace.Cameras>): boolean => state[NameSpace.Cameras].isSimilasDataLoading;
