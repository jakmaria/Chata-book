import gql from 'graphql-tag';

export const typeDefs = gql`
  type User {
    id: ID
    name: String
    surname: String
    email: String
    telephone: String
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

  type Query {
    user(email: String!): User
  }

  interface MutationResponse {
    code: String!
    success: Boolean!
    message: String!
  }

  type EventChangeResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    event: Event
    query: Query
  }

  type UserChangeResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    user: User
    query: Query
  }

  type Mutation {
    createEvent(
      userId: Int!
      occassion: String!
      start: String!
      end: String!
      people: Int!
      whole: Boolean!
      appartments: Int!
      message: String
    ): EventChangeResponse!
  }

  type Mutation {
    editEvent(
      id: ID!
      userId: Int!
      occassion: String!
      start: String!
      end: String!
      people: Int!
      whole: Boolean!
      appartments: Int!
      message: String
    ): EventChangeResponse!
  }

  type Mutation {
    createUser(
      name: String!
      surname: String!
      email: String!
      telephone: String!
    ): UserChangeResponse!
  }

  type Mutation {
    deleteEvent(id: ID!): Event!
  }
`;
