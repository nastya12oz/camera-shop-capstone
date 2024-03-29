import { useState } from 'react';
import { createPortal } from 'react-dom';
import ModalAddReview from '../modal-add-review/modal-add-review';


type ButtonLeaveReviewProps ={
  id: number;
}

function ButtonLeaveReview({id}: ButtonLeaveReviewProps): JSX.Element {
  const [showModal, setShowModal] = useState(false);

  return(
    <>
      <button className="btn" type="button" onClick={() => setShowModal(true)} data-testid="button-add-review">Оставить свой отзыв</button>
      {showModal && createPortal(
        <ModalAddReview cameraId={id} onClose={() => setShowModal(false)} />,
        document.body
      )}
    </>
  );
}

export default ButtonLeaveReview;
