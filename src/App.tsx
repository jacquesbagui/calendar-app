import React from 'react';
import { Calendar } from './components/Calendar';
import { IEvent } from './types';
import { eventService } from './services/eventService';
import './App.css';

const App: React.FC = () => {
  const events = eventService.getEvents();
  // TODO: Si on passe à une API, utiliser useEffect et useState 
  return (
    <div className="app">
      <Calendar events={events as IEvent[]} />
    </div>
  );
};

export default App;