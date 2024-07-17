import { useMemo } from 'react';
import { IEvent, IProcessedEvent } from '../types';
import { parseTime } from '../utils/timeUtils';
import { DAY_START_HOUR, MIN_EVENT_HEIGHT, MINUTES_IN_HOUR, TOTAL_HOURS } from '../utils/constants';

interface Point {
  time: number;
  isStart: boolean;
  event: IEvent;
}

export function useEventProcessing(events: IEvent[], containerHeight: number): IProcessedEvent[] {
  return useMemo(() => {
    const points = createSortedPoints(events);
    const { eventLayouts, maxColumn } = processPoints(points);
    return createProcessedEvents(events, eventLayouts, maxColumn, containerHeight);
  }, [events]);
}

// Crée et trie les points de début et de fin pour tous les événements
function createSortedPoints(events: IEvent[]): Point[] {
  const points = events.flatMap(event => [
    { time: parseTime(event.start), isStart: true, event },
    { time: parseTime(event.start) + event.duration, isStart: false, event }
  ]);
  return points.sort((a, b) => a.time - b.time || (a.isStart ? -1 : 1) || a.event.id - b.event.id);
}

// Traite les points pour déterminer la disposition des événements
function processPoints(points: Point[]): { eventLayouts: Map<number, { column: number; maxWidth: number }>, maxColumn: number } {
  const eventLayouts = new Map<number, { column: number; maxWidth: number }>();
  let maxColumn = 0;
  let activeEvents: { event: IEvent; endTime: number }[] = [];

  points.forEach(point => {
    // Supprime les événements terminés
    activeEvents = activeEvents.filter(ae => ae.endTime > point.time);

    if (point.isStart) {
      const endTime = point.time + point.event.duration;
      const column = findAvailableColumn(activeEvents, point.time, endTime, eventLayouts);
      activeEvents.push({ event: point.event, endTime });
      maxColumn = Math.max(maxColumn, column);
      
      // Compte les événements commençant au même moment
      const simultaneousEvents = points.filter(p => p.time === point.time && p.isStart).length;
      const initialMaxWidth = Math.max(simultaneousEvents, activeEvents.length);
      eventLayouts.set(point.event.id, { column, maxWidth: initialMaxWidth });
    }

    // Met à jour la largeur maximale pour tous les événements qui se chevauchent
    const overlappingEvents = activeEvents.filter(ae => 
      overlapsWith(ae, point.time, point.time + 1)
    );
    const maxWidth = Math.max(1, overlappingEvents.length);
    overlappingEvents.forEach(ae => {
      const layout = eventLayouts.get(ae.event.id);
      if (layout) {
        layout.maxWidth = Math.max(layout.maxWidth, maxWidth);
      }
    });
  });

  return { eventLayouts, maxColumn };
}

// Trouve une colonne disponible pour un nouvel événement
function findAvailableColumn(
  activeEvents: { event: IEvent; endTime: number }[],
  startTime: number,
  endTime: number,
  eventLayouts: Map<number, { column: number; maxWidth: number }>
): number {
  let column = 0;
  while (activeEvents.some(ae => 
    overlapsWith(ae, startTime, endTime) && 
    eventLayouts.get(ae.event.id)!.column === column
  )) {
    column++;
  }
  return column;
}

// Vérifie si deux événements se chevauchent
function overlapsWith(
  activeEvent: { event: IEvent; endTime: number },
  startTime: number,
  endTime: number
): boolean {
  const aeStartTime = parseTime(activeEvent.event.start);
  return (startTime < activeEvent.endTime && endTime > aeStartTime);
}

// Crée les événements traités avec leur position et largeur calculées
function createProcessedEvents(
  events: IEvent[],
  eventLayouts: Map<number, { column: number; maxWidth: number }>,
  maxColumn: number,
  containerHeight: number
): IProcessedEvent[] {
  const totalMinutes = TOTAL_HOURS * MINUTES_IN_HOUR;

  return events.map(event => {
    const layout = eventLayouts.get(event.id)!;
    const startMinutes = parseTime(event.start);
    const top = (startMinutes / totalMinutes) * containerHeight;
    const height = Math.max((event.duration / totalMinutes) * containerHeight);

    // Log the calculated values for debugging
    /*console.log(`Event ${event.id}:`);
    console.log(`  Start Time: ${event.start}`);
    console.log(`  Duration: ${event.duration}`);
    console.log(`  Start Minutes: ${startMinutes}`);
    console.log(`  Top: ${top}`);
    console.log(`  Height: ${height}`);
    console.log(`  Column: ${layout.column}`);
    console.log(`  Max Width: ${layout.maxWidth}`);
    console.log(`  Width: ${100 / layout.maxWidth}%`);
    console.log(`  Left: ${layout.column / layout.maxWidth * 100}%`);*/

    return {
      ...event,
      column: layout.column,
      width: `${100 / layout.maxWidth}%`,
      left: `${(layout.column / layout.maxWidth) * 100}%`,
      top: `${top}px`,
      height: `${height}px`,
    };
  });
}

