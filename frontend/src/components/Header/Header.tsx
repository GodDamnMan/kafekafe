import { Card } from '../Card/Card';

import './Header.css';

type HeaderProps = {
  onInfoClick: () => void;
};

export const Header = ({ onInfoClick }: HeaderProps) => {
  return (
    <header className="header">
      <div className="container">
        <div className="header__left">
          <img src="/logo.png" alt="Kuji" className="header__logo" />
        </div>

        <div className="header__right">
          <Card className="header__info-btn" onClick={onInfoClick}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 416.979 416.979"
              fill="currentColor"
            >
              <path d="M356.004,61.156c-81.37-81.47-213.377-81.551-294.848-0.182c-81.47,81.371-81.552,213.379-0.181,294.85c81.369,81.47,213.378,81.551,294.849,0.181C437.293,274.636,437.375,142.626,356.004,61.156z M237.6,340.786c0,3.217-2.607,5.822-5.822,5.822h-46.576c-3.215,0-5.822-2.605-5.822-5.822V167.885c0-3.217,2.607-5.822,5.822-5.822h46.576c3.215,0,5.822,2.604,5.822,5.822V340.786z M208.49,137.901c-18.618,0-33.766-15.146-33.766-33.765c0-18.617,15.147-33.766,33.766-33.766c18.619,0,33.766,15.148,33.766,33.766C242.256,122.755,227.107,137.901,208.49,137.901z" />
            </svg>
          </Card>
        </div>
      </div>
    </header>
  );
};
