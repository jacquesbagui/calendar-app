export interface IEvent {
    id: number;
    start: string;
    duration: number;
}
  
export interface IProcessedEvent extends IEvent {
    column: number;
    width: string;
    height: string;
    top: string;
    left: string;
}