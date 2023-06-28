import { ApolloServer } from 'apollo-server';
import typeDefs from './typeDefs/schema.gql';
import resolvers from './resolvers';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const token = req.headers.authorization || '';
    const decodedToken = await admin.auth().verifyIdToken(token);
    console.log('decoded token', decodedToken);
    const userId = decodedToken.uid;
    const userEmail = decodedToken.email; // Assuming the token contains the email
    return { userId, userEmail };
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
