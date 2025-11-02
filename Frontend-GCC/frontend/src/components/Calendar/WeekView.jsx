import React from 'react';
import { startOfWeek, addDays, format, isSameDay, isToday } from 'date-fns';

const WeekView = ({ currentDate, events, onDayClick }) => {
  // Start the week on Monday
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
  
  // Create an array of 7 days for the week
  const days = [];
  for (let i = 0; i < 7; i++) {
    days.push(addDays(weekStart, i));
  }

  // Get and sort events for a specific day
  const getEventsForDay = (day) => {
    return events
      .filter(e => isSameDay(e.start, day))
      .sort((a, b) => a.start.getTime() - b.start.getTime());
  };

  return (
    <div className="flex flex-col flex-1">
      {/* Week Header */}
      <div className="grid grid-cols-7 border-b bg-white sticky top-0 z-10">
        {days.map(day => (
          <div key={day.toString()} className="p-3 text-center border-r last:border-r-0">
            <div className={`text-xs ${isToday(day) ? 'text-blue-600' : 'text-gray-500'}`}>
              {format(day, 'EEE')}
            </div>
            <div className={`text-2xl mt-1 ${isToday(day) ? 'text-blue-600 font-bold bg-blue-100 rounded-full w-10 h-10 flex items-center justify-center mx-auto' : 'text-gray-700'}`}>
              {format(day, 'd')}
            </div>
          </div>
        ))}
      </div>
      
      {/* Week Body */}
      <div className="grid grid-cols-7 flex-1 overflow-auto h-full">
        {days.map(day => (
          <div
            key={day.toString()}
            className="border-r last:border-r-0 p-2 min-h-[600px] cursor-pointer hover:bg-gray-50 transition"
            onClick={() => onDayClick(day)} // Click on empty space creates new event
          >
            <div className="space-y-1">
              {getEventsForDay(day).map(event => (
                <div
                  key={event._id}
                  onClick={(e) => {
                    e.stopPropagation(); // Don't trigger the day click
                    onDayClick(day, event); // Click on event to edit
                  }}
                  className={`p-1.5 mb-1 rounded-lg text-white text-sm truncate shadow-sm cursor-pointer bg-${event.color}-600 hover:bg-${event.color}-700`}
                >
                  <span className="font-medium">{format(event.start, 'h:mma')}</span> {event.title}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeekView;

