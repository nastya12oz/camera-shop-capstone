import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from './pagination';
import { withHistory } from '../../mock/mock-components';

describe('Component: Pagination', () => {
  const totalPages = 33;
  it('should render correctly', () => {
    const paginationTestId = 'pagination-container';
    const preparedComponent = withHistory(<Pagination totalPages={totalPages} />);

    render(preparedComponent);

    expect(screen.getByTestId(paginationTestId)).toBeInTheDocument();
  });

  it('should change the page number after clicking on "Назад"', () => {
    const backButton = screen.queryByTestId('back-button');
    const expectedText = '1';
    const preparedComponent = withHistory(<Pagination totalPages={totalPages} />);

    render(preparedComponent);

    if(backButton) {
      fireEvent.click(backButton);

      expect(screen.getByText(expectedText).classList.contains('pagination__link--active')).toBe(true);
    }
  });

  it('should change the page number after clicking on "Вперед"', () => {
    const forwardButton = screen.queryByTestId('forward-button');
    const expectedText = '34';
    const preparedComponent = withHistory(<Pagination totalPages={totalPages} />);

    render(preparedComponent);

    if(forwardButton) {
      fireEvent.click(forwardButton);

      expect(screen.getByText(expectedText).classList.contains('pagination__link--active')).toBe(true);
    }
  });
});
