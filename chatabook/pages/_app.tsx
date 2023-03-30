import '../styles/main.scss';
import '/styles/calendar.scss';
import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import apolloClient from '../lib/apollo';
import Layout from '../components/Layout';
import { AuthContextProvider } from '@/context/AuthContext';
import { useRouter } from 'next/router';
import ProtectedRoute from '@/components/ProtectedRoute';

const noAuthRequired = ['/'];

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <AuthContextProvider>
      <ApolloProvider client={apolloClient}>
        {noAuthRequired.includes(router.pathname) ? (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        ) : (
          <ProtectedRoute>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ProtectedRoute>
        )}
      </ApolloProvider>
    </AuthContextProvider>
  );
}
