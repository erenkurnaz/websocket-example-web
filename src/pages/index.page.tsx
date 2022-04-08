import { Box } from '@mui/material';
import type { NextPage } from 'next';
import React, { useEffect } from 'react';
import { useAuthStore } from '../store/auth.store';
import Login from '../components/Login';
import Chat from '../components/Chat';
import SocketProvider from '../context/SocketProvider';

const Home: NextPage = () => {
  const { initialize, authUser } = useAuthStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  const isAuthenticated = authUser?.token;

  return (
    <Box marginTop={'20px'}>
      <Box height={'100vh'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
        <Box width={'375px'}>
          {isAuthenticated ? (
            <SocketProvider>
              <Chat />
            </SocketProvider>
          ) : (
            <Login />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
