import Header from '../../components/header/header';
import BannerSlider from '../../components/banner-slider/banner-slider';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import ProductCardList from '../../components/product-card-list/product-card-list';
import Pagination from '../../components/pagination/pagination';
import CatalogSort from '../../components/catalog-sort/catalog-sort';
import CatalogFilter from '../../components/catalog-filter/catalog-filter';
import Footer from '../../components/footer/footer';
import { useState, useEffect } from 'react';
import { ITEMS_PER_PAGE } from '../../const';
import { useAppSelector } from '../../hooks';
import { getCamerasList, getCamerasListLoadingStatus } from '../../store/cameras-data/cameras-data.selectors';
import { useLocation } from 'react-router-dom';
import ModalAddToBasket from '../../components/modal-add-to-basket/modal-add-to-basket';
import { TModalInfoState } from '../../types/modal-info-state';
import { Helmet } from 'react-helmet-async';
import { getSortedCameras } from '../../utils';
import { getSortType } from '../../store/sort-process/sort-process.selectors';
import { TFilterCategory, FilterType, LevelFilterType } from '../../const';
import { getFilteredCameras } from '../../utils';
import LoaderScreen from '../loader-screen/loader-screen';


function CatalogScreen(): JSX.Element {

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const pageFromUrl = parseInt(searchParams.get('page') || '1', 10);

  const [currentPage, setCurrentPage] = useState(1);
  const camerasList = useAppSelector(getCamerasList);


  const category = searchParams.get('category') as TFilterCategory;
  const type = searchParams.get('type')?.split(',') as FilterType[];
  const level = searchParams.get('level')?.split(',') as LevelFilterType[];
  const minPrice = Number(searchParams.get('_start'));
  const maxPrice = Number(searchParams.get('_end'));
  const filteredCameras = getFilteredCameras(camerasList, category, type, level, minPrice, maxPrice);

  // console.log(filteredCameras);


  const [modalInfo, setModalInfo] = useState<TModalInfoState>({ isVisible: false, product: null });

  const sortType = useAppSelector(getSortType);
  const sortedCameras = getSortedCameras(filteredCameras, sortType); //после фильтра


  const totalPages = Math.ceil(sortedCameras.length / ITEMS_PER_PAGE);


  useEffect(() => {
    setCurrentPage(pageFromUrl);
  }, [pageFromUrl]);


  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const displayedCameras = sortedCameras.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const isCameraListLoading = useAppSelector(getCamerasListLoadingStatus);

  if (isCameraListLoading) {
    return <LoaderScreen />;
  }

  return (
    <div className="wrapper">
      <Header />
      <main>
        <Helmet>
          Каталог - Фотошоп
        </Helmet>
        <BannerSlider />

        <div className="page-content" data-testid="pageContentElement">
          <Breadcrumbs />

          <section className="catalog">
            <div className="container">
              <h1 className="title title--h2">Каталог фото- и видеотехники</h1>

              <div className="page-content__columns">
                <CatalogFilter />

                <div className="catalog__content">
                  <CatalogSort />
                  {filteredCameras.length > 0 ? (
                    <>
                      <ProductCardList
                        products={displayedCameras}
                        isActive={false}
                      />
                      {totalPages ? <Pagination totalPages={totalPages} /> : null}
                    </>
                  ) : (
                    <p>По вашему запросу ничего не найдено. Пожалуйста, измените критерий поиска.</p>
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>
        {modalInfo.isVisible && modalInfo.product && <ModalAddToBasket product={modalInfo.product} onClose={() => setModalInfo({ isVisible: false, product: null })} />}
      </main>

      <Footer />
    </div>
  );
}

export default CatalogScreen;
