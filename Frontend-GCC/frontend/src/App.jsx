// import React, { useState, useEffect } from 'react';
// import Header from './components/Layout/Header';
// import Sidebar from './components/Layout/Sidebar';
// import MonthView from './components/Calendar/MonthView';
// import EventModal from './components/Event/EventModal';
// import * as api from './services/api'; // Import your API service
// // Make sure to import your App.css or index.css (with Tailwind)

// function App() {
//   const [currentDate, setCurrentDate] = useState(new Date());
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(true);
  
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [modalEvent, setModalEvent] = useState(null); // Event for editing
//   const [modalDate, setModalDate] = useState(new Date()); // Date for creating

//   // Fetch events from the backend API
//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         setLoading(true);
//         const fetchedEvents = await api.getEvents();
//         setEvents(fetchedEvents);
//       } catch (error) {
//         console.error("Failed to fetch events:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchEvents();
//   }, []);

//   // Handle opening the modal
//   const handleDayClick = (date, event = null) => {
//     setIsModalOpen(true);
//     setModalDate(date);
//     setModalEvent(event);
//   };
  
//   const handleCreateClick = () => {
//     handleDayClick(new Date(), null);
//   };

//   // Handle save (Create or Update)
//   const handleSaveEvent = async (eventData) => {
//     try {
//       if (eventData.id) {
//         // Update
//         const updatedEvent = await api.updateEvent(eventData.id, eventData);
//         setEvents(events.map(e => e.id === updatedEvent.id ? updatedEvent : e));
//       } else {
//         // Create
//         const newEvent = await api.createEvent(eventData);
//         setEvents([...events, newEvent]);
//       }
//       setIsModalOpen(false);
//     } catch (error) {
//       console.error("Failed to save event:", error);
//     }
//   };

//   // Handle delete
//   const handleDeleteEvent = async (id) => {
//     try {
//       await api.deleteEvent(id);
//       setEvents(events.filter(e => e.id !== id));
//       setIsModalOpen(false);
//     } catch (error) {
//       console.error("Failed to delete event:", error);
//     }
//   };

//   return (
//     <div className="font-sans min-h-screen bg-gray-50 flex flex-col">
//       {isModalOpen && (
//         <EventModal
//           event={modalEvent}
//           date={modalDate}
//           onClose={() => setIsModalOpen(false)}
//           onSave={handleSaveEvent}
//           onDelete={handleDeleteEvent}
//         />
//       )}

//       <Header 
//         currentDate={currentDate} 
//         setCurrentDate={setCurrentDate} 
//         onToday={() => setCurrentDate(new Date())}
//       />

//       <div className="flex flex-1 overflow-hidden">
//         <Sidebar 
//           currentDate={currentDate}
//           setCurrentDate={setCurrentDate}
//           onCreateEvent={handleCreateClick}
//         />
//         <main className="flex-1 overflow-auto">
//           {loading ? (
//             <div>Loading...</div>
//           ) : (
//             <MonthView
//               currentDate={currentDate}
//               events={events}
//               onDayClick={handleDayClick}
//             />
//           )}
//         </main>
//       </div>
//     </div>
//   );
// }

// export default App;


// import React, { useState, useEffect } from 'react';
// // --- ADD THESE IMPORTS ---
// import { addMonths, subMonths } from 'date-fns'; 
// // -------------------------

// import Header from './components/Layout/Header';
// import Sidebar from './components/Layout/Sidebar';
// import MonthView from './components/Calendar/MonthView';
// import EventModal from './components/Event/EventModal';
// import * as api from './services/api'; 

// function App() {
//   const [currentDate, setCurrentDate] = useState(new Date());
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(true);
  
//   // --- ADD THIS STATE ---
//   const [view, setView] = useState('month'); // 'month', 'week', or 'day'
//   // ----------------------

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [modalEvent, setModalEvent] = useState(null); 
//   const [modalDate, setModalDate] = useState(new Date()); 

