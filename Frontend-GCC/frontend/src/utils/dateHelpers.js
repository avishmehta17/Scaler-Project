import {
  startOfMonth,
  startOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
  format,
} from 'date-fns';

/**
 * Generates a 6-week (42-day) grid for a given month.
 * @param {Date} date - The target date (any day in the month).
 * @returns {Date[]} - An array of 42 Date objects.
 */
export const getMonthGrid = (date) => {
  const days = [];
  const monthStart = startOfMonth(date);
  
  // Start the grid on the previous Monday.
  // { weekStartsOn: 1 } makes Monday the first day of the week.
  const gridStart = startOfWeek(monthStart, { weekStartsOn: 1 });

  for (let i = 0; i < 42; i++) {
    days.push(addDays(gridStart, i));
  }
  return days;
};

// Re-exporting common date-fns functions so components
// can import everything from this one file.

export { isSameMonth, isSameDay, format };
