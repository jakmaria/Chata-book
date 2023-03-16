import { Event } from '@prisma/client';
import prisma from '../lib/prisma';

export const resolvers = {
  Query: {
    events: () => {
      return prisma.event.findMany({
        include: {
          user: {
            select: {
              id: true,
              name: true,
              surname: true,
            },
          },
        },
        orderBy: {
          start: 'asc',
        },
      });
    },
    users: () => {
      return prisma.user.findMany();
    },
  },
  Mutation: {
    createEvent(_: any, args: Event) {
      return prisma.event.create({
        data: {
          userId: args.userId,
          occassion: args.occassion,
          start: new Date(args.start).toISOString(),
          end: new Date(args.end).toISOString(),
          people: args.people,
          whole: args.whole,
          appartments: args.appartments,
          message: args.message,
        },
      });
    },
    editEvent(_: any, args: Event) {
      return prisma.event.update({
        where: {
          id: Number(args.id),
        },
        data: {
          userId: args.userId,
          occassion: args.occassion,
          start: new Date(args.start).toISOString(),
          end: new Date(args.end).toISOString(),
          people: args.people,
          whole: args.whole,
          appartments: args.appartments,
          message: args.message,
        },
      });
    },
    deleteEvent(_: any, args: Event) {
      return prisma.event.delete({
        where: {
          id: Number(args.id),
        },
      });
    },
  },
};