//   useEffect(() => {
//     // ... (your existing fetchEvents function is perfect)
//     const fetchEvents = async () => {
//       try {
//         setLoading(true);
//         const fetchedEvents = await api.getEvents();
//         setEvents(fetchedEvents);
//       } catch (error) {
//         console.error("Failed to fetch events:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchEvents();
//   }, []);

//   // ... (your existing handleDayClick and handleCreateClick are perfect)
//   const handleDayClick = (date, event = null) => {
//     setIsModalOpen(true);
//     setModalDate(date);
//     setModalEvent(event);
//   };
  
//   const handleCreateClick = () => {
//     handleDayClick(new Date(), null);
//   };

//   // ... (your existing handleSaveEvent and handleDeleteEvent are perfect)
//   const handleSaveEvent = async (eventData) => {
//     try {
//       if (eventData.id) {
//         const updatedEvent = await api.updateEvent(eventData.id, eventData);
//         setEvents(events.map(e => e._id === updatedEvent._id ? updatedEvent : e));
//       } else {
//         const newEvent = await api.createEvent(eventData);
//         setEvents([...events, newEvent]);
//       }
//       setIsModalOpen(false);
//     } catch (error) {
//       console.error("Failed to save event:", error);
//     }
//   };

//   const handleDeleteEvent = async (id) => {
//     try {
//       await api.deleteEvent(id);
//       setEvents(events.filter(e => e._id !== id));
//       setIsModalOpen(false);
//     } catch (error) {
//       console.error("Failed to delete event:", error);
//     }
//   };

//   // --- ADD THESE NEW HANDLER FUNCTIONS ---
//   const handleToday = () => {
//     setCurrentDate(new Date());
//   };

//   const handleNext = () => {
//     if (view === 'month') {
//       setCurrentDate(addMonths(currentDate, 1));
//     }
//     // Add logic for 'week' and 'day' views here
//   };

//   const handlePrev = () => {
//     if (view === 'month') {
//       setCurrentDate(subMonths(currentDate, 1));
//     }
//     // Add logic for 'week' and 'day' views here
//   };
  
//   const handleViewChange = (newView) => {
//     setView(newView);
//   };
//   // ------------------------------------

//   return (
//     <div className="font-sans min-h-screen bg-gray-50 flex flex-col">
//       {isModalOpen && (
//         <EventModal
//           event={modalEvent}
//           date={modalDate}
//           onClose={() => setIsModalOpen(false)}
//           onSave={handleSaveEvent}
//           onDelete={handleDeleteEvent}
//         />
//       )}

//       {/* --- UPDATE THIS COMPONENT --- */}
//       <Header 
//         currentDate={currentDate} 
//         onToday={handleToday}
//         onNext={handleNext}
//         onPrev={handlePrev}
//         onViewChange={handleViewChange}
//         view={view}
//       />
//       {/* ----------------------------- */}

//       <div className="flex flex-1 overflow-hidden">
//         <Sidebar 
//           currentDate={currentDate}
//           setCurrentDate={setCurrentDate}
//           onCreateEvent={handleCreateClick}
//         />
//         <main className="flex-1 overflow-auto">
//           {loading ? (
//             <div>Loading...</div>
//           ) : (
//             // --- This part will need to change when you add Day/Week views ---
//             <MonthView
//               currentDate={currentDate}
//               events={events}
//               onDayClick={handleDayClick}
//             />
//           )}
//         </main>
//       </div>
//     </div>
//   );
// }

// export default App;


// import React, { useState, useEffect } from 'react';
// // --- ADD THESE IMPORTS ---
// import { addMonths, subMonths } from 'date-fns'; 
// // -------------------------

// import Header from './components/Layout/Header';
// import Sidebar from './components/Layout/Sidebar';
// import MonthView from './components/Calendar/MonthView';
// import EventModal from './components/Event/EventModal';
// import * as api from './services/api'; 

// function App() {
//   const [currentDate, setCurrentDate] = useState(new Date());
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(true);
  
//   // --- ADD THIS STATE ---
//   const [view, setView] = useState('month'); // 'month', 'week', or 'day'
//   // ----------------------

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [modalEvent, setModalEvent] = useState(null); 
//   const [modalDate, setModalDate] = useState(new Date()); 

