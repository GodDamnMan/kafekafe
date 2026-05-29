import { ItemCard } from '../ItemCard/ItemCard';
import type { Item } from '../../api/items';
import './ItemsList.css';

type ItemsListProps = {
  items: Item[];
  counts: Record<string, number>;
  onIncrement: (id: string) => void;
  onDecrement: (id: string) => void;
};

export const ItemsList = ({
  items,
  counts,
  onIncrement,
  onDecrement,
}: ItemsListProps) => {
  return (
    <ul className="list-reset items-list">
      {items.map((item) => {
        const count = counts[item.id] || 0;

        return (
          <ItemCard
            key={item.id}
            title={item.name}
            image={item.picture || '/cover.png'}
            price={item.price}
            count={count}
            onIncrement={() => onIncrement(item.id)}
            onDecrement={() => onDecrement(item.id)}
          />
        );
      })}
    </ul>
  );
};
