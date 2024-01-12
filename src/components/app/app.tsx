import {HelmetProvider} from 'react-helmet-async';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { AppRoute } from '../../const';
import CatalogScreen from '../../pages/catalog-screen/catalog-screen';


function App(): JSX.Element {
  return(
    <HelmetProvider>
      <Router>
        <Routes>
          <Route path={AppRoute.Catalog} element={<CatalogScreen />} />
        </Routes>
      </Router>

    </HelmetProvider>

  );
}

export default App;
