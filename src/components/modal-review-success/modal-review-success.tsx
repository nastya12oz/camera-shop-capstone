import { useEffect } from 'react';
import Modal from '../modal/modal';

type ModalReviewSuccessProps = {
  onClose: () => void;
}

function ModalReviewSuccess({onClose}: ModalReviewSuccessProps): JSX.Element {

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return(
    <Modal onClose={onClose} isNarrow>
      <p className="title title--h4">Спасибо за отзыв</p>
      <svg className="modal__icon" width={80} height={78} aria-hidden="true">
        <use xlinkHref="#icon-review-success"></use>
      </svg>
      <div className="modal__buttons">
        <button className="btn btn--purple modal__btn modal__btn--fit-width" type="button" onClick={onClose}>Вернуться к покупкам
        </button>
      </div>
      <button className="cross-btn" type="button" aria-label="Закрыть попап" onClick={onClose}>
        <svg width={10} height={10} aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg>
      </button>
    </Modal>
  );
}

export default ModalReviewSuccess;
