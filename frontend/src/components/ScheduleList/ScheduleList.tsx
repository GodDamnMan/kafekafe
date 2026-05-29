import { ScheduleItem } from '../ScheduleItem/ScheduleItem';
import './ScheduleList.css';

const schedule = [
  { day: 'Понедельник', time: '11:30 - 21:00' },
  { day: 'Вторник', time: '11:30 - 21:00' },
  { day: 'Среда', time: '11:30 - 21:00' },
  { day: 'Четверг', time: '11:30 - 21:00' },
  { day: 'Пятница', time: '11:30 - 21:30' },
  { day: 'Суббота', time: '11:30 - 21:30' },
  { day: 'Воскресенье', time: '11:30 - 21:00' },
];

const daysOrder = [
  'Воскресенье',
  'Понедельник',
  'Вторник',
  'Среда',
  'Четверг',
  'Пятница',
  'Суббота',
];

export const ScheduleList = () => {
  const today = daysOrder[new Date().getDay()];

  return (
    <ul className="list-reset flex schedule__list">
      {schedule.map((item) => (
        <ScheduleItem
          key={item.day}
          day={item.day}
          time={item.time}
          isActive={item.day === today}
        />
      ))}
    </ul>
  );
};
