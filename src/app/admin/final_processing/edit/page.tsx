"use client";
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { saveAs } from 'file-saver';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import config from '@/config';
import { useMediaQuery } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function Dashboard() {



  const [date, setDate] = useState('');
  const [reports, setReports] = useState<Report[]>([]);
  const isMobile = useMediaQuery('(max-width: 1200px)');

  const token = localStorage.getItem('token');



  const router = useRouter();

  const handleButtonClick = (id: number) => {
    // Действия при клике на кнопку
    // Например, можно перенаправить на динамическую страницу
    router.push(`/admin/final_processing/edit/${id}`);
  };
  

  const handleGetReports = async () => {
    try {
      const response = await axios.post<Report[]>(
        `${config.API_BASE_URL}/api/getByDateAdminFinal`,
        {
          date: date
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setReports(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  type Report = {
    id: number;
    bin_company: string;
    name_othod: string;
    value: number;
    type_operation: string;
  };
  

  const columns = [
    { field: 'bin_company', headerName: 'БИН Компании', width: 130 },
    { field: 'name_othod', headerName: 'Наименование Отхода', width: 200 },
    { field: 'value', headerName: 'Значение', width: 130 },
    { field: 'type_operation', headerName: 'Тип Операции', width: 130 },
    {
        field: 'actions',
        headerName: 'Действие',
        width: 150,
        renderCell: (params: any) => (
          <Button
            variant="contained"
            onClick={() => handleButtonClick(params.row.id)}
            sx={{ backgroundColor: 'green' }}
          >
            Изменить
          </Button>
        ),
      },
    ];

    const rows = reports.map((report) => ({
        ...report, // Include all properties from the report
        id: report.id, // Add the 'id' property for the DataGrid row
        bin_company: report.bin_company,
        name_othod: report.name_othod,
        value: report.value,
        type_operation: report.type_operation,
      }));


  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
      }}
    >
      <Toolbar />

      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={6}></Grid>
        <h1>Отчет</h1>
        <TextField
          id="startDateInput"
          label="Начальная дата"
          type="text"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={{
            width: isMobile ? '100%' : '300px',
            marginBottom: '10px',

          }}
        />

        <div>
          <p>
            <Button variant="contained" onClick={handleGetReports}>
              Получить отчет
            </Button>
          </p>
        </div>
        <div style={{ height: 600, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10, 25, 30]}
            checkboxSelection
          />
        </div>
      </Container>
    </Box>
  );
}