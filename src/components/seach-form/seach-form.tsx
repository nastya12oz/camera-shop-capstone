import { useState, useEffect } from 'react';
import { getCamerasList } from '../../store/cameras-data/cameras-data.selectors';
import { useAppSelector } from '../../hooks';
import FocusLock from 'react-focus-lock';
import { TCamerasList, TCamera } from '../../types/cameras';
import { getSearchedCameras } from '../../utils';
import classNames from 'classnames';
import { AppRoute } from '../../const';
import { useNavigate } from 'react-router-dom';


function SearchForm(): JSX.Element {
  const [searchInput, setSearchInput] = useState('');
  const [searchedCameras, setSearchedCameras] = useState<TCamerasList | null>(null);

  const cameras = useAppSelector(getCamerasList);
  const navigate = useNavigate();

  useEffect(() => {
    setSearchedCameras(getSearchedCameras(cameras, searchInput));
  },[cameras, searchInput]);


  return(

    <div className={classNames('form-search', {'list-opened': searchedCameras?.length})}>
      <FocusLock >
        <form>
          <label>
            <svg className="form-search__icon" width={16} height={16} aria-hidden="true">
              <use xlinkHref="#icon-lens"></use>
            </svg>
            <input
              className="form-search__input"
              type="text" autoComplete="off"
              placeholder="Поиск по сайту"
              value={searchInput}
              onChange={(evt) => setSearchInput(evt.currentTarget.value)}
            />
          </label>
          <ul className="form-search__select-list">
            {searchedCameras &&
          searchedCameras.map((camera: TCamera) => (
            <li
              key={camera.id}
              className="form-search__select-item"
              tabIndex={0}
              onClick={() => navigate(`${AppRoute.Product.replace(':id', camera.id.toString())}`)}
            >{camera.name}
            </li>))}
          </ul>
        </form>
        <button
          className={classNames('form-search__reset', {'form-search__reset-opend' : searchInput})}
          type="reset"
          onClick={() => {
            if (searchInput) {
              setSearchInput('');
            }
          }}
        >
          <svg width={10} height={10} aria-hidden="true">
            <use xlinkHref="#icon-close"></use>
          </svg><span className="visually-hidden">Сбросить поиск</span>
        </button>
      </FocusLock>
    </div>
  );
}

export default SearchForm;

