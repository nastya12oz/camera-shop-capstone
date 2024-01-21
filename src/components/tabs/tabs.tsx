import { TCamera } from '../../types/cameras';
import { useState } from 'react';
import classNames from 'classnames';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';


type TabsProps = {
  product: TCamera;
}

function Tabs({product}: TabsProps): JSX.Element {

  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    const getTabFromUrl = () => new URLSearchParams(location.search).get('tab') || 'description';
    const tabFromUrl = getTabFromUrl();

    if (tabFromUrl === 'characteristics' || tabFromUrl === 'description') {
      setActiveTab(tabFromUrl);
    }
  }, [location.search]);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    const newSearchParams = new URLSearchParams();
    newSearchParams.set('tab', tab);
    navigate(`${location.pathname}?${newSearchParams.toString()}`, { replace: true });
  };

  return(
    <div className="tabs product__tabs">
      <div className="tabs__controls product__tabs-controls">
        <button
          className={classNames('tabs__control', { 'is-active': activeTab === 'characteristics' })}
          onClick={() => handleTabClick('characteristics')}
          type="button"
        >Характеристики
        </button>
        <button
          className={classNames('tabs__control', { 'is-active': activeTab === 'description' })}
          type="button"
          onClick={() => handleTabClick('description')}
        >
          Описание
        </button>
      </div>
      <div className="tabs__content">
        <div className={classNames('tabs__element', { 'is-active': activeTab === 'characteristics' })}>
          <ul className="product__tabs-list">
            <li className="item-list"><span className="item-list__title">Артикул:</span>
              <p className="item-list__text"> {product.vendorCode}</p>
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
        <div className={classNames('tabs__element', { 'is-active': activeTab === 'description' })}>
          <div className="product__tabs-text">
            <p>{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tabs;
