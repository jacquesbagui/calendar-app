import { MINUTES_IN_HOUR, DAY_START_HOUR } from './constants';

// Convertit une heure au format string en minutes
export function parseTime(time: string): number {
  const [hours, minutes] = time.split(':').map(Number);
  return (hours - DAY_START_HOUR) * MINUTES_IN_HOUR + minutes;
}

// Convertit des minutes en format heure:minute
export function formatTime(minutes: number): string {
  const hours = Math.floor(minutes / MINUTES_IN_HOUR) + DAY_START_HOUR;
  const mins = minutes % MINUTES_IN_HOUR;
  return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
}