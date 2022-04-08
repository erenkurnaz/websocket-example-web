import { FC, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
} from '@mui/material';
import { ArrowRight, Visibility, VisibilityOff, LoginOutlined } from '@mui/icons-material';
import { useAuthStore } from '../../store/auth.store';
import apiEndpoints from '../../utils/enpoints';

const Login: FC = () => {
  const { setUser } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (event: SelectChangeEvent) => {
    setEmail(event.target.value as string);
    setPassword('123456');
  };

  const handeLogin = async () => {
    setError('');
    const response = await fetch(apiEndpoints.login, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({ email, password }),
    });

    const body = await response.json();
    if (!body || !body.user) setError('Invalid email or password');
    setUser(body);
  };

  return (
    <Box>
      <Card style={{ padding: '25px' }}>
        <CardHeader title={'Websocket Example'} className={'text-center'} subheader={error} />
        <hr />
        <CardContent>
          <Stack spacing={2}>
            <FormControl fullWidth>
              <InputLabel id="user">Select User</InputLabel>
              <Select
                labelId="user-label"
                id="user"
                value={email}
                label="Select User"
                onChange={handleChange}
              >
                <MenuItem value={'han@mail.com'}>Han Solo</MenuItem>
                <MenuItem value={'anakin@mail.com'}>Anakin Sykwalker</MenuItem>
                <MenuItem value={'obi@mail.com'}>Obi-wan Kenobi</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Email"
              autoFocus
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormControl variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
            <Button type="submit" variant={'outlined'} color={'primary'} onClick={handeLogin}>
              login <LoginOutlined className={'ml-1'} />
            </Button>
          </Stack>
        </CardContent>
        <CardActions style={{ justifyContent: 'flex-end' }}>
          <Button
            href="https://github.com/erenkurnaz/websocket-example"
            target={'_blank'}
            color={'primary'}
          >
            API Repository
            <ArrowRight />
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default Login;
