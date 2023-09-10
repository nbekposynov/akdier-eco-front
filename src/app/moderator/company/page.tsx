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
    bin_company: '',
    description: '',
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
      const response = await axios.post(`${config.API_BASE_URL}/api/register_company`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.status === 201) {
        // Обработка успешной регистрации
        alert('Company registered successfully');
      } else {
        // Обработка ошибки
        alert('Company registration failed');
      }
    } catch (error: any) {
      // Обработка ошибки
      if (error.response  && error.response.status === 422) {
        const { errors } = error.response.data;
        let errorMessage = 'Ошибка добавления :';
  
        // Проход по каждой ошибке и добавление ее к errorMessage
        Object.keys(errors).forEach((key) => {
          errorMessage += `\n- ${errors[key][0]}`;
        });
  
        alert(errorMessage);
      } else {
        alert('Error registering company: ' + error.message);
      }
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
<center> <h2>Добавить Заказчика</h2>



    <form onSubmit={handleSubmit}>
      <div>
        <TextField
          label="Наименование Заказчика"
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

      <div>
        <TextField
          label="БИН Заказчика"
          name="bin_company"
          value={formData.bin_company}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
          required
          style={{ width: '700px' }} // Установите нужную ширину в пикселях или других подходящих единиц

        />
      </div>

      <div>
        <TextField
          label="Описание"
          name="description"
          multiline
          rows={4}
          value={formData.description}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
          required
          style={{ width: '700px' }} // Установите нужную ширину в пикселях или других подходящих единиц

        />
      </div>

      <Button variant="contained" type="submit">
        Добавить Компанию
      </Button>
    </form>
    </center>
      </Container>
    </Box>
  );
};

export default RegisterCompanyForm;