import { NameSpace} from '../../const';
import { makeFakeCamera, makeFakeCameras, makeFakePromo } from '../../mock/mock';
import { getCamera, getCamerasList, getSimilarsList, getCameraErrorStatus, getCameraLoadingStatus, getPromoList } from './cameras-data.selectors';


describe('product-process selectors', () => {
  const state = {
    [NameSpace.Cameras]: {
      camerasList: makeFakeCameras(),
      camera: makeFakeCamera(),
      hasCameraError: false,
      isCameraDataLoading: false,
      similarsList: makeFakeCameras(),
      promoList: makeFakePromo(),
      filteredCameras: makeFakeCameras(),
      isCameraListLoading: false
    }
  };

  it('should return cameras from state', () => {
    const {camerasList} = state[NameSpace.Cameras];
    const result = getCamerasList(state);
    expect(result).toEqual(camerasList);
  });

  it('should return one camera from state', () => {
    const {camera} = state[NameSpace.Cameras];
    const result = getCamera(state);
    expect(result).toEqual(camera);
  });

  it('should return similar cameras from state', () => {
    const {similarsList} = state[NameSpace.Cameras];
    const result = getSimilarsList(state);
    expect(result).toEqual(similarsList);
  });

  it('should return promo cameras from state', () => {
    const {promoList} = state[NameSpace.Cameras];
    const result = getPromoList(state);
    expect(result).toEqual(promoList);
  });


  it('should return camera data loading status', () => {
    const {isCameraDataLoading} = state[NameSpace.Cameras];
    const result = getCameraLoadingStatus(state);
    expect(result).toBe(isCameraDataLoading);
  });
  it('should return camera data error status', () => {
    const {hasCameraError} = state[NameSpace.Cameras];
    const result = getCameraErrorStatus(state);
    expect(result).toBe(hasCameraError);
  });
});
