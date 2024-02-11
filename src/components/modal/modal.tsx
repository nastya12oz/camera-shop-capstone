import { useEffect } from 'react';
import classNames from 'classnames';

type ModalProps = {
  onClose: () => void;
  children: React.ReactNode;
  isNarrow?: boolean;
}

function Modal({onClose, children, isNarrow}: ModalProps): JSX.Element {
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

  const handleOverlayClick = () => onClose();

  return(
    <div className={classNames('modal is-active', {'modal-narrow' : isNarrow})}>
      <div className="modal__wrapper">
        <div className="modal__overlay" onClick={handleOverlayClick}></div>
        <div className="modal__content">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;
