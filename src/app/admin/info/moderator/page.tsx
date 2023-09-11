"use client"
import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/material';
import Container from '@mui/material/Container';
import { useRouter } from 'next/router';
import Button from '@mui/material/Button';

import config from '@/config';

interface Company {
  id: number;
  name: string;
  email: string;
}

export default function BasicTable() {
  const [rows, setRows] = useState<Company[]>([]);
  const router = useRouter();

  useEffect(() => {
    // Check if running on the client side
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      // Fetch companies data from the server
      fetchCompanies(token);
    }
  }, []);

  const fetchCompanies = async (token: string | null) => {
    try {
      if (!token) return; // Return if token is not available

      const response = await fetch(`${config.API_BASE_URL}/api/show_moderators`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setRows(data);
      } else {
        console.error('Error fetching companies:', response.status);
      }
    } catch (error) {
      console.error('Error fetching companies:', error);
    }
  };

  const handleButtonClick = (id: number) => {
    // Действия при клике на кнопку
    // Например, можно перенаправить на динамическую страницу
    router.push(`/admin/info/moderator/${id}`);
  };

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
        marginTop: '50px',
      }}
    >
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <center>
          <h1>Список Филиалов</h1>
        </center>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Наименование Филлиала</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">Изменить</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="center">{row.name}</TableCell>
                  <TableCell align="center">{row.email}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      onClick={() => handleButtonClick(row.id)}
                      sx={{ backgroundColor: 'green' }}
                    >
                      Select
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Box>
  );
}