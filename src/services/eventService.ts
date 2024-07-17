import { IEvent } from '../types';
import eventsData from './events.json';

export const eventService = {
  getEvents: (): IEvent[] => {
    return eventsData as IEvent[];
  }
};

// Version pour une future API (à utiliser plus tard)
/*
export const eventService = {
  getEvents: async (): Promise<IEvent[]> => {
    const response = await fetch('URL');
    if (!response.ok) {
      throw new Error('Failed to fetch events');
    }
    return response.json();
  }
};
*/