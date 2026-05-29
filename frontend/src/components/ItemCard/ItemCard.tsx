import './ItemCard.css';

type ItemCardProps = {
  title: string;
  image: string;
  price: number;
  count: number;
  onIncrement: () => void;
  onDecrement: () => void;
};

export const ItemCard = ({
  title,
  image,
  price,
  count,
  onIncrement,
  onDecrement,
}: ItemCardProps) => {
  return (
    <li className="item-card">
      <img className="item-card__image" src={image} alt={title} />

      <h3 className="item-card__title">{title}</h3>

      <div className="item-card__controls">
        <button
          type="button"
          className="btn-reset item-card__action"
          onClick={onDecrement}
          disabled={count === 0}
        >
          −
        </button>

        <span className="item-card__summary">
          {price.toLocaleString('ru-RU')} ₽ · {count}
        </span>

        <button
          type="button"
          className="btn-reset item-card__action"
          onClick={onIncrement}
        >
          +
        </button>
      </div>
    </li>
  );
};
