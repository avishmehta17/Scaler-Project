import React from 'react';
import { format } from 'date-fns';

const getEventColorClass = (color) => {
  switch (color) {
    case 'blue':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'green':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'red':
      return 'bg-red-100 text-red-800 border-red-200';
    case 'yellow':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'purple':
      return 'bg-purple-100 text-purple-800 border-purple-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const DayCell = ({ day, events, isCurrentMonth, isToday, onDayClick }) => {
  const dayClasses = isCurrentMonth
    ? 'text-gray-800'
    : 'text-gray-400 bg-gray-50';
  const todayClasses = isToday
    ? 'border-2 border-blue-500 ring-2 ring-blue-300 text-white bg-blue-500'
    : 'hover:bg-gray-100';

  // Limit visible events
  const visibleEvents = events.slice(0, 2);
  const hiddenEventCount = events.length - visibleEvents.length;

  return (
    <div
      className={`h-36 border-b border-r border-gray-200 p-1 flex flex-col transition duration-75 ease-in-out cursor-pointer ${dayClasses}`}
      onClick={() => onDayClick(day)} // Click on empty part of cell
    >
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition duration-150 ${
          isToday ? todayClasses : ''
        }`}
      >
        {format(day, 'd')}
      </div>
      <div className="mt-1 space-y-0.5 overflow-hidden">
        {visibleEvents.map((event) => (
          <div
            key={event.id}
            className={`text-xs truncate px-1 py-0.5 rounded-sm border ${getEventColorClass(
              event.color
            )}`}
            title={event.title}
            onClick={(e) => {
              e.stopPropagation(); // Prevent cell click
              onDayClick(day, event); // Click on the event itself
            }}
          >
            {/* 'p' format = 12:00 PM */}
            <span className="font-semibold">{format(event.start, 'p')}</span>{' '}
            {event.title}
          </div>
        ))}
        {hiddenEventCount > 0 && (
          <div className="text-xs text-gray-600 px-1 mt-1">
            +{hiddenEventCount} more
          </div>
        )}
      </div>
    </div>
  );
};

export default DayCell;
