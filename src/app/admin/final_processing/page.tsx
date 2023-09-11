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
import config from '@/config';
import { useMediaQuery } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';

export default function Dashboard() {




  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reports, setReports] = useState<Report[]>([]);
  const isMobile = useMediaQuery('(max-width: 1200px)');
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false); // Состояние для видимости модального окна

  const [token, setToken] = useState<string | null>(null);



  useEffect(() => {
    // Check if running on the client side
    if (typeof window !== 'undefined') {
      const storedToken = localStorage.getItem('token');
      setToken(storedToken);
    }
  }, []);

  const handleExportReports = async () => {
    try {
      if (token) {
        const response = await axios.post(
          `${config.API_BASE_URL}/api/ExportByDateRangeAdminFinal`,
          {
            start_date: startDate,
            end_date: endDate,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            responseType: 'blob',
          }
        );

        saveAs(response.data, 'reports.xlsx');
      } else {
        // Handle cases where localStorage doesn't have a valid token
        alert('Authentication error');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteRecords = async () => {
    // Открываем модальное окно перед удалением
    setConfirmDeleteOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      if (token) {
        const response = await axios.delete(
          `${config.API_BASE_URL}/api/delete_by_range_final`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            data: {
              start_date: startDate,
              end_date: endDate,
            },
          }
        );

        console.log(response.data); // Проверка успешного ответа с сервера

        // Закрываем модальное окно после удаления
        setConfirmDeleteOpen(false);
        alert('Данные успешно удалены!');
        // Вы можете добавить обновление списка отчетов после удаления,
        // если требуется обновить таблицу с отчетами на вашем фронтенде.
      } else {
        // Handle cases where localStorage doesn't have a valid token
        alert('Authentication error');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleGetReports = async () => {
    try {
      if (token) {
        const response = await axios.post<Report[]>(
          `${config.API_BASE_URL}/api/getByDateRangeAdminFinal`,
          {
            start_date: startDate,
            end_date: endDate,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setReports(response.data);
      } else {
        // Handle cases where localStorage doesn't have a valid token
        alert('Authentication error');
      }
    } catch (error) {
      console.error(error);
    }
  };

  type Report = {
    bin_company: string;
    name_othod: string;
    total_value: number;
    type_operation: string;
  };

  const columns = [
    { field: 'company_bin', headerName: 'БИН Компании', width: 120 },
    { field: 'name_othod', headerName: 'Наименование отхода', width: 200 },
    { field: 'total_value', headerName: 'Значение', width: 130 },
    { field: 'type_operation', headerName: 'Тип Операции', width: 130 },
  ];

  const rows = reports.map((report, index) => ({
    id: index + 1,
    company_bin: report?.bin_company,
    name_othod: report.name_othod,
    total_value: report.total_value,
    type_operation: report.type_operation,

  }));

  console.log(rows);


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
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          style={{
            width: isMobile ? '100%' : '300px',
            marginBottom: '10px',

          }}
        />
        <TextField
          id="endDateInput"
          label="Конечная дата"
          type="text"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          style={{
            width: isMobile ? '100%' : '300px',
            marginBottom: '10px',
            marginLeft: isMobile? '0px' : '10px'

          }}        />



        <div>
          <p>
            <Button variant="contained" onClick={handleGetReports}>
              Получить отчет
            </Button>
            <Button
              variant="contained"
              onClick={handleExportReports}
              sx={{ marginLeft: '10px', backgroundColor: 'green' }}
            >
              Экспортировать отчет
            </Button>
          <Button
            variant="contained"
            onClick={handleDeleteRecords}
            sx={{ marginLeft: '10px', backgroundColor: 'red' }}
          >
            Удалить записи
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
            pageSizeOptions={[5, 10, 25, 50, 100]}
            checkboxSelection
          />
        </div>
      </Container>
      <Dialog open={confirmDeleteOpen} onClose={() => setConfirmDeleteOpen(false)}>
        <DialogTitle>Подтверждение удаления</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Вы уверены, что хотите удалить записи в указанном диапазоне дат?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDeleteOpen(false)} color="primary">
            Отмена
          </Button>
          <Button onClick={handleConfirmDelete} color="primary" autoFocus>
            Удалить
          </Button>
        </DialogActions>
      </Dialog>

    </Box>
  );
}