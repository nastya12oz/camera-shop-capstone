import Header from '../../components/header/header';
import Banner from '../../components/banner/banner';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs/breadcrumbs';
import ProductCardList from '../../components/product-card-list/product-card-list';
import Pagination from '../../components/pagination/pagination';
import CatalogSort from '../../components/catalog-sort/catalog-sort';
import CatalogFilter from '../../components/catalog-filter/catalog-filter';
import Footer from '../../components/footer/footer';

function CatalogScreen(): JSX.Element {
  return(
    <div className="wrapper">
      <Header />

      <main>
        <Banner />

        <div className="page-content">
          <Breadcrumbs />

          <section className="catalog">
            <div className="container">
              <h1 className="title title--h2">Каталог фото- и видеотехники</h1>

              <div className="page-content__columns">

                <CatalogFilter />

                <div className="catalog__content">
                  <CatalogSort />
                  <ProductCardList />
                  <Pagination />
                </div>

              </div>

            </div>
          </section>

        </div>

      </main>

      <Footer />
    </div>
  );
}

export default CatalogScreen;
