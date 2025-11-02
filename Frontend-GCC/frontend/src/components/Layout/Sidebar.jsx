import React from 'react';
import { Plus } from 'lucide-react';
import MiniCalendar from './MiniCalendar';

const Sidebar = ({ currentDate, setCurrentDate, onCreateEvent }) => {
  return (
    // Note: In a real app, you'd control the mobile open/close
    // state in App.jsx and pass it here to manage classes.
    <aside
      className={`w-64 p-4 bg-white border-r flex-shrink-0 hidden lg:flex flex-col space-y-4`}
    >
      <button
        onClick={onCreateEvent}
        className="flex items-center space-x-2 bg-white text-gray-700 px-6 py-3 shadow-lg rounded-3xl hover:shadow-xl transition duration-200 transform hover:scale-[1.01] border-2 border-gray-100"
      >
        <Plus size={24} className="text-blue-600" />
        <span className="font-medium">Create</span>
      </button>

      <MiniCalendar
        selectedDate={currentDate}
        setCurrentDate={setCurrentDate}
      />
    </aside>
  );
};

export default Sidebar;
