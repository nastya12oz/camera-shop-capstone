type RatingProps = {
  rating: number;
}

function RatingStars({rating}: RatingProps): JSX.Element[] {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(
      <svg width={17} height={16} aria-hidden="true" key={i}>
        <use xlinkHref={i < rating ? '#icon-full-star' : '#icon-star'}></use>
      </svg>
    );
  }
  return stars;
}

export default RatingStars;