//   useEffect(() => {
//     // ... (your existing fetchEvents function is perfect)
//     const fetchEvents = async () => {
//       try {
//         setLoading(true);
//         const fetchedEvents = await api.getEvents();
//         setEvents(fetchedEvents);
//       } catch (error) {
//         console.error("Failed to fetch events:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchEvents();
//   }, []);

//   // ... (your existing handleDayClick and handleCreateClick are perfect)
//   const handleDayClick = (date, event = null) => {
//     setIsModalOpen(true);
//     setModalDate(date);
//     setModalEvent(event);
//   };
  
//   const handleCreateClick = () => {
//     handleDayClick(new Date(), null);
//   };

//   // --- THIS FUNCTION IS NOW CORRECTED ---
//   const handleSaveEvent = async (eventData) => {
//     try {
//       // Check state for modalEvent, not eventData.id
//       // This is more robust
//       if (modalEvent) { 
//         // Update
//         const updatedEvent = await api.updateEvent(modalEvent._id, eventData);
//         setEvents(events.map(e => (e._id === updatedEvent._id ? updatedEvent : e)));
//       } else {
//         // Create
//         const newEvent = await api.createEvent(eventData);
//         setEvents([...events, newEvent]);
//       }
//       setIsModalOpen(false);
//       setModalEvent(null); // Clear the modal event
//     } catch (error) {
//       console.error("Failed to save event:", error);
//     }
//   };

//   // --- THIS FUNCTION IS NOW CORRECTED ---
//   const handleDeleteEvent = async (id) => {
//     try {
//       if (!id) return; // Safety check
//       await api.deleteEvent(id);
//       setEvents(events.filter(e => e._id !== id));
//       setIsModalOpen(false);
//       setModalEvent(null); // Clear the modal event
//     } catch (error) {
//       console.error("Failed to delete event:", error);
//     }
//   };

//   // --- ADD THESE NEW HANDLER FUNCTIONS ---
//   const handleToday = () => {
//     setCurrentDate(new Date());
//   };

//   const handleNext = () => {
//     if (view === 'month') {
//       setCurrentDate(addMonths(currentDate, 1));
//     }
//     // Add logic for 'week' and 'day' views here
//   };

//   const handlePrev = () => {
//     if (view === 'month') {
//       setCurrentDate(subMonths(currentDate, 1));
//     }
//     // Add logic for 'week' and 'day' views here
//   };
  
//   const handleViewChange = (newView) => {
//     setView(newView);
//   };
//   // ------------------------------------

//   return (
//     <div className="font-sans min-h-screen bg-gray-50 flex flex-col">
//       {isModalOpen && (
//         <EventModal
//           event={modalEvent}
//           date={modalDate}
//           onClose={() => {
//             setIsModalOpen(false);
//             setModalEvent(null); // Also clear event on close
//           }}
//           onSave={handleSaveEvent}
//           // --- THIS PROP IS NOW CORRECTED ---
//           // This correctly passes the _id from the event in state
//           onDelete={() => handleDeleteEvent(modalEvent?._id)}
//         />
//       )}

//       {/* --- UPDATE THIS COMPONENT --- */}
//       <Header 
//         currentDate={currentDate} 
//         onToday={handleToday}
//         onNext={handleNext}
//         onPrev={handlePrev}
//         onViewChange={handleViewChange}
//         view={view}
//       />
//       {/* ----------------------------- */}

//       <div className="flex flex-1 overflow-hidden">
//         <Sidebar 
//           currentDate={currentDate}
//           setCurrentDate={setCurrentDate}
//           onCreateEvent={handleCreateClick}
//         />
//         <main className="flex-1 overflow-auto">
//           {loading ? (
//             <div>Loading...</div>
//           ) : (
//             // --- This part will need to change when you add Day/Week views ---
//             <MonthView
//               currentDate={currentDate}
//               events={events}
//               onDayClick={handleDayClick}
//             />
//           )}
//         </main>
//       </div>
//     </div>
//   );
// }

