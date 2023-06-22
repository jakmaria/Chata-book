import '../styles/main.scss';
import '/styles/calendar.scss';
import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import apolloClient from '../lib/apollo';
import Layout from '../components/Layout';
import { AuthContextProvider } from '@/context/AuthContext';
import { UserContext, EventContext } from '../context/BookingContext';
import { useRouter } from 'next/router';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useState } from 'react';
import { User } from '@prisma/client';
import { EventTileType } from '@/components/EventTile';
import '../styles/main.scss';
import '/styles/calendar.scss';
import '../styles/big-calendar.css';

const noAuthRequired = ['/'];

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [events, setEvents] = useState<EventTileType[]>([]);

  return (
    <AuthContextProvider>
      <ApolloProvider client={apolloClient}>
        <UserContext.Provider value={{ users, setUsers }}>
          <EventContext.Provider value={{ events, setEvents }}>
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
          </EventContext.Provider>
        </UserContext.Provider>
      </ApolloProvider>
    </AuthContextProvider>
  );
}
