import React from 'react';
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Menu,
} from 'lucide-react';
import { format } from 'date-fns';

const Header = ({
  currentDate,
  onPrev,
  onNext,
  onToday,
  onViewChange,
  view,
}) => {
  const currentMonthName = format(currentDate, 'MMMM yyyy');

  return (
    <header className="flex items-center justify-between p-3 border-b bg-white sticky top-0 z-20 shadow-sm">
      <div className="flex items-center space-x-4">
        {/* <button className="p-2 rounded-full hover:bg-gray-100 transition lg:hidden">
          <Menu size={24} />
        </button> */}
        <div className="flex items-center space-x-1">
          <Calendar size={32} className="text-blue-600" />
          <span className="text-xl font-medium text-gray-700">Calendar</span>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={onToday}
          className="border border-gray-300 px-4 py-2 text-sm font-medium rounded-lg hover:bg-gray-100 transition"
        >
          Today
        </button>

        <div className="flex border border-gray-300 rounded-lg">
          <button
            onClick={onPrev}
            className="p-2 border-r hover:bg-gray-100 rounded-l-lg transition"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={onNext}
            className="p-2 hover:bg-gray-100 rounded-r-lg transition"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        <h2 className="text-xl font-normal ml-4 hidden md:block">
          {currentMonthName}
        </h2>
      </div>

      <div className="flex items-center space-x-2">
        <div className="hidden sm:flex border border-gray-300 rounded-lg text-sm">
          {['Day', 'Week', 'Month'].map((v) => (
            <button
              key={v}
              onClick={() => onViewChange(v.toLowerCase())}
              className={`px-3 py-1.5 transition ${
                view === v.toLowerCase()
                  ? 'bg-blue-100 text-blue-700 font-medium'
                  : 'hover:bg-gray-100 text-gray-700'
              } ${
                v === 'Day'
                  ? 'rounded-l-lg'
                  : v === 'Month'
                  ? 'rounded-r-lg'
                  : ''
              }`}
            >
              {v}
            </button>
          ))}
        </div>
        <button className="p-2 rounded-full hover:bg-gray-100 transition">
          <div className="h-6 w-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm">
            A
          </div>
        </button>
      </div>
    </header>
  );
};

export default Header;
