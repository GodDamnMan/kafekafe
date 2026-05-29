import './CartSummary.css';

type CartSummaryProps = {
  itemsCount: number;
  totalPrice: number;
  onClick?: () => void;
};

export const CartSummary = ({
  itemsCount,
  totalPrice,
  onClick,
}: CartSummaryProps) => {
  return (
    <button className="btn-reset cart-summary" onClick={onClick}>
      <div className="cart-summary__left">
        <span className="cart-summary__label">Корзина</span>
        <span className="cart-summary__count">{itemsCount}</span>
      </div>

      <span className="cart-summary__price">{totalPrice} ₽</span>
    </button>
  );
};
