import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { gql } from 'graphql-tag';


const resolvers = {
    Query:{
        events: () => [],
    }
};

const typeDefs = gql`
  type Event {
id: Int
user: String
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

const apolloServer = new ApolloServer({typeDefs, resolvers});

export const config = {
    api:{
        bodyParser: false,
    }
};

export default startServerAndCreateNextHandler(apolloServer);


//Might need later:
// export default startServerAndCreateNextHandler(server, {
//     context: async (req, res) => ({ req, res, user: await getLoggedInUser(req) }),
//   });