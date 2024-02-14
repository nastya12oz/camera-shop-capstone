import { Helmet } from 'react-helmet-async';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

function NotFoundScreen(): JSX.Element {
  return(
    <div className="wrapper">
      <Header />
      <main>
        <Helmet>
        404 - Фотошоп
        </Helmet>

        <div className="page-content">

          <p>404 - not found....</p>
          <Link className="btn" to={AppRoute.Catalog}>На главную</Link>
        </div>

      </main>

      <Footer />
    </div>


  );
}

export default NotFoundScreen;
