import { configureMockStore } from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import { Action } from 'redux';
import thunk from 'redux-thunk';
import { APIRoute } from '../const';
import { createAPI } from '../services/api';
import { State } from '../types/state';
import { AppThunkDispatch, extractActionsTypes, makeFakeCamera, makeFakeCameras, makeFakePromo, makeFakeReview, makeFakeReviews } from '../mock/mock';
import { fetchCamerasListAction, fetchCameraByIdAction, fetchPromoAction, fetchReviewsAction, fetchSendReviewAction, fetchSimilarListAction } from './api-actions';

describe('Async axtions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({CAMERAS: {camerasList: []}});
  });

  describe('fetchCamerasListAction', () => {
    it('should dispatch "fetchCamerasListAction.pending" and "fetchCamerasListAction.fulfilled" when server response 200', async () => {
      const mockCameras = makeFakeCameras();
      mockAxiosAdapter.onGet(APIRoute.Products).reply(200, mockCameras);

      await store.dispatch(fetchCamerasListAction());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchCamerasListActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchCamerasListAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchCamerasListAction.pending.type,
        fetchCamerasListAction.fulfilled.type,
      ]);

      expect(fetchCamerasListActionFulfilled.payload).toEqual(mockCameras);
    });

    it('should dispatch "fetchCamerasListAction.pending" and "fetchCamerasListAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.Products).reply(400, []);

      await store.dispatch(fetchCamerasListAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchCamerasListAction.pending.type,
        fetchCamerasListAction.rejected.type,
      ]);
    });
  });

  describe('fetchPromoAction', () => {
    it('should dispatch "fetchPromoAction.pending" and "fetchPromoAction.fulfilled" when server response 200', async () => {
      const mockPromo = makeFakePromo();
      mockAxiosAdapter.onGet(APIRoute.Promo).reply(200, mockPromo);

      await store.dispatch(fetchPromoAction());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchPromoActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchPromoAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchPromoAction.pending.type,
        fetchPromoAction.fulfilled.type,
      ]);

      expect(fetchPromoActionFulfilled.payload).toEqual(mockPromo);
    });

    it('should dispatch "fetchPromoAction.pending" and "fetchPromoAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.Promo).reply(400, []);

      await store.dispatch(fetchPromoAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchPromoAction.pending.type,
        fetchPromoAction.rejected.type,
      ]);
    });
  });

  describe('fetchCameraByIdAction', () => {
    const mockCamera = makeFakeCamera();

    it('should dispatch "fetchCameraByIdAction.pending" and "fetchCameraByIdAction.fulfilled" when server response 200', async () => {
      mockAxiosAdapter.onGet(`${APIRoute.Products}/${mockCamera.id}`).reply(200, mockCamera);

      await store.dispatch(fetchCameraByIdAction(String(mockCamera.id)));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchProductCardActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchCameraByIdAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchCameraByIdAction.pending.type,
        fetchCameraByIdAction.fulfilled.type,
      ]);

      expect(fetchProductCardActionFulfilled.payload).toEqual(mockCamera);
    });

    it('should dispatch "fetchCameraByIdAction.pending" and "fetchProductCardAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(`${APIRoute.Products}/${mockCamera.id}`).reply(400, {});

      await store.dispatch(fetchCameraByIdAction(String(mockCamera.id)));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchCameraByIdAction.pending.type,
        fetchCameraByIdAction.rejected.type,
      ]);
    });
  });

  describe('fetchSimilarListAction', () => {
    it('should dispatch "fetchSimilarListAction.pending" and "fetchSimilarListAction.fulfilled" when server response 200', async () => {
      const id = makeFakeCamera().id.toString();
      const mockSimilar = makeFakeCameras();
      mockAxiosAdapter.onGet(`${APIRoute.Products}/${id}/similar`).reply(200, mockSimilar);

      await store.dispatch(fetchSimilarListAction(id));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchSimilarListActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchSimilarListAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchSimilarListAction.pending.type,
        fetchSimilarListAction.fulfilled.type,
      ]);

      expect(fetchSimilarListActionFulfilled.payload).toEqual(mockSimilar);
    });

    it('should dispatch "fetchSimilarListAction.pending" and "fetchSimilarListAction.rejected" when server response 400', async () => {
      const id = makeFakeCamera().id.toString();
      mockAxiosAdapter.onGet(`${APIRoute.Products}/${id}/similar`).reply(400, []);

      await store.dispatch(fetchSimilarListAction(id));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchSimilarListAction.pending.type,
        fetchSimilarListAction.rejected.type,
      ]);
    });
  });

  describe('fetchReviewsAction', () => {
    it('should dispatch "fetchReviewsAction.pending" and "fetchReviewsAction.fulfilled" when server response 200', async () => {
      const id = makeFakeCamera().id.toString();
      const mockReviews = makeFakeReviews();
      mockAxiosAdapter.onGet(APIRoute.Reviews.replace('id', id)).reply(200, mockReviews);

      await store.dispatch(fetchReviewsAction(id));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchReviewsActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchSendReviewAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchReviewsAction.pending.type,
        fetchReviewsAction.fulfilled.type,
      ]);

      expect(fetchReviewsActionFulfilled.payload).toEqual(mockReviews);
    });

    it('should dispatch "fetchReviewsAction.pending" and "fetchReviewsAction.rejected" when server response 400', async () => {
      const id = makeFakeCamera().id.toString();
      mockAxiosAdapter.onGet(APIRoute.Reviews.replace('id', id)).reply(400, []);

      await store.dispatch(fetchReviewsAction(id));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchReviewsAction.pending.type,
        fetchReviewsAction.rejected.type,
      ]);
    });
  });

  describe('fetchSendReviewAction', () => {
    it('should dispatch "fetchSendReviewAction.pending"  and "fetchSendReviewAction.fulfilled" when server response 200', async () => {
      const mockReview = makeFakeReview();
      mockAxiosAdapter.onPost(APIRoute.Review).reply(200);

      await store.dispatch(fetchSendReviewAction(mockReview));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);

      expect(extractedActionsTypes).toEqual([
        fetchSendReviewAction.pending.type,
        fetchSendReviewAction.fulfilled.type,
      ]);
    });

    it('should dispatch "fetchSendReviewAction.pending" and "fetchSendReviewAction.rejected" when server response 400', async () => {
      const mockReview = makeFakeReview();
      mockAxiosAdapter.onPost(APIRoute.Review).reply(400);

      await store.dispatch(fetchSendReviewAction(mockReview));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchSendReviewAction.pending.type,
        fetchSendReviewAction.rejected.type,
      ]);
    });
  });
});
