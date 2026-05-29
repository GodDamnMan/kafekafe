import './CategoryTabs.css';

type CategoryTabsProps = {
  categories: string[];
  active: string;
  onChange: (category: string) => void;
};

export const CategoryTabs = ({
  categories,
  active,
  onChange,
}: CategoryTabsProps) => {
  return (
    <ul className="list-reset tabs__list">
      {categories.map((category) => (
        <li key={category} className="tabs__item">
          <button
            type="button"
            className={`btn-reset tabs__button ${
              active === category ? 'tabs__button--active' : ''
            }`}
            onClick={() => onChange(category)}
          >
            {category}
          </button>
        </li>
      ))}
    </ul>
  );
};
