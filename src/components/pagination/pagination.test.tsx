import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Pagination from './pagination';

describe('Component: Pagination', () => {
  it('should render correctly with multiple pages', () => {
    const totalPages = 5;

    render(
      <MemoryRouter>
        <Pagination totalPages={totalPages} />
      </MemoryRouter>
    );

    expect(screen.getByTestId('pagination-container')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByTestId('forward-button')).toBeInTheDocument();
    expect(screen.queryByTestId('back-button')).not.toBeInTheDocument();
  });

  it('should render correctly with only one page', () => {
    const totalPages = 1;

    render(
      <MemoryRouter>
        <Pagination totalPages={totalPages} />
      </MemoryRouter>
    );

    expect(screen.getByTestId('pagination-container')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.queryByTestId('forward-button')).not.toBeInTheDocument();
    expect(screen.queryByTestId('back-button')).not.toBeInTheDocument();
  });

  it('should render back and forward buttons when not on the first or last page', () => {
    const totalPages = 3;
    const initialEntries = ['/some-path?page=2'];

    render(
      <MemoryRouter initialEntries={initialEntries}>
        <Pagination totalPages={totalPages} />
      </MemoryRouter>
    );

    expect(screen.getByTestId('pagination-container')).toBeInTheDocument();
    expect(screen.getByTestId('back-button')).toBeInTheDocument();
    expect(screen.getByTestId('forward-button')).toBeInTheDocument();
  });
});
