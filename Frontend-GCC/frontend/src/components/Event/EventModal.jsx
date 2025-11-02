import React, { useState } from 'react';
import { X, Clock, AlignLeft, Trash2, Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';

// Helper to get default end time (1 hour after start)
const getDefaultEnd = (startDate) => {
  const endDate = new Date(startDate.getTime() + 60 * 60 * 1000);
  return {
    date: format(endDate, 'yyyy-MM-dd'),
    time: format(endDate, 'HH:mm'),
  };
};

const EventModal = ({ event, date, onClose, onSave, onDelete }) => {
  const isEditing = !!event;

  // Set initial state
  const initialStartDate = event ? event.start : date;
  const initialEndDate = event
    ? event.end
    : new Date(date.getTime() + 60 * 60 * 1000);

  const [title, setTitle] = useState(event?.title || 'Untitled event');
  const [description, setDescription] = useState(event?.description || '');
  const [color, setColor] = useState(event?.color || 'blue');

  // --- ADD THIS ---
  // State for handling the error message
  const [error, setError] = useState('');
  // --- END ADD ---

  // State for inputs is kept as strings in the format they expect
  const [startDate, setStartDate] = useState(
    format(initialStartDate, 'yyyy-MM-dd')
  );
  const [startTime, setStartTime] = useState(
    format(initialStartDate, 'HH:mm')
  );
  const [endDate, setEndDate] = useState(format(initialEndDate, 'yyyy-MM-dd'));
  const [endTime, setEndTime] = useState(format(initialEndDate, 'HH:mm'));

  const colorClasses = {
    blue: 'bg-blue-600 hover:bg-blue-700',
    green: 'bg-green-600 hover:bg-green-700',
    red: 'bg-red-600 hover:bg-red-700',
    yellow: 'bg-yellow-600 hover:bg-yellow-700',
    purple: 'bg-purple-600 hover:bg-purple-700',
  };

  const handleSaveEvent = async (eventData) => {
      try {
        if (eventData.id) {
          // Update
          const updatedEvent = await api.updateEvent(eventData.id, eventData);
          
          setEvents(event.map(e => e.id === updatedEvent.id ? updatedEvent : e));
        } else {
          // Create
          const newEvent = await api.createEvent(eventData);
          setEvents([...event, newEvent]);
        }
        setIsModalOpen(false);
      } catch (error) {
        console.error("Failed to save event:", error);
      }
    };
  
  const handleSubmit = (e) => {
    e.preventDefault();

    // --- ADD THIS ---
    // Clear any previous errors
    setError('');
    console.log("Handle submit called"); // DEBUGGING
    // --- END ADD ---

    // Combine date and time strings into valid Date objects
    // This is robust and handles timezones correctly
    const finalStart = new Date(`${startDate}T${startTime}`);
    const finalEnd = new Date(`${endDate}T${endTime}`);

    if (finalEnd <= finalStart) {
      // --- CHANGE THIS ---
      // alert('End time must be after start time.');
      // --- TO THIS ---
      const errorMsg = 'End time must be after start time.';
      console.error(errorMsg); // DEBUGGING
      setError(errorMsg);
      // --- END CHANGE ---
      return;
    }

    const eventData = {
      id: event?.id,
      title,
      description,
      start: finalStart,
      end: finalEnd,
      color,
    };

    console.log("Saving event:", eventData); // DEBUGGING
    onSave(eventData);
  };

  const handleDelete = () => {
    console.log("Deleting event:", event.id); // DEBUGGING
    onDelete(event.id);
  };
  
  // ... (Return the same JSX for the modal form as the previous answer)
  // This is just to show the updated input bindings
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 bg-gray-900 bg-opacity-30 backdrop-blur-sm" onClick={onClose}>
        {/* --- CHANGE THIS --- */}
        {/* <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden" onClick={e => e.stopPropagation()}> */}
        {/* --- TO THIS (Note the new <div> wrapper and removed onClick from form) --- */}
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden" onClick={e => e.stopPropagation()}>
            <form onSubmit={handleSubmit}>
        {/* --- END CHANGE --- */}
            
            {/* Header */}
            <div className={`p-3 flex items-center justify-between ${colorClasses[color]} bg-opacity-90`}>
                <div className="w-6"></div>
                <div className="text-white font-semibold">{isEditing ? 'Edit Event' : 'Create Event'}</div>
                <button type="button" onClick={onClose} className="text-white hover:text-gray-200 transition">
                    <X size={20} />
                </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-6">
                {/* Title Input */}
                <div className="flex items-start space-x-4">
                    <CalendarIcon size={24} className="text-gray-500 mt-2" />
                    <input
                        type="text"
                        placeholder="Add title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="text-2xl font-medium w-full border-0 border-b-2 border-gray-300 focus:border-blue-500 focus:ring-0 p-0 pb-1"
                    />
                </div>

                {/* Time/Date Inputs */}
                <div className="flex items-center space-x-4 ml-8">
                    <Clock size={20} className="text-gray-500" />
                    <div className="flex flex-col space-y-3">
                       {/* Start Date/Time */}
                       <div className="flex items-center space-x-2">
                         <input 
                           type="date" 
                           value={startDate} 
                           onChange={(e) => setStartDate(e.target.value)} 
                           className="p-2 border rounded-lg text-sm"
                         />
                         <input 
                           type="time" 
                           value={startTime} 
                           onChange={(e) => setStartTime(e.target.value)} 
                           className="p-2 border rounded-lg text-sm"
                         />
                       </div>
                       {/* End Date/Time */}
                       <div className="flex items-center space-x-2">
                         <input 
                           type="date" 
                           value={endDate} 
                           onChange={(e) => setEndDate(e.target.value)} 
                           className="p-2 border rounded-lg text-sm"
                         />
                         <input 
                           type="time" 
                           value={endTime} 
                           onChange={(e) => setEndTime(e.target.value)} 
                           className="p-2 border rounded-lg text-sm"
                         />
                       </div>
                    </div>
                </div>

                {/* Description */}
                <div className="flex items-start space-x-4">
                    <AlignLeft size={20} className="text-gray-500 mt-2 ml-1" />
                    <textarea
                        placeholder="Add description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full border-0 border-b-2 border-gray-200 focus:border-blue-500 focus:ring-0 p-0 resize-none text-sm"
                        rows="3"
                    />
                </div>

                {/* Color Picker */}
                <div className="flex items-center space-x-4">
                    <span className="text-gray-500 ml-1">Color:</span>
                    {Object.keys(colorClasses).map(c => (
                        <button
                            key={c}
                            type="button"
                            className={`h-6 w-6 rounded-full transition duration-150 ease-in-out ${colorClasses[c]} ${color === c ? 'ring-2 ring-offset-2 ring-gray-400' : 'opacity-80'}`}
                            onClick={() => setColor(c)}
                        />
                    ))}
                </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between p-4 bg-gray-50 border-t">
                {/* --- WRAP BUTTON AND ERROR --- */}
                <div className="flex items-center">
                    {isEditing ? (
                        <button
                            type="button" // <-- FIX: Add type="button"
                            onClick={handleDelete} // <-- FIX: Add onClick
                            className="text-red-600 hover:bg-red-50 p-2 rounded-full transition" // <-- FIX: Add className
                        >
                            <Trash2 size={20} />
                        </button>
                    ) : <div />}
                    
                    {/* --- ADD THIS ERROR MESSAGE --- */}
                    {error && (
                        <span className="text-red-600 text-sm ml-3">{error}</span>
                    )}
                    {/* --- END ADD --- */}
                </div>
                {/* --- END WRAP --- */}

                <div className={'ml-auto flex space-x-2'}>
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition"
                    >
                        Close
                    </button>
                    <button
                        onClick={handleSaveEvent}
                        type="submit"
                        className={`px-4 py-2 text-sm font-medium text-white rounded-lg transition ${colorClasses[color]}`}
                    >
                        Save
                    </button>
                </div>
            </div>
        {/* --- ADD THESE WRAPPER CLOSING TAGS --- */}
            </form>
        </div>
        {/* --- END ADD --- */}
    </div>
  );
};

export default EventModal;

