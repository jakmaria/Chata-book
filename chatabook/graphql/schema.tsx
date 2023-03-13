import gql from 'graphql-tag';

export const typeDefs = gql`
  type User {
    id: ID
    name: String
    surname: String
  }

  type Event {
    id: ID
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
    users: [User]!
  }

  
`;
