import React from 'react';
import {
  format,
  addMonths,
  subMonths,
  getDaysInMonth,
  startOfMonth,
  getDay,
  isSameDay,
  isSameMonth,
  getDate,
} from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const MiniCalendar = ({ selectedDate, setCurrentDate }) => {
  const today = new Date();
  const dayNames = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  const handleMonthChange = (direction) => {
    if (direction === -1) {
      setCurrentDate(subMonths(selectedDate, 1));
    } else {
      setCurrentDate(addMonths(selectedDate, 1));
    }
  };

  const firstDayOfMonth = getDay(startOfMonth(selectedDate)); // 0=Sun, 1=Mon...
  const startDayOffset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1; // 0=Mon, 1=Tue...
  const daysInMonth = getDaysInMonth(selectedDate);

  const renderDay = (day) => {
    const date = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      day
    );
    const isSelected = isSameDay(date, selectedDate);
    const isCurrentMonthDay = isSameMonth(date, selectedDate);
    const isToday = isSameDay(date, today);

    let classes =
      'w-6 h-6 flex items-center justify-center text-xs rounded-full cursor-pointer transition duration-150';

    if (!isCurrentMonthDay) {
      classes += ' text-gray-400'; // Should not happen with this logic, but good practice
    } else if (isToday) {
      classes += ' bg-blue-500 text-white font-semibold';
    } else if (isSelected) {
      classes += ' border border-blue-500 bg-blue-100 font-semibold';
    } else {
      classes += ' hover:bg-gray-200';
    }

    return (
      <div className={classes} onClick={() => setCurrentDate(date)}>
        {day}
      </div>
    );
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow-md border">
      <div className="flex justify-between items-center mb-2">
        <div className="font-medium text-sm">
          {format(selectedDate, 'MMMM yyyy')}
        </div>
        <div className="flex space-x-1">
          <button
            onClick={() => handleMonthChange(-1)}
            className="p-1 hover:bg-gray-200 rounded-full transition"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => handleMonthChange(1)}
            className="p-1 hover:bg-gray-200 rounded-full transition"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 text-center text-xs text-gray-500 mb-1">
        {dayNames.map((d, i) => (
          <span key={i} className="w-6 h-6 flex items-center justify-center">
            {d}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-7">
        {Array.from({ length: startDayOffset }).map((_, i) => (
          <div key={`empty-${i}`} className="h-6"></div>
        ))}
        {Array.from({ length: daysInMonth }).map((_, i) => (
          <React.Fragment key={i + 1}>{renderDay(i + 1)}</React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default MiniCalendar;
