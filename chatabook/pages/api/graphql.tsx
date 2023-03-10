import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { gql } from 'graphql-tag';
import { typeDefs } from '@/graphql/schema';

const resolvers = {
    Query:{
        events: () => [],
    }
};

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