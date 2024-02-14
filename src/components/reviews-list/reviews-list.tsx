import ReviewCard from '../review-card/review-card';
import ButtonShowMoreReviews from '../button-show-more-reviews/button-show-more-reviews';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { getReviews, getReviewSentSuccessfullyStatus } from '../../store/reviews-data/reviews-data.selectors';
import { useState, useCallback } from 'react';
import { DISPLAYED_REVIEWS } from '../../const';
import { sortByDate } from '../../utils';
import ButtonLeaveReview from '../button-leave-review/button-leave-review';
import { useEffect } from 'react';
import ModalReviewSuccess from '../modal-review-success/modal-review-success';
import { createPortal } from 'react-dom';
import { fetchReviewsAction } from '../../store/api-actions';
import { resetReviewSentSuccess } from '../../store/reviews-data/reviews-data.slice';

type ReviewsListProps = {
  id: number;
}

function ReviewsList({id}: ReviewsListProps): JSX.Element {
  const dispatch = useAppDispatch();
  const reviews = useAppSelector(getReviews);
  const reviewSentSuccessfully = useAppSelector(getReviewSentSuccessfullyStatus);

  const [visibleReviewsCount, setVisibleReviewsCount] = useState(DISPLAYED_REVIEWS);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    if (reviewSentSuccessfully) {
      dispatch(fetchReviewsAction(id.toString()));
      setShowSuccessModal(true);
    }
  }, [reviewSentSuccessfully]);

  const handleCloseModal = useCallback(() => {
    setShowSuccessModal(false);
    dispatch(resetReviewSentSuccess());
  }, [dispatch]);


  const sortedReviews = sortByDate(reviews);
  const visibleReviews = sortedReviews.slice(0, visibleReviewsCount);

  const handleShowMoreReviews = () => {
    setVisibleReviewsCount((current) => Math.min(current + DISPLAYED_REVIEWS, reviews.length));
  };

  return(
    <div className="page-content__section">
      <section className="review-block">
        <div className="container">
          <div className="page-content__headed">
            <h2 className="title title--h3">Отзывы</h2>
            <ButtonLeaveReview id={id} />

          </div>
          <ul className="review-block__list">
            {
              visibleReviews.map((review) => <ReviewCard key={review.id} review={review} />)
            }

          </ul>

          {visibleReviewsCount < reviews.length && (
            <ButtonShowMoreReviews onClick={handleShowMoreReviews} />
          )}
        </div>
      </section>

      {showSuccessModal && createPortal(
        <ModalReviewSuccess onClose={handleCloseModal} />,
        document.body
      )}
    </div>


  );
}

export default ReviewsList;