// export default App;


import React, { useState, useEffect } from 'react';
import { addMonths, subMonths } from 'date-fns'; 
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
// --- IMPORT ALL THREE VIEWS ---
import MonthView from './components/Calendar/MonthView';
import WeekView from './components/Calendar/WeekView';
import DayView from './components/Calendar/DayView';
// ------------------------------
import EventModal from './components/Event/EventModal';
import * as api from './services/api'; 

function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('month'); // 'month', 'week', or 'day'

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalEvent, setModalEvent] = useState(null); 
  const [modalDate, setModalDate] = useState(new Date()); 

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const fetchedEvents = await api.getEvents();
        setEvents(fetchedEvents);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  // --- Modal Handlers ---
  const handleDayClick = (date, event = null) => {
    setIsModalOpen(true);
    setModalDate(date);
    setModalEvent(event);
  };
  
  const handleCreateClick = () => {
    handleDayClick(new Date(), null);
  };

  // --- CRUD Handlers ---
  const handleSaveEvent = async (eventData) => {
    try {
      if (modalEvent) { 
        // Update
        const updatedEvent = await api.updateEvent(modalEvent._id, eventData);
        setEvents(events.map(e => (e._id === updatedEvent._id ? updatedEvent : e)));
      } else {
        // Create
        const newEvent = await api.createEvent(eventData);
        setEvents([...events, newEvent]);
      }
      setIsModalOpen(false);
      setModalEvent(null);
    } catch (error) {
      console.error("Failed to save event:", error);
    }
  };

  const handleDeleteEvent = async (id) => {
    try {
      if (!id) return;
      await api.deleteEvent(id);
      setEvents(events.filter(e => e._id !== id));
      setIsModalOpen(false);
      setModalEvent(null);
    } catch (error) {
      console.error("Failed to delete event:", error);
    }
  };

  // --- Header/Navigation Handlers ---
  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const handleNext = () => {
    if (view === 'month') {
      setCurrentDate(addMonths(currentDate, 1));
    }
    // TODO: Add logic for 'week' and 'day' views
  };

  const handlePrev = () => {
    if (view === 'month') {
      setCurrentDate(subMonths(currentDate, 1));
    }
    // TODO: Add logic for 'week' and 'day' views
  };
  
  const handleViewChange = (newView) => {
    setView(newView);
  };

  // --- THIS IS THE NEW FUNCTION ---
  // It decides which component to render
  const renderCurrentView = () => {
    switch (view) {
      case 'day':
        return (
          <DayView
            currentDate={currentDate}
            events={events}
            onDayClick={handleDayClick}
          />
        );
      case 'week':
        return (
          <WeekView
            currentDate={currentDate}
            events={events}
            onDayClick={handleDayClick}
          />
        );
      case 'month':
      default:
        return (
          <MonthView
            currentDate={currentDate}
            events={events}
            onDayClick={handleDayClick}
          />
        );
    }
  };
  // ---------------------------------

  return (
    <div className="font-sans min-h-screen bg-gray-50 flex flex-col">
      {isModalOpen && (
        <EventModal
          event={modalEvent}
          date={modalDate}
          onClose={() => {
            setIsModalOpen(false);
            setModalEvent(null);
          }}
          onSave={handleSaveEvent}
          onDelete={() => handleDeleteEvent(modalEvent?._id)}
        />
      )}

      <Header 
        currentDate={currentDate} 
        onToday={handleToday}
        onNext={handleNext}
        onPrev={handlePrev}
        onViewChange={handleViewChange}
        view={view}
      />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
          onCreateEvent={handleCreateClick}
        />
        {/* --- THIS <main> BLOCK IS NOW UPDATED --- */}
        <main className="flex-1 overflow-auto">
          {loading ? (
            <div className="flex items-center justify-center h-full">Loading...</div>
          ) : (
            renderCurrentView() // Call the new function here
          )}
        </main>
        {/* -------------------------------------- */}
      </div>
    </div>
  );
}

export default App;




