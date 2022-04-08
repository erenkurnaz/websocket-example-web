import React, { FC } from 'react';
import { Box, Paper, Typography } from '@mui/material';
// @ts-ignore
import classNames from 'classnames';
import styles from './MessageLine.module.scss';

interface MessageLineProps {
  message: string;
  username: string;
  createdAt: string;
  // eslint-disable-next-line react/require-default-props
  self?: boolean;
}

const MessageLine: FC<MessageLineProps> = ({ message, username, createdAt, self }) => (
  <Paper className={classNames([styles.messageLine, self && styles.me])}>
    <Box
      display={'flex'}
      alignItems={'center'}
      justifyContent={'space-between'}
      borderBottom={'1px solid #eaeaea'}
      marginBottom={'5px'}
    >
      <Typography variant="subtitle1" color={'orange'}>
        {username}
      </Typography>
      <Typography variant="overline" align={'right'}>
        {createdAt}
      </Typography>
    </Box>
    <Typography variant="body1">{message}</Typography>
  </Paper>
);

export default MessageLine;
