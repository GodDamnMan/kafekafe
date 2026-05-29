import { useEffect, useMemo, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { fetchMenu } from '../../api/items';
import type { Menu, Section } from '../../api/items';

import { Header } from '../../components/Header/Header';
import { Modal } from '../../components/Modal/Modal';
import { CategoryTabs } from '../../components/CategoryTabs/CategoryTabs';
import { ItemsList } from '../../components/ItemsList/ItemsList';

import { useCart } from '../../context/CartContext';

import './MainPage.css';
import { Spinner } from '../../components/Spinner/Spinner';
import { CartModal } from '../../components/CartModal/CartModal';

const STICKY_OFFSET = 132;

export const MainPage = () => {
  const [isInfoModalOpen, setIsInfoModalOpen] = useState<boolean>(false);
  const [isScheduleOpen, setIsScheduleOpen] = useState<boolean>(false);
  const { counts, increment, decrement, itemsCount } = useCart();
  const [activeCategory, setActiveCategory] = useState<string>('');
  const [isCartOpen, setIsCartOpen] = useState(false);

  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const { data, isPending, isError, error } = useQuery<Menu, Error>({
    queryKey: ['menu'],
    queryFn: fetchMenu,
  });

  const normalizedSections = useMemo<Section[]>(() => {
    if (!data) return [];

    return data.map((section) => ({
      ...section,
      items: section.items.map((item) => ({
        ...item,
        picture: item.picture || '/cover.png',
      })),
    }));
  }, [data]);

  const handleOpenCart = () => {
    if (itemsCount === 0) return;
    setIsCartOpen(true);
  };

  const handleCloseCart = () => {
    setIsCartOpen(false);
  };

  const cartItems = normalizedSections.flatMap((section) =>
    section.items
      .filter((item) => (counts[item.id] || 0) > 0)
      .map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        picture: item.picture || '/cover.png',
        count: counts[item.id] || 0,
      })),
  );

  const categories = useMemo<string[]>(() => {
    return normalizedSections.map((section) => section.title);
  }, [normalizedSections]);

  useEffect(() => {
    if (!activeCategory && categories.length > 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActiveCategory(categories[0]);
    }
  }, [activeCategory, categories]);

  useEffect(() => {
    if (normalizedSections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visibleEntries.length === 0) return;

        const category = visibleEntries[0].target.getAttribute('data-category');

        if (category) {
          setActiveCategory(category);
        }
      },
      {
        root: null,
        rootMargin: `-${STICKY_OFFSET}px 0px -60% 0px`,
        threshold: 0.1,
      },
    );

    Object.values(sectionRefs.current).forEach((element) => {
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [normalizedSections]);

  const handleOpenInfoModal = () => {
    setIsInfoModalOpen(true);
  };

  const handleCloseInfoModal = () => {
    setIsInfoModalOpen(false);
    setIsScheduleOpen(false);
  };

  const handleToggleSchedule = () => {
    setIsScheduleOpen((prev) => !prev);
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);

    const element = sectionRefs.current[category];

    if (!element) return;

    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  const totalPrice = normalizedSections.reduce((sum, section) => {
    return (
      sum +
      section.items.reduce((sectionSum, item) => {
        return sectionSum + item.price * (counts[item.id] || 0);
      }, 0)
    );
  }, 0);

  return (
    <>
      <Header onInfoClick={handleOpenInfoModal} />

      <main className="main">
        <div className="container">
          {isPending && <Spinner />}

          {isError && (
            <div>
              {error instanceof Error ? error.message : 'Something went wrong'}
            </div>
          )}

          {!isPending && !isError && normalizedSections.length > 0 && (
            <>
              <div className="main__tabs">
                <CategoryTabs
                  categories={categories}
                  active={activeCategory}
                  onChange={handleCategoryChange}
                />
              </div>

              <div className="main__sections">
                {normalizedSections.map((section) => (
                  <div
                    key={section.title}
                    ref={(element) => {
                      sectionRefs.current[section.title] = element;
                    }}
                    data-category={section.title}
                    className="main__section"
                  >
                    <ItemsList
                      items={section.items}
                      counts={counts}
                      onIncrement={increment}
                      onDecrement={decrement}
                    />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </main>

      <div className="main__basket">
        <div className="container">
          <button
            type="button"
            className={`btn-reset main__basket-btn ${itemsCount === 0 ? 'main__basket-btn--disabled' : ''}`}
            disabled={itemsCount === 0}
            onClick={handleOpenCart}
          >
            <span className="main__basket-left">
              Корзина
              <span className="main__basket-count">{itemsCount}</span>
            </span>

            <span className="main__basket-price">
              {totalPrice.toLocaleString('ru-RU')} ₽
            </span>
          </button>
        </div>
      </div>

      <Modal
        isOpen={isInfoModalOpen}
        isScheduleOpen={isScheduleOpen}
        onClose={handleCloseInfoModal}
        onScheduleToggle={handleToggleSchedule}
      />
      <CartModal
        isOpen={isCartOpen}
        onClose={handleCloseCart}
        items={cartItems}
        totalPrice={totalPrice}
      />
    </>
  );
};
