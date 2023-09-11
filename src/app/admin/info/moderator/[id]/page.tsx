///getByIdCompany/{id}

"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import config from '@/config';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { Router } from 'next/router';


interface CompanyData {
  
    name: string;
    email: string;
    password: string;
  }

  
  const UpdateProcessing = () => {
    const { id } = useParams()
    const token = localStorage.getItem('token');

    const [data, setData] = useState<CompanyData>({
    
    name: '',
    email: '',
    password: '',

    });


    
    const [response, setResponse] = useState<string>("");

    useEffect(() => {
      // Check if running on the client side
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
  
        if (id) {
          const fetchData = async () => {
            try {
              const response = await fetch(
                `${config.API_BASE_URL}/api/getByIdModerator/${id}`,
                {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                  },
                  body: JSON.stringify({}), // Empty request body
                }
              );
  
              if (response.ok) {
                const CompanyData = await response.json();
                setData(CompanyData);
              } else {
                console.error('Error fetching data:', response.status);
              }
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          };
  
          fetchData();
        }
      }
    }, [id]);
  
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setData({ ...data, [event.target.name]: event.target.value });
    };
  
    const handleSubmit = async (event: React.FormEvent) => {
      event.preventDefault();
  
      try {
        // Check if running on the client side
        if (typeof window !== 'undefined') {
          const token = localStorage.getItem('token');
  
          const response = await fetch(
            `${config.API_BASE_URL}/api/updateByIdModerator/${id}`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify(data),
            }
          );
  
          if (response.ok) {
            const responseData = await response.json();
            setResponse(JSON.stringify(responseData));
            alert('Данные успешно изменены');
          } else {
            console.error('Error updating company:', response.status);
          }
        }
      } catch (error) {
        console.error('Error updating company:', error);
      }
    };


    return (
      <center>
      <div>
        <form onSubmit={handleSubmit}>
        <div style={{marginTop:'70px'}}>
        <h1>Изменить данные</h1>
        <TextField
        label="Наименование Филиала"
        name="name"
        value={data.name}
        onChange={handleChange}
        margin="normal"
        variant="outlined"
          style={{ width: '700px' }} // Установите нужную ширину в пикселях или других подходящих единиц

      /> </div>


      <div> <TextField
        label="Email"
        name="email"
        value={data.email}
        onChange={handleChange}
        
        margin="normal"
        variant="outlined"
          style={{ width: '700px' }} // Установите нужную ширину в пикселях или других подходящих единиц

      /> 
      </div>


      <div> <TextField
        label="Пароль"
        name="password"
        value={data.password}
        onChange={handleChange}
        margin="normal"
        variant="outlined"
        style={{ width: '700px' }}
      />
    </div>

          <br />
          <Button variant="contained" type="submit">Отправить</Button>
        </form>
      </div>
      </center>
    );
  };

  export default UpdateProcessing;