import Header from '../../components/header/header';
import Banner from '../../components/banner/banner';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs/breadcrumbs';
import ProductCardList from '../../components/product-card-list/product-card-list';
import Pagination from '../../components/pagination/pagination';
import CatalogSort from '../../components/catalog-sort/catalog-sort';
import CatalogFilter from '../../components/catalog-filter/catalog-filter';
import Footer from '../../components/footer/footer';
import { useState } from 'react';
import { ITEMS_PER_PAGE } from '../../const';
import { useAppSelector } from '../../hooks';
import { getCamerasList } from '../../store/cameras-data/cameras-data.selectors';


function CatalogScreen(): JSX.Element {

  const [currentPage, setCurrentPage] = useState(1);
  const camerasList = useAppSelector(getCamerasList);
  const totalPages = Math.ceil(camerasList.length / ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const displayedCameras = camerasList.slice(startIndex, startIndex + ITEMS_PER_PAGE);


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
                  <ProductCardList products={displayedCameras} />
                  <Pagination
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    currentPage={currentPage}
                  />
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
