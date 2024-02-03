import { useState } from 'react';
import { createPortal } from 'react-dom';
import ModalAddReview from '../modal-add-review/modal-add-review';


type ButtonLeaveReviewProps ={
  id: string;
}

function ButtonLeaveReview({id}: ButtonLeaveReviewProps): JSX.Element {
  const [showModal, setShowModal] = useState(false);

  return(
    <>
      <button className="btn" type="button" onClick={() => setShowModal(true)}>Оставить свой отзыв</button>
      {showModal && createPortal(
        <ModalAddReview cameraId={id} onClose={() => setShowModal(false)} />,
        document.body
      )}
    </>
  );
}

export default ButtonLeaveReview;
