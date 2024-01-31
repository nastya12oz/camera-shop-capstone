import { useAppDispatch } from '../../hooks';
import { fetchSendReviewAction, fetchReviewsAction } from '../../store/api-actions';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { TReviewSent } from '../../types/reviews';


type ModalAddReviewProps = {
  cameraId: string;
  onClose: () => void;
}
function ModalAddReview({cameraId, onClose}: ModalAddReviewProps): JSX.Element {


  const dispatch = useAppDispatch();
  const {id} = useParams();
  const {register, handleSubmit, formState: { errors } } = useForm({mode: 'onChange'});


  const handleFormSubmit: SubmitHandler<FieldValues> = (data) => {
    if (id) {
      const currentData = {...data, cameraId: Number(cameraId), rating: Number(data.rating)} as TReviewSent;
      dispatch(fetchSendReviewAction(currentData));
      dispatch(fetchReviewsAction(cameraId));
      onClose();
    }
  };


  return(
    <div className="modal is-active">
      <div className="modal__wrapper">
        <div className="modal__overlay"></div>
        <div className="modal__content">
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
                    <svg width="9" height="9" aria-hidden="true">
                      <use xlinkHref="#icon-snowflake"></use>
                    </svg>
                  </legend>
                  <div className="rate__bar">
                    <div className="rate__group">
                      {Array.from({length: 5}, (_, i) => 5 - i).map((star) => (
                        <>
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
                        </>
                      )
                      )}
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
                      {...register('userName', {
                        required: 'Обязательное поле',
                        minLength: {
                          value: 2,
                          message: 'Минимум 2 символа',
                        },
                        maxLength: {
                          value: 15,
                          message: 'Максимум 15 символов',
                        },
                      })}
                      placeholder="Введите ваше имя"
                    />
                  </label>
                  {errors.userName && <p className="custom-input__error">Нужно указать имя</p>}
                </div>
                <div className="custom-input form-review__item">
                  <label>
                    <span className="custom-input__label">Достоинства
                      <svg width="9" height="9" aria-hidden="true">
                        <use xlinkHref="#icon-snowflake"></use>
                      </svg>
                    </span>
                    <input
                      {...register('sadvantage', {
                        required: 'Обязательное поле',
                        minLength: {
                          value: 2,
                          message: 'Минимум 2 символа',
                        },
                        maxLength: {
                          value: 15,
                          message: 'Максимум 15 символов',
                        },
                      })}
                      placeholder=" Достоинства"
                    />
                  </label>
                  {errors.advantage && <p className="custom-input__error">Нужно указать достоинства</p>}
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
                          value: 2,
                          message: 'Минимум 2 символа',
                        },
                        maxLength: {
                          value: 15,
                          message: 'Максимум 15 символов',
                        },
                      })}
                      placeholder="Недостатки"
                    />
                  </label>
                  {errors.disadvantage && <p className="custom-input__error">Нужно указать недостатки</p>}

                </div>
                <div className="custom-textarea form-review__item">
                  <label>
                    <span className="custom-textarea__label">Комментарий
                      <svg width="9" height="9" aria-hidden="true">
                        <use xlinkHref="#icon-snowflake"></use>
                      </svg>
                    </span>
                    <textarea
                      {...register('review', {
                        required: 'Обязательное поле',
                        minLength: {
                          value: 10,
                          message: 'Минимум 10 символов',
                        },
                        maxLength: {
                          value: 160,
                          message: 'Максимум 160 символов',
                        },
                      })}
                      placeholder="Поделитесь своим опытом покупки"
                    >
                    </textarea>
                    {errors.review && <div className="custom-input__error">Нужно добавить комментарий</div>}
                  </label>
                </div>
              </div>
              <button className="btn btn--purple form-review__btn" type="submit">Отправить отзыв</button>
            </form>
          </div>
          <button className="cross-btn" type="button" aria-label="Закрыть попап" onClick={onClose}>
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
