export interface Event {
    id: string;
    title: string;
    date: Date;
    time: string;
    type: 'session' | 'event';
    spotsLeft: number;
    totalSpots: number;
    description?: string;
    gameSystem?: string;
}