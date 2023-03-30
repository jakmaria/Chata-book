import { EventWithUser } from '@/pages/events';
import { createDate } from '@/scripts/createDate';
import { Event, User } from '@prisma/client';
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
          id: 'desc',
        },
      });
    },
    users: () => {
      return prisma.user.findMany();
    },
  },
  Mutation: {
    createEvent: async (_: any, args: EventWithUser) => {
      try {
        const newEvent = await prisma.event.create({
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
        console.log(newEvent);
        const newEventInfo = await prisma.event.findUnique({
          where: {
            id: newEvent.id,
          },
          include: {
            user: {
              select: {
                id: true,
                name: true,
                surname: true,
              },
            },
          },
        });
        return {
          code: 200,
          success: true,
          message: `Nová udalosť ${args.occassion} bola vytvorená! \n Začiatok:${createDate(
            args.start
          )} ,\n Koniec: ${createDate(args.end)}`,
          event: newEventInfo,
        };
      } catch (error) {
        return {
          code: 404,
          success: false,
          message: `Nebolo możné vytvorit novú udalost`,
        };
      }
    },
    editEvent: async (_: any, args: Event) => {
      try {
        const changeEvent = await prisma.event.update({
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
        return {
          code: 200,
          success: true,
          message: `Udalosť ${args.occassion} bola zmenená`,
          event: changeEvent,
        };
      } catch (error) {
        return {
          code: 404,
          success: false,
          message: `Nebolo możné zmenit udalost`,
        };
      }
    },
    deleteEvent(_: any, args: Event) {
      return prisma.event.delete({
        where: {
          id: Number(args.id),
        },
      });
    },
    createUser: async (_: any, args: User) => {
      try {
        const createUser = await prisma.user.create({
          data: {
            name: args.name,
            surname: args.surname,
            email: args.email,
            telephone: args.telephone,
          },
        });
        return {
          code: 200,
          success: true,
          message: `Užívatel ${args.name} ${args.surname} bol vytvoreny`,
          user: createUser,
        };
      } catch (error) {
        return {
          code: 404,
          success: false,
          message: `Nebolo możné vytvorit uzivatela`,
        };
      }
    },
  },
};
