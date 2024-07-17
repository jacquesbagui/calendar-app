import React from 'react';
import { IEvent } from '../types';
import { Event } from './Event';
import { useEventProcessing } from '../hooks/useEventProcessing';
import { useWindowDimensions } from '../hooks/useWindowDimensions';

export const Calendar: React.FC<{ events: IEvent[] }> = ({ events }) => {
  const { height } = useWindowDimensions();
  const processedEvents = useEventProcessing(events, height);

  return (
    <div className="calendar" style={{ height: `${height}px`, position: 'relative' }}>
      {processedEvents.map(event => (
        <Event
          key={event.id}
          event={event}
        />
      ))}
    </div>
  );
};