import { render, screen, fireEvent } from '@testing-library/react';
import ModalAddToBasket from './modal-add-to-basket';
import { makeFakeCamera } from '../../mock/mock';

describe('Component: ModalAddToBasket', () => {
  const camera = makeFakeCamera();

  const onClose = () => {/* Intentionally empty for testing */};

  it('should render product details and close button', () => {
    render(<ModalAddToBasket product={camera} onClose={onClose} />);

    expect(screen.getByText('Добавить товар в корзину')).toBeInTheDocument();
    expect(screen.getByText(camera.name)).toBeInTheDocument();
    expect(screen.getByText(camera.vendorCode)).toBeInTheDocument();
    expect(screen.getByText(`${camera.type} фотокамера`)).toBeInTheDocument();
    expect(screen.getByText(`${camera.level} уровень`)).toBeInTheDocument();
    expect(screen.getByText(`${camera.price}`)).toBeInTheDocument();
    expect(screen.getByLabelText('Закрыть попап')).toBeInTheDocument();
  });

  it('should call onClose when close button is clicked', () => {
    let closed = false;
    const handleClose = () => {
      closed = true;
    };
    render(<ModalAddToBasket product={camera} onClose={handleClose} />);

    fireEvent.click(screen.getByLabelText('Закрыть попап'));
    expect(closed).toBe(true);
  });
});
