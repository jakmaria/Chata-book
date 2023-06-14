import React from 'react';
import { EventTileType } from '@/components/EventTile';
import { User } from '@prisma/client';

type UserContextType = {
  users: User[];
  setUsers: (users: User[]) => void;
};

type EventContextType = {
  events: EventTileType[];
  setEvents: (events: EventTileType[]) => void;
};

export const UserContext = React.createContext<UserContextType | undefined>(undefined);
export const EventContext = React.createContext<EventContextType | undefined>(undefined);
