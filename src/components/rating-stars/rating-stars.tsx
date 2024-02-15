import { STARS_COUNT } from '../../const';

type RatingProps = {
  rating: number;
}

function RatingStars({rating}: RatingProps): JSX.Element {
  return (
    <>
      {Array.from({length: STARS_COUNT}, (_, i) => i).map((item) => (
        <svg key={item} width={17} height={16} aria-hidden="true" data-testid="star-item">
          <use xlinkHref={item < rating ? '#icon-full-star' : '#icon-star'}></use>
        </svg>
      ))}
    </>
  );
}

export default RatingStars;
