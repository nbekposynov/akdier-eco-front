"use client"
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { SelectChangeEvent } from '@mui/material';
import { ChangeEvent } from 'react';
import config from '@/config';

const CreateProcessing = () => {
  const [formData, setFormData] = useState({
    company_id: '',
    custom_date: '',
    car_num: '',
    driv_name: '',
    tbo_total: '',
    tbo_food: '',
    tbo_plastic: '',
    tbo_bumaga: '',
    tbo_derevo: '',
    tbo_meshki: '',
    tbo_metal: '',
    tbo_neutil: '',
    bsv: '',
    tpo_total: '',
    tpo_cement: '',
    tpo_drevesn: '',
    tpo_metall_m: '',
    tpo_krishki: '',
    tpo_meshki: '',
    tpo_plastic: '',
    tpo_shini: '',
    tpo_vetosh_fi: '',
    tpo_makul: '',
    tpo_akkum: '',
    tpo_tara_met: '',
    tpo_tara_pol: '',
    po_total: '',
    po_neftesh: '',
    po_zam_gr: '',
    po_bur_shl: '',
    po_obr: '',
    po_him_reag: '',
    custom_factor_tpo_tara_pol: '',
    custom_factor_neftesh: '',
    custom_factor_zam_gr: '',
    custom_factor_bsh: '',
    custom_factor_obr: '',
    custom_factor_him_reag: '',
    custom_factor_tpo_tara_met: '',
    custom_factor_tpo_akkum: '',
    custom_factor_tbo_vetoshfi: '',
    custom_factor_tpo_shini: '',
    custom_factor_tpo_krishki: '',
    custom_factor_tpo_cement: '',
    custom_factor_tbo_meshki: '',
    custom_factor_tbo_derevo: '',
    custom_factor_tbo_bumaga: '',
    custom_factor_tbo_plastic: '',
    custom_factor_tbo_food: ''
  });
  interface Company {
    id: number;
    name: string;
    // Другие свойства компании, если они есть
  }
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null; // Проверка наличия window перед обращением к localStorage
  const [companies, setCompanies] = useState<Company[]>([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.post(`${config.API_BASE_URL}/api/show_companies`, null, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        const companiesData = response.data;
        setCompanies(companiesData);
      } catch (error) {
        console.error('Error fetching company list:', error);
        alert('Ошибка:' + error);
      }
    };
  
    fetchCompanies();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {

    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${config.API_BASE_URL}/api/add_processing`, formData,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 201) {
        const data = response.data;
        alert('Запись успешно добавлена!')
      } else {
        // handle error
      }
    } catch (error) {
      // handle error
      alert(error);
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
  <center> <h2>Добавить отчет</h2>


<form onSubmit={handleSubmit}>

<div>
<div> <TextField
        label="Дата"
        name="custom_date"
        value={formData.custom_date}
        onChange={handleChange}
        margin="normal"
        variant="outlined"
          style={{ width: '700px' }} // Установите нужную ширину в пикселях или других подходящих единиц

      /> </div>
          <Select
            name="company_id"
            value={formData.company_id}
            onChange={handleChange}
            style={{ width: '700px' }} // Установите нужную ширину в пикселях или других подходящих единиц

            required
          >
            {companies.map((company) => (
              <MenuItem key={company.id} value={company.id}>
                {company.name}
              </MenuItem>
            ))}
          </Select>
        </div>

        <div> <TextField
        label="Номер машины"
        name="car_num"
        value={formData.car_num}
        onChange={handleChange}
        margin="normal"
        variant="outlined"
          style={{ width: '700px' }} // Установите нужную ширину в пикселях или других подходящих единиц

      /> </div>

<div> <TextField
        label="Имя Водителя"
        name="driv_name"
        value={formData.driv_name}
        onChange={handleChange}
        margin="normal"
        variant="outlined"
          style={{ width: '700px' }} // Установите нужную ширину в пикселях или других подходящих единиц

      /> </div>

      <div> <TextField
        label="ТБО Всего"
        name="tbo_total"
        value={formData.tbo_total}
        onChange={handleChange}
        margin="normal"
        variant="outlined"
          style={{ width: '700px' }} // Установите нужную ширину в пикселях или других подходящих единиц

      /> </div>


      <div> <TextField
        label="ТБО Пищевые"
        name="tbo_food"
        value={formData.tbo_food}
        onChange={handleChange}
        
        margin="normal"
        variant="outlined"
          style={{ width: '700px' }} // Установите нужную ширину в пикселях или других подходящих единиц

      /> 
      </div>


      <div> <TextField
        label="ТБО Пластик"
        name="tbo_plastic"
        value={formData.tbo_plastic}
        onChange={handleChange}
        margin="normal"
        variant="outlined"
          style={{ width: '700px' }} // Установите нужную ширину в пикселях или других подходящих единиц

      /> </div>


      <div> <TextField
        label="ТБО Бумага"
        name="tbo_bumaga"
        value={formData.tbo_bumaga}
        onChange={handleChange}
        margin="normal"
        variant="outlined"
          style={{ width: '700px' }} // Установите нужную ширину в пикселях или других подходящих единиц

      /> </div>


      <div> <TextField
        label="ТБО Дерево"
        name="tbo_derevo"
        value={formData.tbo_derevo}
        onChange={handleChange}
        margin="normal"
        variant="outlined"
          style={{ width: '700px' }} // Установите нужную ширину в пикселях или других подходящих единиц

      /> </div>


      <div> <TextField
        label="ТБО Мешки"
        name="tbo_meshki"
        value={formData.tbo_meshki}
        onChange={handleChange}
        margin="normal"
        variant="outlined"
          style={{ width: '700px' }} // Установите нужную ширину в пикселях или других подходящих единиц

      /> </div>

      <div> <TextField
        label="ТБО Метал"
        name="tbo_metal"
        value={formData.tbo_metal}
        onChange={handleChange}
        margin="normal"
        variant="outlined"
          style={{ width: '700px' }} // Установите нужную ширину в пикселях или других подходящих единиц

      /> </div>

      <div> <TextField
        label="ТБО Неутиль"
        name="tbo_neutil"
        value={formData.tbo_neutil}
        onChange={handleChange}
        margin="normal"
        variant="outlined"
          style={{ width: '700px' }} // Установите нужную ширину в пикселях или других подходящих единиц

      /> </div>

      <div> <TextField
        label="БСВ"
        name="bsv"
        value={formData.bsv}
        onChange={handleChange}
        margin="normal"
        variant="outlined"
          style={{ width: '700px' }} // Установите нужную ширину в пикселях или других подходящих единиц

      /> </div>

      <div> <TextField
        label="ТПО Цемент"
        name="tpo_cement"
        value={formData.tpo_cement}
        onChange={handleChange}
        margin="normal"
        variant="outlined"
          style={{ width: '700px' }} // Установите нужную ширину в пикселях или других подходящих единиц

      /> </div>

      <div> <TextField
        label="ТПО Древесн"
        name="tpo_drevesn"
        value={formData.tpo_drevesn}
        onChange={handleChange}
        margin="normal"
        variant="outlined"
          style={{ width: '700px' }} // Установите нужную ширину в пикселях или других подходящих единиц

      /> </div>

      <div> <TextField
        label="ТПО Металл М"
        name="tpo_metall_m"
        value={formData.tpo_metall_m}
        onChange={handleChange}
        margin="normal"
        variant="outlined"
          style={{ width: '700px' }} // Установите нужную ширину в пикселях или других подходящих единиц

      /> </div>

      <div> <TextField
        label="ТПО Крышки"
        name="tpo_krishki"
        value={formData.tpo_krishki}
        onChange={handleChange}
        margin="normal"
        variant="outlined"
          style={{ width: '700px' }} // Установите нужную ширину в пикселях или других подходящих единиц

      /> </div>

      <div> <TextField
        label="ТПО Мешки"
        name="tpo_meshki"
        value={formData.tpo_meshki}
        onChange={handleChange}
        margin="normal"
        variant="outlined"
          style={{ width: '700px' }} // Установите нужную ширину в пикселях или других подходящих единиц

      /> </div>

      <div> <TextField
        label="TПО Пластик"
        name="tpo_plastic"
        value={formData.tpo_plastic}
        onChange={handleChange}
        margin="normal"
        variant="outlined"
          style={{ width: '700px' }} // Установите нужную ширину в пикселях или других подходящих единиц

      /> </div>

      <div> <TextField
        label="ТПО Шины"
        name="tpo_shini"
        value={formData.tpo_shini}
        onChange={handleChange}
        margin="normal"
        variant="outlined"
          style={{ width: '350px' }} // Установите нужную ширину в пикселях или других подходящих единиц

      />              <TextField
      label="Коэффициент ТПО Шины"
      name="custom_factor_tpo_shini"
      value={formData.custom_factor_tpo_shini}
      onChange={handleChange}
      margin="normal"
      variant="outlined"
        style={{ width: '350px' }} // Установите нужную ширину в пикселях или других подходящих единиц

    /> </div>

      <div> <TextField
        label="ТПО Ветош ФИ"
        name="tpo_vetosh_fi"
        value={formData.tpo_vetosh_fi}
        onChange={handleChange}
        margin="normal"
        variant="outlined"
          style={{ width: '350px' }} // Установите нужную ширину в пикселях или других подходящих единиц

      /> 
                  <TextField
        label="Коэффициент ТПО Ветош ФИ"
        name="custom_factor_tbo_vetoshfi"
        value={formData.custom_factor_tbo_vetoshfi}
        onChange={handleChange}
        margin="normal"
        variant="outlined"
          style={{ width: '350px' }} // Установите нужную ширину в пикселях или других подходящих единиц

      /> </div>

      <div> <TextField
        label="ТПО Макул"
        name="tpo_makul"
        value={formData.tpo_makul}
        onChange={handleChange}
        margin="normal"
        variant="outlined"
          style={{ width: '700px' }} // Установите нужную ширину в пикселях или других подходящих единиц

      /> </div>

      <div> <TextField
        label="ТПО Аккум"
        name="tpo_akkum"
        value={formData.tpo_akkum}
        onChange={handleChange}
        margin="normal"
        variant="outlined"
          style={{ width: '350px' }} // Установите нужную ширину в пикселях или других подходящих единиц

      /> 
            <TextField
        label="Коэффициент ТПО Аккум"
        name="custom_factor_tpo_akkum"
        value={formData.custom_factor_tpo_akkum}
        onChange={handleChange}
        margin="normal"
        variant="outlined"
          style={{ width: '350px' }} // Установите нужную ширину в пикселях или других подходящих единиц

      /> </div>

      <div> <TextField
        label="ТПО Тара Мет"
        name="tpo_tara_met"
        value={formData.tpo_tara_met}
        onChange={handleChange}
        margin="normal"
        variant="outlined"
          style={{ width: '350px' }} // Установите нужную ширину в пикселях или других подходящих единиц

      /> 
      <TextField
        label="Коэффициент ТПО Тара Мет"
        name="custom_factor_tpo_tara_met"
        value={formData.custom_factor_tpo_tara_met}
        onChange={handleChange}
        margin="normal"
        variant="outlined"
          style={{ width: '350px' }} // Установите нужную ширину в пикселях или других подходящих единиц

      /> 
      
      </div>
      <div> <TextField
        label="ТПО Тара Пол"
        name="tpo_tara_pol"
        value={formData.tpo_tara_pol}
        onChange={handleChange}
        margin="normal"
        variant="outlined"
          style={{ width: '350px' }} // Установите нужную ширину в пикселях или других подходящих единиц

      /> 
      <TextField
        label="Коэффициент ТПО Тара Пол"
        name="custom_factor_tpo_tara_pol"
        value={formData.custom_factor_tpo_tara_pol}
        onChange={handleChange}
        margin="normal"
        variant="outlined"
          style={{ width: '350px' }} // Установите нужную ширину в пикселях или других подходящих единиц

      /> 
      
      </div>


      <div> <TextField
        label="ПО Нефтеш"
        name="po_neftesh"
        value={formData.po_neftesh}
        onChange={handleChange}
        margin="normal"
        variant="outlined"
          style={{ width: '350px' }} // Установите нужную ширину в пикселях или других подходящих единиц

      /> 
      <TextField
        label="Коэффициент ПО Нефтеш"
        name="custom_factor_neftesh"
        value={formData.custom_factor_neftesh}
        onChange={handleChange}
        margin="normal"
        variant="outlined"
          style={{ width: '350px' }} // Установите нужную ширину в пикселях или других подходящих единиц

      />
      
      </div>

<div>
    <TextField
        label="ПО Зам Гр"
        name="po_zam_gr"
        value={formData.po_zam_gr}
        onChange={handleChange}
        margin="normal"
        variant="outlined"
        style={{ width: '350px' }} // Установите нужную ширину в пикселях или других подходящих единиц
        />
    <TextField
        label="Коэффициент ПО Зам Гр"
        name="custom_factor_zam_gr"
        value={formData.custom_factor_zam_gr}
        onChange={handleChange}
        margin="normal"
        variant="outlined"
        style={{ width: '350px' }} // Установите нужную ширину в пикселях или других подходящих единиц
        />
</div>

<div>
    <TextField
        label="ПО Бур Шл"
        name="po_bur_shl"
        value={formData.po_bur_shl}
        onChange={handleChange}
        margin="normal"
        variant="outlined"
        style={{ width: '350px' }} // Установите нужную ширину в пикселях или других подходящих единиц
        />
    <TextField
        label="Коэффициент ПО Бур Шл"
        name="custom_factor_bsh"
        value={formData.custom_factor_bsh}
        onChange={handleChange}
        margin="normal"
        variant="outlined"
        style={{ width: '350px' }} // Установите нужную ширину в пикселях или других подходящих единиц
        />
</div>

<div>
    <TextField
        label="ПО Обр"
        name="po_obr"
        value={formData.po_obr}
        onChange={handleChange}
        margin="normal"
        variant="outlined"
        style={{ width: '350px' }} // Установите нужную ширину в пикселях или других подходящих единиц
        />
    <TextField
        label="Коэффициент ПО Обр"
        name="custom_factor_obr"
        value={formData.custom_factor_obr}
        onChange={handleChange}
        margin="normal"
        variant="outlined"
        style={{ width: '350px' }} // Установите нужную ширину в пикселях или других подходящих единиц
        />
</div>

      <div> 
      <TextField
        label="ПО Хим Реаг"
        name="po_him_reag"
        value={formData.po_him_reag}
        onChange={handleChange}
        margin="normal"
        variant="outlined"
          style={{ width: '350px' }} // Установите нужную ширину в пикселях или других подходящих единиц
      /> 
            <TextField
        label="Коэффициент ПО Хим Реаг"
        name="custom_factor_him_reag"
        value={formData.custom_factor_him_reag}
        onChange={handleChange}
        margin="normal"
        variant="outlined"
          style={{ width: '350px' }} // Установите нужную ширину в пикселях или других подходящих единиц
      /> 

      </div>

      <Button variant="contained" type="submit">Отправить</Button>
    </form>



      </center>
      </Container>
    </Box>
  );
}

export default CreateProcessing