import { useLocation, Link } from 'react-router-dom';
import { AppRoute } from '../../../const';

type BreadcrumbsProps = {
  productName?: string;
}

function Breadcrumbs({productName}: BreadcrumbsProps): JSX.Element {
  const location = useLocation();
  const currentPath = location.pathname.split('/').filter((crumb) => crumb)[0];

  return (
    <div className="breadcrumbs">
      <div className="container">
        <ul className="breadcrumbs__list">
          <li className="breadcrumbs__item">
            <Link className="breadcrumbs__link" to={AppRoute.Catalog}>Главная
              <svg width={5} height={8} aria-hidden="true">
                <use xlinkHref="#icon-arrow-mini"></use>
              </svg>
            </Link>
          </li>
          <li className="breadcrumbs__item">
            <Link className="breadcrumbs__link" to={AppRoute.Catalog}>Каталог
              <svg width={5} height={8} aria-hidden="true">
                <use xlinkHref="#icon-arrow-mini"></use>
              </svg>
            </Link>
          </li>
          {currentPath === 'product' && (
            <li className="breadcrumbs__item">
              <span className="breadcrumbs__link breadcrumbs__link--active">{productName}</span>
            </li>
          )}
          {currentPath === 'Basket' && (
            <li className="breadcrumbs__item">
              <span className="breadcrumbs__link breadcrumbs__link--active">Корзина</span>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Breadcrumbs;
