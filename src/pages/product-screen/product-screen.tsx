import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs/breadcrumbs';
import { getCamera, getCameraErrorStatus, getCameraLoadingStatus } from '../../store/cameras-data/cameras-data.selectors';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { fetchCameraByIdAction } from '../../store/api-actions';

function ProductScreen(): JSX.Element {

  const {id} = useParams();
  const dispatch = useAppDispatch();
  const isCameroading = useAppSelector(getCameraLoadingStatus);
  const camera = useAppSelector(getCamera);
  const hasCameraError = useAppSelector(getCameraErrorStatus);

  useEffect(() => {
    if (id) {
      dispatch(fetchCameraByIdAction(id));
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

        <div className="page-content">
          <Breadcrumbs productName={camera.name}/>
        </div>
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
                  <svg width="17" height="16" aria-hidden="true">
                    <use xlinkHref="#icon-full-star"></use>
                  </svg>
                  <svg width="17" height="16" aria-hidden="true">
                    <use xlinkHref="#icon-full-star"></use>
                  </svg>
                  <svg width="17" height="16" aria-hidden="true">
                    <use xlinkHref="#icon-full-star"></use>
                  </svg>
                  <svg width="17" height="16" aria-hidden="true">
                    <use xlinkHref="#icon-full-star"></use>
                  </svg>
                  <svg width="17" height="16" aria-hidden="true">
                    <use xlinkHref="#icon-star"></use>
                  </svg>
                  <p className="visually-hidden">Рейтинг: 4</p>
                  <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{camera.rating}</p>
                </div>
                <p className="product__price"><span className="visually-hidden">Цена:</span>{camera.price} ₽</p>
                <button className="btn btn--purple" type="button">
                  <svg width={24} height={16} aria-hidden="true">
                    <use xlinkHref="#icon-add-basket"></use>
                  </svg>Добавить в корзину
                </button>
                <div className="tabs product__tabs">
                  <div className="tabs__controls product__tabs-controls">
                    <button className="tabs__control" type="button">Характеристики</button>
                    <button className="tabs__control is-active" type="button">Описание</button>
                  </div>
                  <div className="tabs__content">
                    <div className="tabs__element">
                      <ul className="product__tabs-list">
                        <li className="item-list"><span className="item-list__title">Артикул:</span>
                          <p className="item-list__text"> DA4IU67AD5</p>
                        </li>
                        <li className="item-list"><span className="item-list__title">Категория:</span>
                          <p className="item-list__text">Видеокамера</p>
                        </li>
                        <li className="item-list"><span className="item-list__title">Тип камеры:</span>
                          <p className="item-list__text">Коллекционная</p>
                        </li>
                        <li className="item-list"><span className="item-list__title">Уровень:</span>
                          <p className="item-list__text">{camera.level}</p>
                        </li>
                      </ul>
                    </div>
                    <div className="tabs__element is-active">
                      <div className="product__tabs-text">
                        <p>{camera.description}</p>
                      </div>
                    </div>
                  </div>
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

export default ProductScreen;
