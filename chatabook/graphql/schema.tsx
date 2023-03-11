import gql from 'graphql-tag';

export const typeDefs = gql`
  type User {
    id: Int
    name: String
    surname: String
  }

  type Event {
    id: Int
    user: User
    userId: Int
    occassion: String
    start: String
    end: String
    people: Int
    whole: Boolean
    appartments: Int
    message: String
  }

  type Query {
    events: [Event]!
  }
`;
