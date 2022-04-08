import { createContext, FC, useContext, useEffect, useMemo, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import { useSnackbar } from 'notistack';
import apiEndpoints from '../utils/enpoints';
import { useAuthStore } from '../store/auth.store';
import { SocketEvents } from '../components/Chat/types';

interface ISocketContext {
  socket: Socket | null;
}

const SocketContext = createContext<ISocketContext | undefined>(undefined);

const SocketProvider: FC = ({ children }) => {
  const { authUser } = useAuthStore();
  const [socket, setSocket] = useState<Socket | null>(null);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (!authUser?.token) return;

    const client = io(apiEndpoints.socket, {
      transports: ['websocket'],
      withCredentials: true,
      query: {
        token: authUser?.token,
      },
    });

    client.on(SocketEvents.CONNECT, () => {
      enqueueSnackbar('You are online', { variant: 'success' });
    });

    client.on(SocketEvents.DISCONNECT, () => {
      enqueueSnackbar('You are offline', { variant: 'warning' });
    });

    client.on(SocketEvents.CONNECT_ERROR, (err) => {
      enqueueSnackbar(err.message, { variant: 'error' });
    });

    setSocket(client);

    // eslint-disable-next-line consistent-return
    return () => {
      client.close();
    };
  }, [authUser?.token]);

  const value = useMemo(
    () => ({
      socket,
    }),
    [socket],
  );
  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
};

export function useSocket() {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
}

export default SocketProvider;
