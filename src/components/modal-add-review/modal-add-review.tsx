import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchSendReviewAction } from '../../store/api-actions';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import { TReviewSent, TReviewFromData } from '../../types/reviews';
import { Fragment } from 'react';
import classNames from 'classnames';
import './modal-add-review.css';
import Modal from '../modal/modal';
import { getReviewSendingErrorStatus, getReviewSendingStatus, getReviewSentSuccessfullyStatus } from '../../store/reviews-data/reviews-data.selectors';
import { TextReviewValues, ReviewValues, STARS_COUNT } from '../../const';
import { useEffect } from 'react';


type ModalAddReviewProps = {
  cameraId: number;
  onClose: () => void;
}
function ModalAddReview({cameraId, onClose}: ModalAddReviewProps): JSX.Element {

  const dispatch = useAppDispatch();
  const hasSendindError = useAppSelector(getReviewSendingErrorStatus);
  const isReviewSending = useAppSelector(getReviewSendingStatus);
  const {register, handleSubmit, watch, formState: { errors } } = useForm<TReviewFromData>({mode: 'onChange'});
  const ratingValue = watch('rating');
  const submittedSuccessfully = useAppSelector(getReviewSentSuccessfullyStatus);

  const handleFormSubmit: SubmitHandler<FieldValues> = (data) => {
    if (cameraId) {
      const currentData = {...data, cameraId, rating: Number(data.rating)} as TReviewSent;
      dispatch(fetchSendReviewAction(currentData));
    }
  };

  useEffect(() => {
    if (submittedSuccessfully && !isReviewSending && !hasSendindError) {
      onClose();
    }
  }, [submittedSuccessfully, isReviewSending, hasSendindError, onClose]);

  return(
    <Modal onClose={onClose} data-testid="modal-add-review">
      <p className="title title--h4">Оставить отзыв</p>
      <div className="form-review">
        <form
          method="post"
          onSubmit={(evt) => {
            handleSubmit(handleFormSubmit)(evt);
          }}
        >
          <div className="form-review__rate">
            <fieldset className="rate form-review__item">
              <legend className="rate__caption">Рейтинг
                <svg width={9} height={9} aria-hidden="true">
                  <use xlinkHref="#icon-snowflake"></use>
                </svg>
              </legend>
              <div className="rate__bar" data-testid="rate__bar">
                <div className="rate__group">
                  {Array.from({length: STARS_COUNT}, (_, i) => 5 - i).map((star) => (
                    <Fragment key={star}>
                      <input
                        key={star}
                        className="visually-hidden"
                        id={`star-${star}`}
                        type="radio"
                        value={star}
                        {...register('rating',
                          { required: 'Обязательное поле',
                          }
                        )}
                      />
                      <label className="rate__label" htmlFor={`star-${star}`} title="Отлично"></label>
                    </Fragment>
                  )
                  )}
                </div>
                <div className="rate__progress">
                  { ratingValue ? <span className="rate__stars">{ratingValue}</span>
                    : <span className="rate__stars">0</span>}
                  <span>/</span>
                  <span className="rate__all-stars">{STARS_COUNT}</span>
                </div>
              </div>
              <p className={classNames('rate__message', {'custom-textarea__error-active' : errors.rating})}>{errors.rating?.message}</p>

            </fieldset>
            <div className="custom-input form-review__item">
              <label>
                <span className="custom-input__label">Ваше имя
                  <svg width={9} height={9} aria-hidden="true">
                    <use xlinkHref="#icon-snowflake"></use>
                  </svg>
                </span>
                <input
                  {...register('userName', {
                    required: 'Обязательное поле',
                    minLength: {
                      value: ReviewValues.MIN,
                      message: 'Минимум 2 символа',
                    },
                    maxLength: {
                      value: ReviewValues.MAX,
                      message: 'Максимум 15 символов',
                    },
                  })}
                  placeholder="Введите ваше имя"
                  data-testid="name"
                />
              </label>
              <p className={classNames('custom-input__error', {'custom-textarea__error-active' : errors.userName})}>{errors.userName?.message}</p>
            </div>
            <div className="custom-input form-review__item">
              <label>
                <span className="custom-input__label">Достоинства
                  <svg width={9} height={9} aria-hidden="true">
                    <use xlinkHref="#icon-snowflake"></use>
                  </svg>
                </span>
                <input
                  {...register('advantage', {
                    required: 'Обязательное поле',
                    minLength: {
                      value: ReviewValues.MIN,
                      message: 'Минимум 2 символа',
                    },
                    maxLength: {
                      value: ReviewValues.MAX,
                      message: 'Максимум 15 символов',
                    },
                  })}
                  placeholder=" Достоинства"
                  data-testid="advantage"
                />
              </label>
              <p className={classNames('custom-input__error', {'custom-textarea__error-active' : errors.advantage})}>{errors.advantage?.message}</p>
            </div>
            <div className="custom-input form-review__item">
              <label>
                <span className="custom-input__label">Недостатки
                  <svg width="9" height="9" aria-hidden="true">
                    <use xlinkHref="#icon-snowflake"></use>
                  </svg>
                </span>
                <input
                  {...register('disadvantage', {
                    required: 'Обязательное поле',
                    minLength: {
                      value: ReviewValues.MIN,
                      message: 'Минимум 2 символа',
                    },
                    maxLength: {
                      value: ReviewValues.MAX,
                      message: 'Максимум 15 символов',
                    },
                  })}
                  placeholder="Недостатки"
                  data-testid="disadvantage"
                />
              </label>
              <p className={classNames('custom-input__error', {'custom-textarea__error-active' : errors.disadvantage})}>{errors.disadvantage?.message}</p>
            </div>
            <div className="custom-textarea form-review__item">
              <label>
                <span className="custom-textarea__label">Комментарий
                  <svg width={9} height={9} aria-hidden="true">
                    <use xlinkHref="#icon-snowflake"></use>
                  </svg>
                </span>
                <textarea
                  {...register('review', {
                    required: 'Обязательное поле',
                    minLength: {
                      value: TextReviewValues.MIN,
                      message: 'Минимум 10 символов',
                    },
                    maxLength: {
                      value: TextReviewValues.MAX,
                      message: 'Максимум 160 символов',
                    },
                  })}
                  placeholder="Поделитесь своим опытом покупки"
                  data-testid="comment"
                >
                </textarea>
              </label>
              <div className={classNames('custom-textarea__error', {'custom-textarea__error-active' : errors.review})}>{errors.review?.message}</div>
            </div>
          </div>
          <button className="btn btn--purple form-review__btn" type="submit">Отправить отзыв</button>
        </form>
      </div>
      <button className="cross-btn" type="button" aria-label="Закрыть попап" onClick={onClose}>
        <svg width={10} height={10} aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg>
      </button>
    </Modal>
  );
}

export default ModalAddReview;
