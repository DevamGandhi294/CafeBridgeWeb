import { StaffMember, StaffRequest } from '../types';

export const staffMembers: StaffMember[] = [
  { id: 's1', staffId: 'ST-0042', name: 'David Chen', email: 'david.c@cafebridge.com', role: 'Head Chef', roleCategory: 'kitchen', status: 'active', joinedAt: '2023-01-15', avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?w=40&h=40&fit=crop&facepad=2' },
  { id: 's2', staffId: 'ST-0039', name: 'Sophia Miller', email: 's.miller@cafebridge.com', role: 'Floor Manager', roleCategory: 'management', status: 'on_break', joinedAt: '2023-03-22', avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?w=40&h=40&fit=crop&facepad=2' },
  { id: 's3', staffId: 'ST-0051', name: 'Julian Rossi', email: 'j.rossi@cafebridge.com', role: 'Lead Barista', roleCategory: 'front_of_house', status: 'off_duty', joinedAt: '2023-05-10', avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?w=40&h=40&fit=crop&facepad=2' },
  { id: 's4', staffId: 'ST-0062', name: 'Amara Okafor', email: 'amara.o@cafebridge.com', role: 'Sous Chef', roleCategory: 'kitchen', status: 'active', joinedAt: '2023-07-01', avatar: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?w=40&h=40&fit=crop&facepad=2' },
  { id: 's5', staffId: 'ST-0035', name: 'Marcus Thorne', email: 'm.thorne@cafebridge.com', role: 'Waitstaff', roleCategory: 'front_of_house', status: 'active', joinedAt: '2023-02-28', avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?w=40&h=40&fit=crop&facepad=2' },
  { id: 's6', staffId: 'ST-0048', name: 'Elena Rodriguez', email: 'e.rodriguez@cafebridge.com', role: 'Floor Manager', roleCategory: 'management', status: 'active', joinedAt: '2023-06-15', avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?w=40&h=40&fit=crop&facepad=2' },
];

export const pendingRequests: StaffRequest[] = [
  { id: 'r1', name: 'Sarah Jenkins', role: 'Barista', joinedAgo: '2h ago', avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?w=40&h=40&fit=crop&facepad=2' },
  { id: 'r2', name: 'Marcus Thorne', role: 'Waitstaff', joinedAgo: '5h ago', avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?w=40&h=40&fit=crop&facepad=2' },
  { id: 'r3', name: 'Elena Rodriguez', role: 'Floor Manager', joinedAgo: 'Yesterday', avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?w=40&h=40&fit=crop&facepad=2' },
];
