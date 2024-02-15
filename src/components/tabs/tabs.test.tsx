import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Tabs from './tabs';
import { makeFakeCamera } from '../../mock/mock';

describe('Component: Tabs', () => {
  const mockProduct = makeFakeCamera();

  it('should render tabs with product details', () => {
    render(
      <MemoryRouter>
        <Tabs product={mockProduct} />
      </MemoryRouter>
    );

    expect(screen.getByText('Характеристики')).toBeInTheDocument();
    expect(screen.getByText('Описание')).toBeInTheDocument();
    expect(screen.getByText(mockProduct.vendorCode)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.category)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.type)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.level)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.description)).toBeInTheDocument();
  });
});
