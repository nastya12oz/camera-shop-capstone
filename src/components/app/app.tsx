import {HelmetProvider} from 'react-helmet-async';
import {Route, Routes} from 'react-router-dom';
import { useEffect } from 'react';
import { AppRoute } from '../../const';
import { useAppDispatch } from '../../hooks';
import CatalogScreen from '../../pages/catalog-screen/catalog-screen';
import ProductScreen from '../../pages/product-screen/product-screen';
import { fetchCamerasListAction, fetchPromoAction } from '../../store/api-actions';


function App(): JSX.Element {
  const dispatch = useAppDispatch();


  useEffect(() => {
    dispatch(fetchCamerasListAction());
    dispatch(fetchPromoAction());

  }, [dispatch]);


  return(
    <HelmetProvider>
      <Routes>
        <Route path={AppRoute.Catalog} element={<CatalogScreen />} />
        <Route path={AppRoute.Product} element={<ProductScreen />} />
      </Routes>
    </HelmetProvider>

  );
}

export default App;
