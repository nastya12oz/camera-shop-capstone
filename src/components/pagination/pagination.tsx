import classNames from 'classnames';
import { Link, useLocation, useSearchParams } from 'react-router-dom';


type PaginationProps = {
  totalPages: number;
}


function Pagination({ totalPages}: PaginationProps): JSX.Element {
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const currentPageParam = searchParams.get('page');

  const currentPage = currentPageParam ? Number(currentPageParam) : 1;

  const isBackButtonVisible = currentPage > 1;
  const isNextButtonVisible = currentPage < totalPages;

  const getVisiblePages = (current: number, total: number) => {
    const pages = [];
    for (let i = Math.max(1, current - 2); i <= Math.min(current + 2, total); i++) {
      pages.push(i);
    }
    return pages;
  };

  const visiblePages = getVisiblePages(currentPage, totalPages);
  return (
    <div className="pagination" data-testid="pagination-container">
      <ul className="pagination__list">
        {isBackButtonVisible && (
          <li className="pagination__item" data-testid="back-button">
            <Link className="pagination__link" to={`${pathname}?page=${currentPage - 1}`}>
              Назад
            </Link>
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
          <li className="pagination__item" data-testid="forward-button">
            <Link className="pagination__link" to={`${pathname}?page=${currentPage + 1}`}>
              Далее
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Pagination;
