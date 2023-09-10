'use client'
import React, { useState, ChangeEvent, FormEvent } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import config from '@/config';
const RegisterCompanyForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  
  const token = localStorage.getItem('token');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${config.API_BASE_URL}/api/register_moderator`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
    });
      if (response.status === 201) {
        // handle successful registration
        console.log('Moderator registered successfully');
        alert('Филиал успешно добавлен')
      } else {
        // handle error
        console.log('Moderator registration failed');
      }
    } catch (error) {
      // handle error
      console.error('Error registering moderator:', error);
    }
  };

  return (
    <Box component="main"
    sx={{
      flexGrow: 1,
      height: '100vh',
      overflow: 'auto',
    }}
  >
    <Toolbar />

<Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
  <Grid container spacing={6}>    
  
</Grid>
<center> <h1>Добавить Филиал</h1>



    <form onSubmit={handleSubmit}>
      <div>
        <TextField
          label="Наименование Филиала"
          name="name"
          value={formData.name}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
          required
          style={{ width: '700px' }} // Установите нужную ширину в пикселях или других подходящих единиц

        />
      </div>

      <div>
        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
          required
          style={{ width: '700px' }} // Установите нужную ширину в пикселях или других подходящих единиц

        />
      </div>

      <div>
        <TextField
          label="Пароль"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
          required
          style={{ width: '700px' }} // Установите нужную ширину в пикселях или других подходящих единиц

        />
      </div>
      <Button variant="contained" type="submit">
        Добавить Филиал
      </Button>
    </form>
    </center>
      </Container>
    </Box>
  );
};

export default RegisterCompanyForm;