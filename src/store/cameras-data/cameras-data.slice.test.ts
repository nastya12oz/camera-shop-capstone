import { makeFakeCamera, makeFakeCameras, makeFakePromo } from '../../mock/mock';
import { fetchCamerasListAction, fetchCameraByIdAction, fetchSimilarListAction, fetchPromoAction } from '../api-actions';
import { camerasData } from './cameras-data.slice';

describe('cameras data slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = {type: ''};
    const expectedState = {
      camerasList: makeFakeCameras(),
      camera: makeFakeCamera(),
      hasCameraError: false,
      isCameraDataLoading: false,
      similarsList: makeFakeCameras(),
      promoList: makeFakePromo(),
    };

    const result = camerasData.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = {type: ''};
    const expectedState = {
      camerasList: [],
      camera: null,
      hasCameraError: false,
      isCameraDataLoading: false,
      similarsList: [],
      promoList: []
    };

    const result = camerasData.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set "camerasList" to array with cameras with "fetchCamerasListAction.fulfilled"', () => {
    const camerasList = makeFakeCameras();
    const expectedState = {
      camerasList,
      camera: null,
      hasCameraError: false,
      isCameraDataLoading: false,
      similarsList: [],
      promoList: [],
    };

    const result = camerasData.reducer(undefined, fetchCamerasListAction.fulfilled(camerasList, '', undefined));

    expect(result).toEqual(expectedState);
  });

  it('should set "hasCameraError" to true with "fetchCameraByIdAction.rejected"', () => {
    const expectedState = {
      camerasList: [],
      camera: null,
      hasCameraError: true,
      isCameraDataLoading: false,
      similarsList: [],
      promoList: [],
    };

    const result = camerasData.reducer(undefined, fetchCameraByIdAction.rejected);

    expect(result).toEqual(expectedState);
  });

  it('should set "hasCameraError" to false, "camera" to camera with "fetchCameraByIdAction.fulfilled"', () => {
    const camera = makeFakeCamera();
    const expectedState = {
      camerasList: [],
      camera,
      hasCameraError: false,
      isCameraDataLoading: false,
      similarsList: [],
      promoList: [],
    };

    const result = camerasData.reducer(undefined, fetchCameraByIdAction.fulfilled(camera, '', String(camera.id)));

    expect(result).toEqual(expectedState);
  });

  it('should set "isCameraDataLoading" to true with "fetchCameraByIdAction.pending"', () => {
    const expectedState = {
      camerasList: [],
      camera: null,
      hasCameraError: false,
      isCameraDataLoading: true,
      similarsList: [],
      promoList: [],
    };

    const result = camerasData.reducer(undefined, fetchCameraByIdAction.pending);

    expect(result).toEqual(expectedState);
  });

  it('should set "isCameraDataLoading" to false, "camera" to camera with "fetchCameraByIdAction.fulfilled"', () => {
    const camera = makeFakeCamera();
    const expectedState = {
      camerasList: [],
      camera,
      hasCameraError: false,
      isCameraDataLoading: false,
      similarsList: [],
      promoList: [],
    };

    const result = camerasData.reducer(undefined, fetchCameraByIdAction.fulfilled(camera, '', String(camera.id)));

    expect(result).toEqual(expectedState);
  });

  it('should set "similarsList" to array with similar cameras with "fetchSimilarListAction.fulfilled"', () => {
    const similarsList = makeFakeCameras();
    const id = makeFakeCamera().id;
    const expectedState = {
      camerasList: [],
      camera: null,
      similarsList,
      promoList: [],
      isCameraDataLoading: false,
      hasCameraError: false
    };

    const result = camerasData.reducer(undefined, fetchSimilarListAction.fulfilled(similarsList, '', String(id)));

    expect(result).toEqual(expectedState);
  });
});

it('should set "promoList" to array with promo cameras with "fetchPromoAction.fulfilled"', () => {
  const promoList = makeFakePromo();
  const expectedState = {
    camerasList: [],
    camera: null,
    similarsList: [],
    promoList,
    isCameraDataLoading: false,
    hasCameraError: false
  };

  const result = camerasData.reducer(undefined, fetchPromoAction.fulfilled(promoList,'', undefined));

  expect(result).toEqual(expectedState);
});
