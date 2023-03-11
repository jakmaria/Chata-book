import gql from 'graphql-tag';

export const typeDefs = gql`
type Event {
id: Number
user: String
occassion: String
start: String
end: String 
people: Number
whole: Boolean
appartments: Number
message: String?
}

type Query {
    events: [Event]!
}
`;
