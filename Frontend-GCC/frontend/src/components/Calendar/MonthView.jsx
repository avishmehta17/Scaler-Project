import React, { useMemo } from 'react';
import DayCell from './DayCell';
import {
  getMonthGrid,
  isSameMonth,
  isSameDay,
  format,
} from '../../utils/dateHelpers';
import { eachDayOfInterval } from 'date-fns';

// This logic efficiently sorts events into a map for quick lookup by the DayCell
const useEventsByDay = (events, monthGrid) => {
  return useMemo(() => {
    const eventsMap = new Map();
    const gridStart = monthGrid[0];
    const gridEnd = monthGrid[monthGrid.length - 1];

    // 1. Initialize map with all days in the visible grid
    monthGrid.forEach((day) => {
      eventsMap.set(format(day, 'yyyy-MM-dd'), []);
    });

    // 2. Slot events into the map
    events.forEach((event) => {
      // Get all days the event spans
      const eventDays = eachDayOfInterval({
        start: event.start,
        end: event.end,
      });

      // Add event to each day it spans, *if* that day is in the visible grid
      eventDays.forEach((day) => {
        const dayKey = format(day, 'yyyy-MM-dd');
        if (eventsMap.has(dayKey)) {
          eventsMap.get(dayKey).push(event);
        }
      });
    });

    // 3. Sort events within each day by start time
    eventsMap.forEach((dayEvents) => {
      dayEvents.sort((a, b) => a.start.getTime() - b.start.getTime());
    });

    return eventsMap;
  }, [events, monthGrid]);
};

const MonthView = ({ currentDate, events, onDayClick }) => {
  const today = new Date();
  const monthGrid = getMonthGrid(currentDate);
  const eventsByDay = useEventsByDay(events, monthGrid);
  const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="flex-1 min-h-full overflow-y-auto">
      {/* Weekday Headers */}
      <div className="grid grid-cols-7 border-t border-l border-gray-200 sticky top-0 bg-white z-10 shadow-sm">
        {dayNames.map((day) => (
          <div
            key={day}
            className="text-center py-2 text-sm font-medium text-gray-600 border-r border-gray-200"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 border-l border-gray-200">
        {monthGrid.map((day, index) => {
          const dayKey = format(day, 'yyyy-MM-dd');
          return (
            <DayCell
              key={index}
              day={day}
              events={eventsByDay.get(dayKey) || []}
              isCurrentMonth={isSameMonth(day, currentDate)}
              isToday={isSameDay(day, today)}
              onDayClick={onDayClick}
            />
          );
        })}
      </div>
    </div>
  );
};

export default React.memo(MonthView);
