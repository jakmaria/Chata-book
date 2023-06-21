import { ApolloServer } from 'apollo-server';
import typeDefs from './typeDefs/schema.gql';
import resolvers from './resolvers';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    // Get the user token from the headers
    const decodedToken = await admin.auth().verifyIdToken(token);
    const userId = decodedToken.uid;
    return { userId };
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
