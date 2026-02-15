'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Calendar, Users, Clock } from 'lucide-react';

interface TableCardProps {
    id: string;
    name: string;
    capacity: number;
    available: boolean;
    currentBooking?: {
        startTime: Date;
        endTime: Date;
        user: string;
    };
    onBook?: (tableId: string) => void;
}

export const TableCard = ({ id, name, capacity, available, currentBooking, onBook }: TableCardProps) => {
    return (
        <Card className={available ? '' : 'opacity-75'}>
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    <span>{name}</span>
                    <div className={`h-3 w-3 rounded-full ${available ? 'bg-green-500' : 'bg-red-500'}`} />
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <Users className="mr-2 h-4 w-4" />
                        Capacity: {capacity} players
                    </div>

                    {currentBooking ? (
                        <div className="rounded-md bg-gray-100 p-3 dark:bg-gray-800">
                            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                                <Clock className="mr-2 h-4 w-4" />
                                Booked by {currentBooking.user}
                            </div>
                            <div className="mt-1 text-xs text-gray-500">
                                {currentBooking.startTime.toLocaleTimeString()} - {currentBooking.endTime.toLocaleTimeString()}
                            </div>
                        </div>
                    ) : (
                        <Button
                            variant="primary"
                            className="w-full"
                            onClick={() => onBook?.(id)}
                            disabled={!available}
                        >
                            <Calendar className="mr-2 h-4 w-4" />
                            Book Table
                        </Button>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};