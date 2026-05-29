import { useMemo, useState, type ReactNode } from 'react';
import { CartContext } from './CartContext';

type CartProviderProps = {
  children: ReactNode;
};

export const CartProvider = ({ children }: CartProviderProps) => {
  const [counts, setCounts] = useState<Record<string, number>>({});

  const increment = (id: string) => {
    setCounts((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const decrement = (id: string) => {
    setCounts((prev) => {
      const nextCount = Math.max(0, (prev[id] || 0) - 1);

      if (nextCount === 0) {
        const rest = { ...prev };
        delete rest[id];
        return rest;
      }

      return {
        ...prev,
        [id]: nextCount,
      };
    });
  };

  const remove = (id: string) => {
    setCounts((prev) => {
      const rest = { ...prev };
      delete rest[id];
      return rest;
    });
  };

  const clear = () => {
    setCounts({});
  };

  const itemsCount = useMemo(() => {
    return Object.values(counts).reduce((sum, count) => sum + count, 0);
  }, [counts]);

  const value = useMemo(
    () => ({
      counts,
      increment,
      decrement,
      remove,
      clear,
      itemsCount,
    }),
    [counts, itemsCount],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
