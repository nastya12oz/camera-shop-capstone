import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs/breadcrumbs';
import { getCamera, getCameraErrorStatus, getCameraLoadingStatus } from '../../store/cameras-data/cameras-data.selectors';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { fetchCameraByIdAction, fetchReviewsAction } from '../../store/api-actions';
import { Helmet } from 'react-helmet-async';
import Tabs from '../../components/tabs/tabs';
import SimilarProducts from '../../components/similar-products/similar-products';
import RatingStars from '../../components/rating-stars/rating-stars';
import ReviewsList from '../../components/reviews-list/reviews-list';
import UpButton from '../../components/up-button/up-button';
import SimilarProductsSwiper from '../../components/similar-products-swiper/similar-products-swiper';
import ButtonAddToBasket from '../../components/button-add-to-basket/button-add-to-basket';


function ProductScreen(): JSX.Element {


  const {id} = useParams();
  const dispatch = useAppDispatch();
  const isCameroading = useAppSelector(getCameraLoadingStatus);
  const camera = useAppSelector(getCamera);
  const hasCameraError = useAppSelector(getCameraErrorStatus);

  useEffect(() => {
    if (id) {
      dispatch(fetchCameraByIdAction(id));
      dispatch(fetchReviewsAction(id));
    }
  }, [id, dispatch]);

  if(isCameroading) {
    return(
      <p> Loading...</p>
    );
  }

  if(hasCameraError || !camera) {
    return(
      <p> hasCameraError...</p>
    );
  }

  return(
    <div className="wrapper">

      <Header />
      <main>
        <Helmet>
        Продукт - Фотошоп
        </Helmet>
        <div className="page-content">
          <Breadcrumbs productName={camera.name}/>
          <div className="page-content__section">
            <section className="product">
              <div className="container">
                <div className="product__img">
                  <picture>
                    <source type="image/webp" srcSet={`${camera.previewImgWebp}, ${camera.previewImgWebp2x}`} />
                    <img src={camera.previewImg} srcSet={camera.previewImg2x} width={560} height={480} alt={camera.name} />
                  </picture>
                </div>
                <div className="product__content">
                  <h1 className="title title--h3">{camera.name}</h1>
                  <div className="rate product__rate">
                    <RatingStars rating={camera.rating} />
                    <p className="visually-hidden">Рейтинг: {camera.rating}</p>
                    <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{camera.reviewCount}</p>
                  </div>
                  <p className="product__price"><span className="visually-hidden">Цена:</span>{camera.price} ₽</p>
                  <ButtonAddToBasket product={camera} buttonWithIcon />
                  <Tabs product={camera} />
                </div>
              </div>
            </section>
          </div>
          {/* <SimilarProducts id={camera.id.toString()} /> */}
          <SimilarProductsSwiper id={camera.id.toString()} />
          <ReviewsList id={camera.id.toString()} />
        </div>
      </main>
      <UpButton />
      <Footer />
    </div>
  );
}

export default ProductScreen;
