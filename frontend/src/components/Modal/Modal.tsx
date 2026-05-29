import { useEffect, useRef } from 'react';

import { AddressCard } from '../AddressCard/AddressCard';
import { ScheduleList } from '../ScheduleList/ScheduleList';

import './Modal.css';

const PHONE_HREF = 'tel:+70000000000';
const TELEGRAM_HREF = 'https://t.me/';
const TWO_GIS_HREF =
  'https://2gis.ru/search/%D0%98%D0%BD%D0%BD%D0%BE%D0%BF%D0%BE%D0%BB%D0%B8%D1%81%2C%20%D0%A3%D0%BD%D0%B8%D0%B2%D0%B5%D1%80%D1%81%D0%B8%D1%82%D0%B5%D1%82%D1%81%D0%BA%D0%B0%D1%8F%201%D0%BA5';
const YANDEX_MAPS_HREF =
  'https://yandex.ru/maps/?text=%D0%98%D0%BD%D0%BD%D0%BE%D0%BF%D0%BE%D0%BB%D0%B8%D1%81%2C%20%D0%A3%D0%BD%D0%B8%D0%B2%D0%B5%D1%80%D1%81%D0%B8%D1%82%D0%B5%D1%82%D1%81%D0%BA%D0%B0%D1%8F%201%D0%BA5';

type ModalProps = {
  isOpen: boolean;
  isScheduleOpen: boolean;
  onClose: () => void;
  onScheduleToggle: () => void;
};

