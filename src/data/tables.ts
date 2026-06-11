import { Table } from '../types';

export const tables: Table[] = [
  { id: 't1', number: 1, capacity: 2, status: 'available', section: 'Main Hall' },
  { id: 't2', number: 2, capacity: 4, status: 'occupied', section: 'Main Hall', guests: 3, server: 'Sarah J.', reservation: 'Walk-in' },
  { id: 't3', number: 3, capacity: 4, status: 'reserved', section: 'Main Hall', reservation: 'Johnson • 7:00 PM', guests: 4 },
  { id: 't4', number: 4, capacity: 8, status: 'occupied', section: 'Corner', guests: 8, server: 'Marcus T.', reservation: 'VIP • Smith Party' },
  { id: 't5', number: 5, capacity: 2, status: 'cleaning', section: 'Main Hall' },
  { id: 't6', number: 6, capacity: 4, status: 'available', section: 'Patio' },
  { id: 't7', number: 7, capacity: 4, status: 'occupied', section: 'Patio', guests: 2, server: 'Elena R.' },
  { id: 't8', number: 8, capacity: 6, status: 'reserved', section: 'Patio', reservation: 'Chen Family • 8:00 PM', guests: 5 },
  { id: 't9', number: 9, capacity: 2, status: 'available', section: 'Bar' },
  { id: 't10', number: 10, capacity: 2, status: 'occupied', section: 'Bar', guests: 2, server: 'Julian R.' },
  { id: 't11', number: 11, capacity: 4, status: 'available', section: 'Main Hall' },
  { id: 't12', number: 12, capacity: 6, status: 'available', section: 'Corner' },
];
