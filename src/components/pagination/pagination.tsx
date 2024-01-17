import classNames from 'classnames';

type PaginationProps = {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}


function Pagination({ totalPages, onPageChange, currentPage }: PaginationProps): JSX.Element {
  const handlePageClick = (page: number) => {
    onPageChange(page);
  };

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    if (i === currentPage || i === currentPage + 1 || i === currentPage + 2) {
      pages.push(
        <li key={i} className="pagination__item">
          <a
            className={classNames('pagination__link', { 'pagination__link--active': currentPage === i })}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handlePageClick(i);
            }}
          >
            {i}
          </a>
        </li>
      );
    }
  }

  return (
    <div className="pagination">
      <ul className="pagination__list">
        {currentPage > 1 && (
          <li className="pagination__item">
            <a
              className="pagination__link"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePageClick(currentPage - 1);
              }}
            >
              Назад
            </a>
          </li>
        )}
        {pages}
        {currentPage + 2 < totalPages && (
          <li className="pagination__item">
            <a
              className="pagination__link"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePageClick(currentPage + 3);
              }}
            >
              Далее
            </a>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Pagination;
