import { Box, Button, Stack, TextField } from '@mui/material';
import React, { useEffect, useState, KeyboardEvent, useRef } from 'react';
import { useSnackbar } from 'notistack';
import { useSocket } from '../../context/SocketProvider';
import styles from './Chat.module.scss';
import { Message, SocketEvents } from './types';
import MessageLine from './MessageLine';
import { useAuthStore } from '../../store/auth.store';

const Chat = () => {
  const { socket } = useSocket();
  const { authUser, deleteUser } = useAuthStore();
  const { enqueueSnackbar } = useSnackbar();

  const scrollBottomRef = useRef<HTMLDivElement>(null);
  const [messageContent, setMessageContent] = useState('');
  const [connectionStatus, setConnectionStatus] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);

  const handleDisconnect = () => {
    if (!socket) return;

    socket.disconnect();
    setConnectionStatus(false);
  };

  const handleReconnect = () => {
    if (!socket) return;

    socket.connect();
    setConnectionStatus(true);
  };

  const handleSendMessage = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'Enter' || !socket) return;

    socket.emit(SocketEvents.MESSAGE, messageContent);
    setMessages([
      {
        username: authUser?.user.name ?? 'me',
        message: messageContent,
        createdAt: new Date().toISOString(),
        self: true,
      },
      ...messages,
    ]);
    setMessageContent('');
  };

  useEffect(() => {
    if (!socket) return;

    socket.on(SocketEvents.CONNECTED, (payload: Message) => {
      enqueueSnackbar(payload.message, { variant: 'success' });
    });

    socket.on(SocketEvents.DISCONNECTED, (payload: Message) => {
      enqueueSnackbar(payload.message, { variant: 'info' });
    });

    socket.on(SocketEvents.MESSAGE, (message: Message) => {
      setMessages((allMessages) => [message, ...allMessages]);
    });

    socket.on(SocketEvents.UNSEEN_MESSAGES, (unseenMessages: Message[]) => {
      setMessages((allMessages) => [...unseenMessages, ...allMessages]);
    });
  }, [socket]);

  return (
    <Box className={styles.pageContainer}>
      <Box className={styles.screen}>
        <Box display="flex" alignItems="center" paddingX={'15px'}>
          <TextField
            label={`Messaging as ${authUser?.user.name}`}
            disabled={!connectionStatus}
            autoFocus
            fullWidth
            value={messageContent}
            onKeyUp={handleSendMessage}
            onChange={(e) => setMessageContent(e.target.value)}
          />
        </Box>
        <Box className={styles.messagesBox} paddingX={'15px'}>
          <Stack spacing={1} id={'messageBox'}>
            {messages.map(({ message, username, createdAt, self }) => (
              <MessageLine
                key={`${Math.random()}`}
                message={message}
                username={username}
                createdAt={createdAt!}
                self={self}
              />
            ))}
          </Stack>
          <div ref={scrollBottomRef} />
        </Box>
        <Box display={'grid'} gridTemplateColumns={'1fr 1fr'}>
          <Button
            variant="contained"
            style={{ borderRadius: '0 0 0 5px' }}
            color={connectionStatus ? 'info' : 'primary'}
            onClick={() => (connectionStatus ? handleDisconnect() : handleReconnect())}
          >
            {connectionStatus ? 'Disconnect' : 'Reconnect'}
          </Button>
          <Button
            color={'error'}
            variant={'contained'}
            style={{ borderRadius: '0 0 5px 0' }}
            onClick={deleteUser}
          >
            Logout
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Chat;
