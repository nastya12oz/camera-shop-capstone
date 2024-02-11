import { TCamera } from '../../types/cameras';
import classNames from 'classnames';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { CameraTab } from '../../const';


type TabsProps = {
  product: TCamera;
}

function Tabs({product}: TabsProps): JSX.Element {

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const {pathname} = useLocation();
  const activeTab = searchParams.get('tab') || CameraTab.Description;


  return(
    <div className="tabs product__tabs">
      <div className="tabs__controls product__tabs-controls">
        <button
          className={classNames('tabs__control', { 'is-active': activeTab === CameraTab.Property })}
          onClick={() => navigate(`${pathname}?tab=${CameraTab.Property}`)}
          type="button"
        >Характеристики
        </button>
        <button
          className={classNames('tabs__control', { 'is-active': activeTab === CameraTab.Description })}
          type="button"
          onClick={() => navigate(`${pathname}?tab=${CameraTab.Description}`)}
        >
          Описание
        </button>
      </div>
      <div className="tabs__content">
        <div className={classNames('tabs__element', { 'is-active': activeTab === CameraTab.Property })}>
          <ul className="product__tabs-list">
            <li className="item-list"><span className="item-list__title">Артикул:</span>
              <p className="item-list__text">{product.vendorCode}</p>
            </li>
            <li className="item-list"><span className="item-list__title">Категория:</span>
              <p className="item-list__text">{product.category}</p>
            </li>
            <li className="item-list"><span className="item-list__title">Тип камеры:</span>
              <p className="item-list__text">{product.type}</p>
            </li>
            <li className="item-list"><span className="item-list__title">Уровень:</span>
              <p className="item-list__text">{product.level}</p>
            </li>
          </ul>
        </div>
        <div className={classNames('tabs__element', { 'is-active': activeTab === CameraTab.Description })}>
          <div className="product__tabs-text">
            <p>{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tabs;
