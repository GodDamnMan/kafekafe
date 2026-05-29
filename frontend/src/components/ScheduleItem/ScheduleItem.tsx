import './ScheduleItem.css';

export interface ScheduleItemProps {
  day: string;
  time: string;
  isActive?: boolean;
}

export const ScheduleItem = ({ day, time, isActive }: ScheduleItemProps) => {
  return (
    <li
      className={`flex schedule__item ${isActive ? 'schedule__item--active' : ''}`}
    >
      <div className="schedule__left">
        {isActive && <span className="schedule__dot" />}
        <span className="schedule__day">{day}</span>
      </div>
      <span className="schedule__time">{time}</span>
    </li>
  );
};
