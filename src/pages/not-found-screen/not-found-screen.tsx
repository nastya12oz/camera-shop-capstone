import { Helmet } from 'react-helmet-async';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';

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

        </div>

      </main>

      <Footer />
    </div>


  );
}

export default NotFoundScreen;
