"use client"
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import React, { useState } from 'react';
import axios from 'axios';
import { DataGrid} from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { saveAs } from 'file-saver';
import config from '@/config';
import { useMediaQuery } from '@mui/material';

export default function Dashboard() {

  interface ProcessingData {
    driv_name: string;
    car_num: string;
  }



  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reports, setReports] = useState<Report[]>([]);
  const [carNum, setCarNum] = useState('');
  const [drivName, setDrivName] = useState('');
  const isMobile = useMediaQuery('(max-width: 1200px)');
  const token = localStorage.getItem('token');


  const handleExportReports = async () => {
    try {
      const response = await axios.get( // Use axios.get instead of axios.post
        `${config.API_BASE_URL}/api/exportByCompany`,
        {
          params: { // Use params to pass query parameters for GET requests
            start_date: startDate,
            end_date: endDate,
            car_num: carNum,
            driv_name: drivName,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: 'blob', // Keep responseType as blob for file download
        }
      );

      saveAs(response.data, 'reports.xlsx');
    } catch (error) {
      console.error(error);
    }
  };

  const handleGetReports = async () => {
    try {
      const response = await axios.get<Report[]>( // Use axios.get instead of axios.post
        `${config.API_BASE_URL}/api/getByDateRangeCompany`,
        {
          params: { // Use params to pass query parameters for GET requests
            start_date: startDate,
            end_date: endDate,
            car_num: carNum,
            driv_name: drivName,
          },
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
    company_name: string;
    tbo_total: number;
    tbo_food: number;
    tbo_plastic: number;
    tbo_bumaga: number;
    tbo_derevo: number;
    tbo_meshki: number;
    tbo_metal: number;
    tbo_neutil: number;
    bsv: number;
    tpo_total: number;
    tpo_cement: number;
    tpo_drevesn: number;
    tpo_metall_m: number;
    tpo_krishki: number;
    tpo_meshki: number;
    tpo_plastic: number;
    tpo_shini: number;
    tpo_vetosh_fi: number;
    tpo_makul: number;
    tpo_akkum: number;
    tpo_tara_met: number;
    tpo_tara_pol: number;
    po_total: number;
    po_neftesh: number;
    po_zam_gr: number;
    po_bur_shl: number;
    po_obr: number;
    po_him_reag: number;
  };
  const columns = [
    { field: 'company_name', headerName: 'Наименование Компании', width: 200 },
    { field: 'tbo_total', headerName: 'ТБО Всего', width: 130 },
    { field: 'tbo_food', headerName: 'ТБО Пищевые', width: 130 },
    { field: 'tbo_plastic', headerName: 'ТБО Пластик', width: 130 },
    { field: 'tbo_bumaga', headerName: 'ТБО Бумага', width: 130 },
    { field: 'tbo_derevo', headerName: 'ТБО Дерево', width: 130 },
    { field: 'tbo_meshki', headerName: 'ТБО Мешки', width: 130 },
    { field: 'tbo_metal', headerName: 'ТБО Метал', width: 130 },
    { field: 'tbo_neutil', headerName: 'ТБО Неутиль', width: 130 },
    { field: 'bsv', headerName: 'БСВ', width: 70 },
    { field: 'tpo_total', headerName: 'ТПО Всего', width: 130 },
    { field: 'tpo_cement', headerName: 'ТПО Цемент', width: 130 },
    { field: 'tpo_drevesn', headerName: 'ТПО Древесн', width: 130 },
    { field: 'tpo_metall_m', headerName: 'ТПО Металл', width: 130 },
    { field: 'tpo_krishki', headerName: 'ТПО Крышки', width: 130 },
    { field: 'tpo_meshki', headerName: 'ТПО Мешки', width: 130 },
    { field: 'tpo_plastic', headerName: 'ТПО Пластик', width: 130 },
    { field: 'tpo_shini', headerName: 'ТПО Шины', width: 130 },
    { field: 'tpo_vetosh_fi', headerName: 'ТПО Ветошь Фи', width: 130 },
    { field: 'tpo_makul', headerName: 'ТПО Макул', width: 130 },
    { field: 'tpo_akkum', headerName: 'ТПО Аккум', width: 130 },
    { field: 'tpo_tara_met', headerName: 'ТПО Тара Мет', width: 130 },
    { field: 'tpo_tara_pol', headerName: 'ТПО Тара Пол', width: 130 },
    { field: 'po_total', headerName: 'ПО Всего', width: 130 },
    { field: 'po_neftesh', headerName: 'ПО Нефтеш', width: 130 },
    { field: 'po_zam_gr', headerName: 'ПО Зам Гр', width: 130 },
    { field: 'po_bur_shl', headerName: 'ПО Бур Шл', width: 130 },
    { field: 'po_obr', headerName: 'ПО Обр', width: 130 },
    { field: 'po_him_reag', headerName: 'ПО Хим Реаг', width: 130 },
  ];

  const rows = reports.map((report, index) => ({
    id: index + 1,
    company_name: report.company_name,
    tbo_total: report.tbo_total,
    tbo_food: report.tbo_food,
    tbo_plastic: report.tbo_plastic,
    tbo_bumaga: report.tbo_bumaga,
    tbo_derevo: report.tbo_derevo,
    tbo_meshki: report.tbo_meshki,
    tbo_metal: report.tbo_metal,
    tbo_neutil: report.tbo_neutil,
    bsv: report.bsv,
    tpo_total: report.tpo_total,
    tpo_cement: report.tpo_cement,
    tpo_drevesn: report.tpo_drevesn,
    tpo_metall_m: report.tpo_metall_m,
    tpo_krishki: report.tpo_krishki,
    tpo_meshki: report.tpo_meshki,
    tpo_plastic: report.tpo_plastic,
    tpo_shini: report.tpo_shini,
    tpo_vetosh_fi: report.tpo_vetosh_fi,
    tpo_makul: report.tpo_makul,
    tpo_akkum: report.tpo_akkum,
    tpo_tara_met: report.tpo_tara_met,
    tpo_tara_pol: report.tpo_tara_pol,
    po_total: report.po_total,
    po_neftesh: report.po_neftesh,
    po_zam_gr: report.po_zam_gr,
    po_bur_shl: report.po_bur_shl,
    po_obr: report.po_obr,
    po_him_reag: report.po_him_reag,
  }));
  
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

        <TextField
          id="carNumInput"
          label="Номер автомобиля"
          value={carNum}
          onChange={(e) => setCarNum(e.target.value)}
          style={{ width: '300px' }}
          sx={{
            width: isMobile ? '100%' : '300px',
            marginBottom: '10px',
            marginLeft: isMobile? '0px' : '10px'


          }}
        />

        <TextField
          id="drivNameInput"
          label="Имя водителя"
          type="text"
          value={drivName}
          onChange={(e) => setDrivName(e.target.value)}
          sx={{
            width: isMobile ? '100%' : '300px',
            marginBottom: '10px',
            marginLeft: isMobile? '0px' : '10px'


          }}        />
    <div><p>
  <Button variant="contained" onClick={handleGetReports}>Получить отчет</Button> 
  <Button variant="contained" onClick={handleExportReports} sx={{ marginLeft: '10px' }}>Экспортировать Отчет</Button>
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
            pageSizeOptions={[5, 10]}
            checkboxSelection
          />
        </div>
      </Container>

    </Box>

 );
}

