import '../styles/main.scss';
import '/styles/calendar.scss';
import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import apolloClient from '../lib/apollo';
import Layout from '../components/Layout';
import { AuthContextProvider } from '@/context/AuthContext';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '@/config/firebase';
import { getAuth } from 'firebase/auth';

export default function App({ Component, pageProps }: AppProps) {


  return (
    <AuthContextProvider>
    <ApolloProvider client={apolloClient}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
    </AuthContextProvider>
  );
}


