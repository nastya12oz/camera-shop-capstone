import { Fragment, useState, FormEvent } from 'react';
import { useAppDispatch } from '../../hooks';
import { fetchSendReviewAction } from '../../store/api-actions';
import { validateInputLength } from '../../utils';

type ModalAddReviewProps = {
  cameraId: string;
}
function ModalAddReview({cameraId}: ModalAddReviewProps): JSX.Element {

  const [userName, setUserName] = useState('');
  const [advantage, setAdvantage] = useState('');
  const [disadvantage, setDisadvantage] = useState('');
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');


  const dispatch = useAppDispatch();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateInputLength(userName, 2, 15) ||
    !validateInputLength(advantage, 10, 160) ||
    !validateInputLength(disadvantage, 10, 160) ||
    !validateInputLength(review, 10, 160)) {
      setErrorMessage('Проверьте правильность заполнения полей: имя (2-15 символов), преимущества, недостатки, и комментарий (10-160 символов каждый).');
      return;
    }


    const reviewData = {
      cameraId: 3,
      userName,
      advantage,
      disadvantage,
      review,
      rating
    };
    // dispatch(fetchSendReviewAction(reviewData));
    setErrorMessage('');

  };


  return(
    <div className="modal is-active">
      <div className="modal__wrapper">
        <div className="modal__overlay"></div>
        <div className="modal__content">
          <p className="title title--h4">Оставить отзыв</p>
          <div className="form-review">
            <form method="post" onSubmit={handleSubmit}>
              <div className="form-review__rate">
                <fieldset className="rate form-review__item">
                  <legend className="rate__caption">Рейтинг
                    <svg width="9" height="9" aria-hidden="true">
                      <use xlinkHref="#icon-snowflake"></use>
                    </svg>
                  </legend>
                  <div className="rate__bar">
                    <div className="rate__group">
                      {[...Array(5)].map((_, index) => {
                        const ratingValue = 5 - index; // Rating values from 5 to 1
                        return (
                          <Fragment key={ratingValue}>
                            <input
                              className="visually-hidden"
                              id={`star-${ratingValue}`}
                              name="rate"
                              type="radio"
                              value={ratingValue}
                              checked={rating === ratingValue}
                              onChange={() => setRating(ratingValue)}
                            />
                            <label className="rate__label" htmlFor={`star-${ratingValue}`} title={`${ratingValue} stars`}></label>
                          </Fragment>
                        );
                      })}

                    </div>
                    <div className="rate__progress">
                      <span className="rate__stars">0</span>
                      <span>/</span>
                      <span className="rate__all-stars">5</span>
                    </div>
                  </div>
                  <p className="rate__message">Нужно оценить товар</p>
                </fieldset>
                <div className="custom-input form-review__item">
                  <label>
                    <span className="custom-input__label">Ваше имя
                      <svg width="9" height="9" aria-hidden="true">
                        <use xlinkHref="#icon-snowflake"></use>
                      </svg>
                    </span>
                    <input
                      type="text"
                      name="user-name"
                      placeholder="Введите ваше имя"
                      value={userName}
                      required
                      onChange={(e) => setUserName(e.target.value)}
                    />
                  </label>
                  <p className="custom-input__error">Нужно указать имя</p>
                </div>
                <div className="custom-input form-review__item">
                  <label>
                    <span className="custom-input__label">Достоинства
                      <svg width="9" height="9" aria-hidden="true">
                        <use xlinkHref="#icon-snowflake"></use>
                      </svg>
                    </span>
                    <input
                      type="text"
                      name="user-plus"
                      placeholder="Основные преимущества товара"
                      required
                      value={advantage}
                      onChange={(e) => setAdvantage(e.target.value)}
                    />
                  </label>
                  <p className="custom-input__error">Нужно указать достоинства</p>
                </div>
                <div className="custom-input form-review__item">
                  <label>
                    <span className="custom-input__label">Недостатки
                      <svg width="9" height="9" aria-hidden="true">
                        <use xlinkHref="#icon-snowflake"></use>
                      </svg>
                    </span>
                    <input
                      type="text"
                      name="user-minus"
                      placeholder="Главные недостатки товара"
                      required
                      value={disadvantage}
                      onChange={(e) => setDisadvantage(e.target.value)}
                    />
                  </label>
                  <p className="custom-input__error">Нужно указать недостатки</p>
                </div>
                <div className="custom-textarea form-review__item">
                  <label>
                    <span className="custom-textarea__label">Комментарий
                      <svg width="9" height="9" aria-hidden="true">
                        <use xlinkHref="#icon-snowflake"></use>
                      </svg>
                    </span>
                    <textarea
                      name="user-comment"
                      minLength={5}
                      placeholder="Поделитесь своим опытом покупки"
                      value={review}
                      onChange={(e) => setReview(e.target.value)}
                    >

                    </textarea>
                  </label>
                  <div className="custom-input__error">Нужно добавить комментарий</div>
                </div>
              </div>
              {errorMessage && <div className="custom-textarea__error">{errorMessage}</div>}
              <button className="btn btn--purple form-review__btn" type="submit">Отправить отзыв</button>
            </form>
          </div>
          <button className="cross-btn" type="button" aria-label="Закрыть попап">
            <svg width="10" height="10" aria-hidden="true">
              <use xlinkHref="#icon-close"></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalAddReview;
