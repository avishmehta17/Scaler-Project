import React from 'react';
import { format, isSameDay } from 'date-fns';

const DayView = ({ currentDate, events, onDayClick }) => {
  // Filter and sort events for the current day
  const eventsForDay = events
    .filter(e => isSameDay(e.start, currentDate))
    .sort((a, b) => a.start.getTime() - b.start.getTime());

  return (
    <div className="p-4 max-w-4xl mx-auto">
      {/* Header showing the full date */}
      <h2 className="text-3xl font-semibold text-gray-800 mb-6 pb-4 border-b">
        {format(currentDate, 'EEEE, MMMM d, yyyy')}
      </h2>
      
      {/* List of events */}
      <div className="border rounded-lg bg-white shadow-sm overflow-hidden">
        {eventsForDay.length === 0 ? (
          // Placeholder when no events are scheduled
          <div className="p-12 text-center text-gray-500">
            No events scheduled for this day.
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {eventsForDay.map(event => (
              <li
                key={event._id}
                onClick={() => onDayClick(currentDate, event)} // Click to edit event
                className="p-4 flex items-center space-x-4 cursor-pointer hover:bg-gray-50 transition"
              >
                {/* Color dot */}
                <div className={`w-3 h-3 rounded-full flex-shrink-0 bg-${event.color}-600`}></div>
                
                {/* Event Title/Description */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 truncate">{event.title}</h3>
                  <p className="text-sm text-gray-600 truncate">{event.description || 'No description'}</p>
                </div>
                
                {/* Event Time */}
                <div className="text-sm text-gray-700 font-medium text-right flex-shrink-0">
                  <div>{format(event.start, 'h:mm a')}</div>
                  <div className="text-gray-500">to {format(event.end, 'h:mm a')}</div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      
      {/* Button to add a new event for this day */}
      <button
        onClick={() => onDayClick(currentDate)}
        className="mt-6 w-full px-4 py-2 text-sm font-medium text-blue-700 bg-blue-100 rounded-lg hover:bg-blue-200 transition"
      >
        Add new event for this day
      </button>
    </div>
  );
};

export default DayView;

