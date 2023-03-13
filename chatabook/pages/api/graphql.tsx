import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { createSchema, createYoga } from 'graphql-yoga'
import type { NextApiRequest, NextApiResponse } from 'next'
import { resolvers } from '@/graphql/resolvers';
import { typeDefs } from '@/graphql/schema';


export default createYoga<{
    req: NextApiRequest
    res: NextApiResponse
  }>({
    schema: createSchema({
      typeDefs,
      resolvers
    }),
    graphqlEndpoint: '/api/graphql'
  })
  
  export const config = {
    api: {
      bodyParser: false
    }
  }

// const apolloServer = new ApolloServer({typeDefs, resolvers});

// export const config = {
//     api:{
//         bodyParser: false,
//     }
// };

// export default startServerAndCreateNextHandler(apolloServer);


//Might need later:
// export default startServerAndCreateNextHandler(server, {
//     context: async (req, res) => ({ req, res, user: await getLoggedInUser(req) }),
//   });