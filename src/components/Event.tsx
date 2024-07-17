import React from 'react';
import { IProcessedEvent } from '../types';

interface EventProps {
  event: IProcessedEvent;
}

export const Event: React.FC<EventProps> = ({ event }) => {
  return (
    <div
      className="event"
      style={{
        position: 'absolute',
        top: event.top,
        height: event.height,
        width: event.width,
        left: event.left,
      }}
    >
      Event {event.id} - {event.start}
    </div>
  );
};