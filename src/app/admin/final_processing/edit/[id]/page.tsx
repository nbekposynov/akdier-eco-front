"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import config from '@/config';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';

interface ProcessingData {
  name_othod: string;
  value: string;
  type_operation: string;
}

const UpdateProcessing = () => {
  const { id } = useParams();
  const [token, setToken] = useState<string | null>(null);
  const [data, setData] = useState<ProcessingData>({
    name_othod: '',
    value: '',
    type_operation: '',
  });


  const [response, setResponse] = useState<string>('');

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
      axios
        .post(
          `${config.API_BASE_URL}/api/getByIdFinal/${id}`,
          {}, // empty request body
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          const processingData = response.data;
          setData(processingData);
        })
        .catch((error) => console.error(error));
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
        const response = await axios.post(
          `${config.API_BASE_URL}/api/updateByIdFinal/${id}`, // Use template literals to add the id to the URL
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data); // Log the response data for debugging purposes
        alert('Данные успешно обновлены');
      } else {
        // Handle cases where either id or token is missing (e.g., user not authenticated)
        alert('Authentication error or missing ID');
      }
    } catch (error: any) {
      if (error.response) {
        // Server returned an error response
        console.error(error.response.data); // Log the error response for debugging purposes
        alert('Ошибка: ' + error.response.data.message); // Show a specific error message from the server
      } else {
        // Error without a response (e.g., network error)
        console.error(error);
        alert('Ошибка: Не удалось связаться с сервером');
      }
    }
  };

  return (
    <center>
      <div>
        <form onSubmit={handleSubmit}>
          <div style={{ marginTop: '60px' }}>
            <h1>Update Processing</h1>
            <TextField
              label="Name Othod"
              name="name_othod"
              value={data.name_othod}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
              style={{ width: '700px' }}
            />
          </div>

          <div>
            <TextField
              label="Value"
              name="value"
              value={data.value}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
              style={{ width: '700px' }}
            />
          </div>

          <div>
            <TextField
              label="Type Operation"
              name="type_operation"
              value={data.type_operation}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
              style={{ width: '700px' }}
            />
          </div>

          <br />
          <Button variant="contained" type="submit">
            Отправить
          </Button>
        </form>
      </div>
    </center>
  );
};

export default UpdateProcessing;