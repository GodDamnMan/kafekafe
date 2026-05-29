import './Card.css';

type CardProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

export const Card = ({ children, className = '', onClick }: CardProps) => {
  if (onClick) {
    return (
      <button
        type="button"
        className={`card ${className}`}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }

  return (
    <div className={`card ${className}`} onClick={onClick}>
      {children}
    </div>
  );
};