export const Modal = ({
  isOpen,
  isScheduleOpen,
  onClose,
  onScheduleToggle,
}: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    modalRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div
      className="modal__overlay"
      onClick={onClose}
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-modal="true"
      aria-labelledby="contacts-title"
    >
      <div
        className="modal"
        onClick={(e) => e.stopPropagation()}
        ref={modalRef}
        tabIndex={-1}
      >
        <button
          type="button"
          className="btn-reset modal__close"
          onClick={onClose}
          aria-label="Закрыть контакты"
        >
          <svg
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z"
              fill="#0F1729"
            />
          </svg>
        </button>

        <div className="modal__content">
          <h2 className="modal__title" id="contacts-title">
            График работы и контакты
          </h2>

          <div className="modal__section">
            <AddressCard
              title="Иннополис"
              address="Университетская улица, 1к5"
              isOpen={isScheduleOpen}
              onClick={onScheduleToggle}
            />

            <div
              className={`modal__schedule ${
                isScheduleOpen ? 'modal__schedule--open' : ''
              }`}
            >
              <div className="modal__schedule-inner">
                <ScheduleList />
              </div>
            </div>
          </div>

          <div className="modal__actions">
            <a className="card modal__call-btn" href={PHONE_HREF}>
              <span className="modal__action-icon">
                <svg
                  width="25px"
                  height="25px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.05 6C15.0268 6.19057 15.9244 6.66826 16.6281 7.37194C17.3318 8.07561 17.8095 8.97326 18 9.95M14.05 2C16.0793 2.22544 17.9716 3.13417 19.4163 4.57701C20.8609 6.01984 21.7721 7.91101 22 9.94M18.5 21C9.93959 21 3 14.0604 3 5.5C3 5.11378 3.01413 4.73086 3.04189 4.35173C3.07375 3.91662 3.08968 3.69907 3.2037 3.50103C3.29814 3.33701 3.4655 3.18146 3.63598 3.09925C3.84181 3 4.08188 3 4.56201 3H7.37932C7.78308 3 7.98496 3 8.15802 3.06645C8.31089 3.12515 8.44701 3.22049 8.55442 3.3441C8.67601 3.48403 8.745 3.67376 8.88299 4.05321L10.0491 7.26005C10.2096 7.70153 10.2899 7.92227 10.2763 8.1317C10.2643 8.31637 10.2012 8.49408 10.0942 8.64506C9.97286 8.81628 9.77145 8.93713 9.36863 9.17882L8 10C9.2019 12.6489 11.3501 14.7999 14 16L14.8212 14.6314C15.0629 14.2285 15.1837 14.0271 15.3549 13.9058C15.5059 13.7988 15.6836 13.7357 15.8683 13.7237C16.0777 13.7101 16.2985 13.7904 16.74 13.9509L19.9468 15.117C20.3262 15.255 20.516 15.324 20.6559 15.4456C20.7795 15.553 20.8749 15.6891 20.9335 15.842C21 16.015 21 16.2169 21 16.6207V19.438C21 19.9181 21 20.1582 20.9007 20.364C20.8185 20.5345 20.663 20.7019 20.499 20.7963C20.3009 20.9103 20.0834 20.9262 19.6483 20.9581C19.2691 20.9859 18.8862 21 18.5 21Z"
                    stroke="#000000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="modal__action-text">Позвонить</span>
            </a>

            <a
              className="card modal__tg-btn"
              href={TELEGRAM_HREF}
              target="_blank"
              rel="noreferrer"
              aria-label="Открыть Telegram"
            >
              <svg
                width="25px"
                height="25px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M23.1117 4.49449C23.4296 2.94472 21.9074 1.65683 20.4317 2.227L2.3425 9.21601C0.694517 9.85273 0.621087 12.1572 2.22518 12.8975L6.1645 14.7157L8.03849 21.2746C8.13583 21.6153 8.40618 21.8791 8.74917 21.968C9.09216 22.0568 9.45658 21.9576 9.70712 21.707L12.5938 18.8203L16.6375 21.8531C17.8113 22.7334 19.5019 22.0922 19.7967 20.6549L23.1117 4.49449ZM3.0633 11.0816L21.1525 4.0926L17.8375 20.2531L13.1 16.6999C12.7019 16.4013 12.1448 16.4409 11.7929 16.7928L10.5565 18.0292L10.928 15.9861L18.2071 8.70703C18.5614 8.35278 18.5988 7.79106 18.2947 7.39293C17.9906 6.99479 17.4389 6.88312 17.0039 7.13168L6.95124 12.876L3.0633 11.0816ZM8.17695 14.4791L8.78333 16.6015L9.01614 15.321C9.05253 15.1209 9.14908 14.9366 9.29291 14.7928L11.5128 12.573L8.17695 14.4791Z"
                  fill="#0F0F0F"
                />
              </svg>
            </a>
          </div>
          <div className="modal__links">
            <a
              className="card modal__link"
              href={TWO_GIS_HREF}
              target="_blank"
              rel="noreferrer"
            >
              <span className="modal__link-icon">
                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M40.5,5.5H7.5a2,2,0,0,0-2,2v33a2,2,0,0,0,2,2h33a2,2,0,0,0,2-2V7.5A2,2,0,0,0,40.5,5.5Z"
                    stroke="#000"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M25.5785,36.1424c-.041-4.7889,1.0624-8.7464,7.0814-8.4979C41.246,5.7628,6.2359,6.5969,15.5681,27.5138c2.83-.1756,7.5212,1.5092,6.72,9.1465"
                    stroke="#000"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M42.5,33.479l-37,5.8236"
                    stroke="#000"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M5.5,11.04l12.3448,2.29"
                    stroke="#000"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M32.3554,15.53,42.5,17.0114"
                    stroke="#000"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>

              <span className="modal__link-text">2GIS</span>
            </a>

            <a
              className="card modal__link"
              href={YANDEX_MAPS_HREF}
              target="_blank"
              rel="noreferrer"
            >
              <span className="modal__link-icon">
                <svg
                  width="25px"
                  height="25px"
                  viewBox="0 0 192 192"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                >
                  <path
                    stroke="#000000"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="12"
                    d="M95.997 22a58.897 58.897 0 0 0-32.772 9.985 59.174 59.174 0 0 0-21.728 26.56 59.386 59.386 0 0 0-3.368 34.191 59.269 59.269 0 0 0 16.125 30.312c10.688 10.722 35.841 26.232 37.33 42.525.223 2.434 1.987 4.427 4.413 4.427s4.196-1.993 4.413-4.427c1.488-16.293 26.622-31.777 37.304-42.492a59.274 59.274 0 0 0 16.151-30.313 59.383 59.383 0 0 0-3.354-34.205 59.176 59.176 0 0 0-21.73-26.574A58.897 58.897 0 0 0 95.997 22v0Z"
                  />
                  <path
                    stroke="#000000"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="12"
                    d="M95.997 101.6a20.806 20.806 0 0 1-14.708-6.092 20.8 20.8 0 1 1 14.708 6.092v0Z"
                  />
                </svg>
              </span>

              <span className="modal__link-text">Яндекс Карты</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
