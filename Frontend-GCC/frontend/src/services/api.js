import axios from 'axios';

// Create an Axios instance
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Your backend URL
});

// Event API functions
export const getEvents = async () => {
  const { data } = await api.get('/events');
  // Convert date strings from DB back to Date objects
  return data.map(event => ({
    ...event,
    start: new Date(event.start),
    end: new Date(event.end),
  }));
};

export const createEvent = async (eventData) => {
  const { data } = await api.post('/events', eventData);
  return {
    ...data,
    start: new Date(data.start),
    end: new Date(data.end),
  };
};

export const updateEvent = async (id, eventData) => {
  const { data } = await api.put(`/events/${id}`, eventData);
  return {
    ...data,
    start: new Date(data.start),
    end: new Date(data.end),
  };
};

export const deleteEvent = async (id) => {
  await api.delete(`/events/${id}`);
  return id;
};

export default api;