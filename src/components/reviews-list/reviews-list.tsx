import ReviewCard from '../review-card/review-card';
import ButtonShowMoreReviews from '../button-show-more-reviews/button-show-more-reviews';
import { useAppSelector } from '../../hooks';
import { getReviews } from '../../store/reviews-data/reviews-data.selectors';
import { useState } from 'react';
import { DISPLAYED_REVIEWS } from '../../const';
import { sortByDate } from '../../utils';
import ButtonLeaveReview from '../button-leave-review/button-leave-review';

type ReviewsListProps = {
  id: string;
}

function ReviewsList({id}: ReviewsListProps): JSX.Element {
  const reviews = useAppSelector(getReviews);
  const [visibleReviewsCount, setVisibleReviewsCount] = useState(DISPLAYED_REVIEWS);

  const sortedReviews = sortByDate(reviews);
  const visibleReviews = sortedReviews.slice(0, visibleReviewsCount);

  const showMoreReviews = () => {
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
            <ButtonShowMoreReviews onClick={showMoreReviews} />
          )}
        </div>
      </section>
    </div>

  );
}

export default ReviewsList;
