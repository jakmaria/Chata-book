import gql from 'graphql-tag';

export const typeDefs = gql`
  type User {
    id: ID
    name: String
    surname: String
    email: String
    telephone: String
    roleId: Int
    role: Role
  }

  type Role {
    id: ID
    name: String
    users: [User]
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
      email: String!
    ): EventChangeResponse!

    createUser(
      name: String!
      surname: String!
      email: String!
      telephone: String!
      roleId: Int!
    ): UserChangeResponse!

    deleteEvent(id: ID!, email: String!): Event!
  }
`;
