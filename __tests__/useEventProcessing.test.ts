import { renderHook } from "@testing-library/react";
import { useEventProcessing } from '../src/hooks/useEventProcessing';
import { IEvent, IProcessedEvent } from '../src/types';
import { MINUTES_IN_HOUR, TOTAL_HOURS } from '../src/utils/constants';

describe('createProcessedEvents', () => {
  const containerHeight = 720;
  const totalMinutes = TOTAL_HOURS * MINUTES_IN_HOUR;
  
  const events: IEvent[] = [
    { id: 1, start: '10:00', duration: 30 },
    { id: 2, start: '11:00', duration: 60 },
    { id: 3, start: '12:00', duration: 45 }
  ];
  
  it('should correctly process event positions and sizes', () => {    
    const { result } = renderHook(() => useEventProcessing(events, containerHeight));

    const processedEvents = result.current;    
    // Test event 1
    expect(processedEvents[0].top).toBe(`${(60 / 720) * containerHeight}px`);
    expect(processedEvents[0].height).toBe(`${(30 / 720) * containerHeight}px`);
    expect(processedEvents[0].width).toBe('100%');
    expect(processedEvents[0].left).toBe('0%');
    
    // Test event 2
    expect(processedEvents[1].top).toBe(`${(120 / 720) * containerHeight}px`);
    expect(processedEvents[1].height).toBe(`${(60 / 720) * containerHeight}px`);
    expect(processedEvents[1].width).toBe('100%');
    expect(processedEvents[1].left).toBe('0%');
    
    // Test event 3
    expect(processedEvents[2].top).toBe(`${(180 / 720) * containerHeight}px`);
    expect(processedEvents[2].height).toBe(`${(45 / 720) * containerHeight}px`);
    expect(processedEvents[2].width).toBe('100%');
    expect(processedEvents[2].left).toBe('0%');
  });
});
