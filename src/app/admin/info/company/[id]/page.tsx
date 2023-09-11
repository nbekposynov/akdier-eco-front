///getByIdCompany/{id}

"use client"
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import config from '@/config';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';


interface CompanyData {
  
    name: string;
    bin_company: string;
    description: string;
    email: string;
    password: string;
  }

  
  const UpdateProcessing = () => {
    const { id } = useParams()
    const [token, setToken] = useState<string | null>(null);

    const [data, setData] = useState<CompanyData>({
    
    name: '',
    bin_company: '',
    description: '',
    email: '',
    password: '',

    });

    
    const [response, setResponse] = useState<string>("");

    useEffect(() => {
      // Check if running on the client side
      if (typeof window !== 'undefined') {
        const storedToken = localStorage.getItem('token');
        setToken(storedToken);
      }
    }, []);
  
    useEffect(() => {
      // Fetch processing data when the ID and token are available
      if (id && token) {
        const fetchData = async () => {
          try {
            const response = await fetch(`${config.API_BASE_URL}/api/getByIdCompany/${id}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({}), // Empty request body
            });
  
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
    }, [id, token]);
  
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setData({ ...data, [event.target.name]: event.target.value });
    };
  
    const handleSubmit = async (event: React.FormEvent) => {
      event.preventDefault();
  
      try {
        // Check if ID and token are available before making the update request
        if (id && token) {
          const response = await fetch(`${config.API_BASE_URL}/api/updateByIdCompany/${id}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
          });
  
          if (response.ok) {
            const responseData = await response.json();
            setResponse(JSON.stringify(responseData));
            alert('Данные Успешно изменены');
          } else {
            console.error('Error updating company:', response.status);
          }
        } else {
          // Handle cases where either id or token is missing (e.g., user not authenticated)
          alert('Authentication error or missing ID');
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
        <h1>Изменить данные Заказчика</h1>
        <TextField
        label="Наименование Компании"
        name="name"
        value={data.name}
        onChange={handleChange}
        margin="normal"
        variant="outlined"
          style={{ width: '700px' }} // Установите нужную ширину в пикселях или других подходящих единиц

      /> </div>

<div> <TextField
        label="БИН Компании"
        name="bin_company"
        value={data.bin_company}
        onChange={handleChange}
        margin="normal"
        variant="outlined"
          style={{ width: '700px' }} // Установите нужную ширину в пикселях или других подходящих единиц

      /> </div>

      <div> <TextField
        label="Описание"
        name="description"
        value={data.description}
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
        label="Password"
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