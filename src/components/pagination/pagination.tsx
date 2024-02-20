import classNames from 'classnames';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { useState } from 'react';

type PaginationProps = {
  totalPages: number;
};

function Pagination({ totalPages }: PaginationProps): JSX.Element {
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const currentPageParam = searchParams.get('page');
  const [pageSetStart, setPageSetStart] = useState(1);
  const currentPage = currentPageParam ? Number(currentPageParam) : 1;
  const isBackButtonVisible = pageSetStart > 1;
  const isNextButtonVisible = pageSetStart + 2 < totalPages;

  const visiblePages = Array.from({ length: Math.min(3, totalPages - pageSetStart + 1) }, (_, i) => pageSetStart + i);

  return (
    <div className="pagination" data-testid="pagination-container">
      <ul className="pagination__list">
        {isBackButtonVisible && (
          <li className="pagination__item" data-testid="back-button" onClick={() => setPageSetStart(pageSetStart - 3)}>
            <Link className="pagination__link" to={`${pathname}?page=${pageSetStart - 1}`}>Назад</Link>
          </li>
        )}
        {visiblePages.map((page) => (
          <li key={page} className="pagination__item">
            <Link
              className={classNames('pagination__link', { 'pagination__link--active': currentPage === page })}
              to={`${pathname}?page=${page}`}
            >
              {page}
            </Link>
          </li>
        ))}
        {isNextButtonVisible && (
          <li className="pagination__item" data-testid="forward-button" onClick={() => setPageSetStart(pageSetStart + 3)}>
            <Link className="pagination__link" to={`${pathname}?page=${pageSetStart + 3}`}>Далее</Link>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Pagination;
