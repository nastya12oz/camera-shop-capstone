import { useState } from 'react';
import { createPortal } from 'react-dom';
import ModalAddToBasket from '../modal-add-to-basket/modal-add-to-basket';
import { TCamera } from '../../types/cameras';

type ButtonAddToBasketProps = {
  product: TCamera;
  buttonWithIcon?: boolean;
}

function ButtonAddToBasket({ product, buttonWithIcon }: ButtonAddToBasketProps): JSX.Element {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {buttonWithIcon ? (
        <button className="btn btn--purple" type="button" onClick={() => setShowModal(true)}>
          <svg width={24} height={16} aria-hidden="true">
            <use xlinkHref="#icon-add-basket"></use>
          </svg>
          Добавить в корзину
        </button>
      ) : (
        <button className="btn btn--purple product-card__btn" type="button" onClick={() => setShowModal(true)}>Купить</button>
      )}

      {showModal && createPortal(
        <ModalAddToBasket product={product} onClose={() => setShowModal(false)} />,
        document.body
      )}
    </>
  );
}

export default ButtonAddToBasket;
