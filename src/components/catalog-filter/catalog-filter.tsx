import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { TFilterCategory, FilterNameSpace, Filter, FilterType, LevelFilterType } from '../../const';
import { getAllSearchParams } from '../../utils';


type Params = {
  category: string;
  type: string;
  level: string;
  _start: string;
  _end: string;
  [key: string]: string;
};

function CatalogFilter(): JSX.Element {
  const [maxPrice, setMaxPrice] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const [category, setCategory] = useState(searchParams.get(Filter.Category) || '');
  const [cameraType, setCameraType] = useState(searchParams.get(Filter.Type)?.split(',') || []);
  const [level, setLevel] = useState(searchParams.get(Filter.Level)?.split(',') || []);


  const params = useMemo(() => {
    const updatedParams: Params = {category, type: cameraType.join(','), level: level.join(','), _start: minPrice, _end: maxPrice};
    return Object.fromEntries(
      Object.entries(updatedParams).filter(([, value]) => value)
    );
  }, [category, cameraType, level, maxPrice, minPrice]);


  useEffect(() => {
    setSearchParams({...params, ...getAllSearchParams(searchParams)});
  }, [category, cameraType, level, params, setSearchParams, searchParams]);

  const resetFilters = () => {
    setSearchParams((prev) => {
      const newSearchPararm = new URLSearchParams(prev);

      newSearchPararm.delete(Filter.Category);
      newSearchPararm.delete(Filter.Type);
      newSearchPararm.delete(Filter.Level);
      newSearchPararm.delete('_start');
      newSearchPararm.delete('_end');

      return newSearchPararm;
    });

    setCategory('');
    setCameraType([]);
    setLevel([]);
    setMinPrice('');
    setMaxPrice('');
  };

  useEffect(() => {
    resetFilters();
  }, []);


  useEffect(() => {
    const newParams = new URLSearchParams(searchParams);
    if (minPrice) {
      newParams.set('_start', minPrice);
    } else {
      newParams.delete('_start');
    }

    if (maxPrice) {
      newParams.set('_end', maxPrice);
    } else {
      newParams.delete('_end');
    }

    setSearchParams(newParams);
  }, [minPrice, maxPrice, searchParams, setSearchParams]);


  const handlePriceChange = (evt: ChangeEvent<HTMLInputElement>, isMinPrice: boolean) => {
    const value = evt.target.value;
    if (isMinPrice) {
      setMinPrice(value);
    } else {
      setMaxPrice(value);
    }
  };

  const handlePriceBlur = () => {
    const minPriceNum = Number(minPrice);
    const maxPriceNum = Number(maxPrice);

    if (minPriceNum > maxPriceNum) {
      setMaxPrice(minPrice);
    } else if (maxPriceNum < minPriceNum) {
      setMinPrice(maxPrice);
    }
  };


  const handleCheckboxClick = (evt: ChangeEvent<HTMLInputElement>, type: string) => {
    const name = evt.target.name;

    switch(type) {
      case Filter.Category:
        setCategory((prev) => prev === name ? '' : name);
        if (name === TFilterCategory.Videocamera) {
          setCameraType((prev) => prev.filter((camera) => camera !== FilterType.Film && camera !== FilterType.Snapshot));
        }
        break;
      case Filter.Type:
        setCameraType((prev) => prev.includes(name) ? prev.filter((camera) => camera !== name) : [...prev, name]);
        break;
      case Filter.Level:
        setLevel((prev) => prev.includes(name) ? prev.filter((camera) => camera !== name) : [...prev, name]);
        break;
    }
  };

  const handleCheckboxKeyDown = (evt: React.KeyboardEvent<HTMLInputElement>, type: string) => {
    if (evt.key === 'Enter') {
      evt.preventDefault();
      const target = evt.target as HTMLInputElement;
      target.checked = !target.checked;
      handleCheckboxClick({ target } as ChangeEvent<HTMLInputElement>, type);
    }
  };

  return (
    <div className="catalog__aside">
      <div className="catalog-filter">
        <form action="#">
          <h2 className="visually-hidden">Фильтр</h2>
          <fieldset className="catalog-filter__block">
            <legend className="title title--h5">Цена, ₽</legend>
            <div className="catalog-filter__price-range">
              <div className="custom-input">
                <label>
                  <input
                    type="number"
                    name="price"
                    placeholder="от"
                    value={minPrice || ''}
                    onChange={(evt) => handlePriceChange(evt, true)}
                    onBlur={handlePriceBlur}

                    id="coast"
                  />
                </label>
              </div>
              <div className="custom-input">
                <label>
                  <input
                    type="number"
                    name="priceUp"
                    placeholder="до"
                    onChange={(evt) => handlePriceChange(evt, false)}
                    onBlur={handlePriceBlur}

                    value={maxPrice || ''}
                    id="coast"
                  />
                </label>
              </div>
            </div>
          </fieldset>
          <fieldset className="catalog-filter__block">
            <legend className="title title--h5">Категория</legend>
            {Object.values(TFilterCategory).map((type) => (
              <div className="custom-checkbox catalog-filter__item" key={type}>
                <label >
                  <input
                    type="checkbox"
                    name={type}
                    id={Filter.Category}
                    checked={category === type}
                    onChange={(evt) => handleCheckboxClick(evt, Filter.Category)}
                    onKeyDown={(evt) => handleCheckboxKeyDown(evt, Filter.Category)}
                  />
                  <span className="custom-checkbox__icon"></span>
                  <span className="custom-checkbox__label">{FilterNameSpace[type]}</span>
                </label>
              </div>
            ))}
          </fieldset>
          <fieldset className="catalog-filter__block">
            <legend className="title title--h5">Тип камеры</legend>
            {Object.values(FilterType).map((filter) => (
              <div className="custom-checkbox catalog-filter__item" key={filter}>
                <label>
                  <input
                    type="checkbox"
                    name={filter}
                    id={Filter.Type}
                    disabled={category === TFilterCategory.Videocamera && (filter === FilterType.Film || filter === FilterType.Snapshot)}
                    checked = {Boolean(cameraType.find((type) => type === filter))}
                    onChange={(evt) => handleCheckboxClick(evt, Filter.Type)}
                    onKeyDown={(evt) => handleCheckboxKeyDown(evt, Filter.Type)}

                  />
                  <span className="custom-checkbox__icon"></span>
                  <span className="custom-checkbox__label">{FilterNameSpace[filter]}</span>
                </label>
              </div>
            ))}
          </fieldset>
          <fieldset className="catalog-filter__block">
            <legend className="title title--h5">Уровень</legend>
            {Object.values(LevelFilterType).map((filter) => (
              <div className="custom-checkbox catalog-filter__item" key={filter}>
                <label>
                  <input
                    type="checkbox"
                    name={filter}
                    id={Filter.Level}
                    onChange={(evt) => handleCheckboxClick(evt, Filter.Level)}
                    checked = {Boolean(level.find((type) => type === filter))}
                    onKeyDown={(evt) => handleCheckboxKeyDown(evt, Filter.Level)}

                  />
                  <span className="custom-checkbox__icon"></span>
                  <span className="custom-checkbox__label">{FilterNameSpace[filter]}</span>
                </label>
              </div>
            ))}
          </fieldset>
          <button
            className="btn catalog-filter__reset-btn"
            type="reset"
            onClick={resetFilters}
          >Сбросить фильтры
          </button>
        </form>
      </div>
    </div>
  );
}

export default CatalogFilter;
