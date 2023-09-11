"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Avatar, Button, CssBaseline, TextField, Box, Typography, Container } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import config from '@/config';

const defaultTheme = createTheme();

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (typeof window !== 'undefined') {
        const response = await axios.post(`${config.API_BASE_URL}/api/login`, { email, password });
        const token = response.data.token;
        localStorage.setItem('token', token);
        const role = response.data.role;
        localStorage.setItem('role', role);

        switch (role) {
          case 'admin':
            router.push('/admin');
            break;
          case 'moderator':
            router.push('/moderator');
            break;
          case 'company':
            router.push('/company');
            break;
        }
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Войти
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleLogin}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Пароль"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: "#1565c0" }}
            >
              Вход
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
