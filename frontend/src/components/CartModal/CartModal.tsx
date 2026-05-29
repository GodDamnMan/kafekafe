import { useEffect, useRef, useState } from 'react';

import { Card } from '../Card/Card';
import { useCart } from '../../context/CartContext';
import { Close, DeleteBasket, ForkAndKnife } from './items';

import './CartModal.css';

type CartItem = {
  id: string;
  name: string;
  price: number;
  picture: string;
  count: number;
};

type CartModalProps = {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  totalPrice: number;
};

export const CartModal = ({
  isOpen,
  onClose,
  items,
  totalPrice,
}: CartModalProps) => {
  const { increment, decrement, clear } = useCart();
  const [utensilsCount, setUtensilsCount] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    contentRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleOverlayClick = () => {
    onClose();
  };

  const handleContentClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      onClose();
    }
  };

  const handleClearCart = () => {
    clear();
    setUtensilsCount(0);
    setComment('');
    onClose();
  };

  return (
    <div
      className="cart-modal"
      onClick={handleOverlayClick}
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-title"
    >
      <div
        className="cart-modal__content"
        onClick={handleContentClick}
        ref={contentRef}
        tabIndex={-1}
      >
        <div className="cart-modal__header">
          <button
            type="button"
            className="btn-reset cart-modal__icon-btn"
            onClick={handleClearCart}
            aria-label="Очистить корзину"
          >
            <DeleteBasket />
          </button>

          <h2 className="cart-modal__title" id="cart-title">
            Ваш заказ
          </h2>

          <button
            type="button"
            className="btn-reset cart-modal__close-btn"
            onClick={onClose}
            aria-label="Закрыть корзину"
          >
            <Close />
          </button>
        </div>

        <div className="cart-modal__body">
          <div className="cart-modal__items">
            {items.map((item) => (
              <div key={item.id} className="cart-modal__item">
                <div className="cart-modal__item-top">
                  <img
                    src={item.picture}
                    alt={item.name}
                    className="cart-modal__item-image"
                  />

                  <div className="cart-modal__item-block">
                    <div className="cart-modal__item-name">{item.name}</div>{' '}
                    <div className="cart-modal__counter-wrap">
                      <Card className="cart-modal__counter">
                        <button
                          type="button"
                          className="btn-reset cart-modal__counter-btn"
                          onClick={() => decrement(item.id)}
                          aria-label={`Уменьшить количество ${item.name}`}
                        >
                          −
                        </button>

                        <span className="cart-modal__counter-value">
                          {item.count}
                        </span>

                        <button
                          type="button"
                          className="btn-reset cart-modal__counter-btn"
                          onClick={() => increment(item.id)}
                          aria-label={`Увеличить количество ${item.name}`}
                        >
                          +
                        </button>
                      </Card>
                    </div>
                  </div>

                  <div className="cart-modal__item-price">
                    {item.price.toLocaleString('ru-RU')} ₽
                  </div>
                </div>
              </div>
            ))}

            <div className="cart-modal__extra">
              <div className="cart-modal__extra-left">
                <span className="cart-modal__extra-icon">
                  <ForkAndKnife />
                </span>
                <span className="cart-modal__extra-title">Приборы</span>
              </div>

              <div className="cart-modal__extra-right">
                <button
                  type="button"
                  className="btn-reset cart-modal__extra-btn"
                  onClick={() =>
                    setUtensilsCount((prev) => Math.max(0, prev - 1))
                  }
                  aria-label="Уменьшить количество приборов"
                >
                  −
                </button>

                <span className="cart-modal__extra-value">{utensilsCount}</span>

                <button
                  type="button"
                  className="btn-reset cart-modal__extra-btn"
                  onClick={() => setUtensilsCount((prev) => prev + 1)}
                  aria-label="Увеличить количество приборов"
                >
                  +
                </button>
              </div>
            </div>

            <textarea
              className="cart-modal__comment"
              placeholder="Комментарий к заказу"
              value={comment}
              onChange={(event) => setComment(event.target.value)}
            />

            <div className="cart-modal__summary">
              <span>Сумма заказа</span>
              <span>{totalPrice.toLocaleString('ru-RU')} ₽</span>
            </div>
          </div>
        </div>

        <div className="cart-modal__footer">
          <button type="button" className="btn-reset cart-modal__submit">
            <span>К оформлению</span>
            <span>{totalPrice.toLocaleString('ru-RU')} ₽</span>
          </button>
        </div>
      </div>
    </div>
  );
};
