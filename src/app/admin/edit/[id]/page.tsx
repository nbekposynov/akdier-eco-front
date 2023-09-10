"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import config from '@/config';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { Router } from 'next/router';


interface ProcessingData {
  
  car_num: string;
  driv_name: string;
  tbo_total: string;
  tbo_food: string;
  tbo_plastic: string;
  tbo_bumaga: string;
  tbo_derevo: string;
  tbo_meshki: string;
  tbo_metal: string;
  tbo_neutil: string;
  bsv: string;
  tpo_total: string;
  tpo_cement: string;
  tpo_drevesn: string;
  tpo_metall_m: string;
  tpo_krishki: string;
  tpo_meshki: string;
  tpo_plastic: string;
  tpo_shini: string;
  tpo_vetosh_fi: string;
  tpo_makul: string;
  tpo_akkum: string;
  tpo_tara_met: string;
  tpo_tara_pol: string;
  po_total: string;
  po_neftesh: string;
  po_zam_gr: string;
  po_bur_shl: string;
  po_obr: string;
  po_him_reag: string;
  }

  
  const UpdateProcessing = () => {
    const { id } = useParams()
    const token = localStorage.getItem('token');

    const [data, setData] = useState<ProcessingData>({
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
    po_him_reag: '', });

    const router = useRouter();

    const handleButtonClick = () => {
      // Действия при клике на кнопку
      // Например, можно перенаправить на динамическую страницу
      router.push(`/admin/edit/${id}`);
    };
    
    const [response, setResponse] = useState<string>("");

    useEffect(() => {
      if (id) {
        axios
          .post(
            `${config.API_BASE_URL}/api/show_processing/${id}`,
            {}, // пустое тело запроса
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
        const response = await axios.post(`${config.API_BASE_URL}/api/updateById/${id}`, data,        {headers: {
          Authorization: `Bearer ${token}`,
        },
      });
        setResponse(JSON.stringify(response.data));
        alert('Данные успешно обновлены');
      } catch (error: any) {
        setResponse(JSON.stringify(error.response.data));
        alert(error);
      }
    };


    return (
      <center>
      <div>
        <form onSubmit={handleSubmit}>
        <div style={{marginTop:'60px'}}>
        <h1>Update Processing</h1>
        <TextField
        label="Номер машины"
        name="car_num"
        value={data.car_num}
        onChange={handleChange}
        margin="normal"
        variant="outlined"
          style={{ width: '700px' }} // Установите нужную ширину в пикселях или других подходящих единиц

      /> </div>

<div> <TextField
        label="Имя Водителя"
        name="driv_name"
        value={data.driv_name}
        onChange={handleChange}
        margin="normal"
        variant="outlined"
          style={{ width: '700px' }} // Установите нужную ширину в пикселях или других подходящих единиц

      /> </div>

      <div> <TextField
        label="ТБО Всего"
        name="tbo_total"
        value={data.tbo_total}
        onChange={handleChange}
        margin="normal"
        variant="outlined"
          style={{ width: '700px' }} // Установите нужную ширину в пикселях или других подходящих единиц

      /> </div>


      <div> <TextField
        label="ТБО Пищевые"
        name="tbo_food"
        value={data.tbo_food}
        onChange={handleChange}
        
        margin="normal"
        variant="outlined"
          style={{ width: '700px' }} // Установите нужную ширину в пикселях или других подходящих единиц

      /> 
      </div>


      <div> <TextField
        label="ТБО Пластик"
        name="tbo_plastic"
        value={data.tbo_plastic}
        onChange={handleChange}
        margin="normal"
        variant="outlined"
          style={{ width: '700px' }} // Установите нужную ширину в пикселях или других подходящих единиц

      /> </div>


      <div> <TextField
        label="ТБО Бумага"
        name="tbo_bumaga"
        value={data.tbo_bumaga}
        onChange={handleChange}
        margin="normal"
        variant="outlined"
          style={{ width: '700px' }} // Установите нужную ширину в пикселях или других подходящих единиц

      /> </div>


      <div> <TextField
        label="ТБО Дерево"
        name="tbo_derevo"
        value={data.tbo_derevo}
        onChange={handleChange}
        margin="normal"
        variant="outlined"
          style={{ width: '700px' }} // Установите нужную ширину в пикселях или других подходящих единиц

      /> </div>


      <div> <TextField
        label="ТБО Мешки"
        name="tbo_meshki"
        value={data.tbo_meshki}
        onChange={handleChange}
        margin="normal"
        variant="outlined"
          style={{ width: '700px' }} // Установите нужную ширину в пикселях или других подходящих единиц

      /> </div>

      <div> <TextField
        label="ТБО Метал"
        name="tbo_metal"
        value={data.tbo_metal}
        onChange={handleChange}
        margin="normal"
        variant="outlined"
          style={{ width: '700px' }} // Установите нужную ширину в пикселях или других подходящих единиц

      /> </div>

      <div> <TextField
        label="ТБО Неутиль"
        name="tbo_neutil"
        value={data.tbo_neutil}
        onChange={handleChange}
        margin="normal"
        variant="outlined"
          style={{ width: '700px' }} // Установите нужную ширину в пикселях или других подходящих единиц

      /> </div>

      <div> <TextField
        label="БСВ"
        name="bsv"
        value={data.bsv}
        onChange={handleChange}
        margin="normal"
        variant="outlined"
          style={{ width: '700px' }} // Установите нужную ширину в пикселях или других подходящих единиц

      /> </div>

      <div> <TextField
        label="ТПО Всего"
        name="tpo_total"
        value={data.tpo_total}
        onChange={handleChange}
        margin="normal"
        variant="outlined"
          style={{ width: '700px' }} // Установите нужную ширину в пикселях или других подходящих единиц

      /> </div>

      <div> <TextField
        label="ТПО Цемент"
        name="tpo_cement"
        value={data.tpo_cement}
        onChange={handleChange}
        margin="normal"
        variant="outlined"
          style={{ width: '700px' }} // Установите нужную ширину в пикселях или других подходящих единиц

      /> </div>

      <div> <TextField
        label="ТПО Древесн"
        name="tpo_drevesn"
        value={data.tpo_drevesn}
        onChange={handleChange}
        margin="normal"
        variant="outlined"
          style={{ width: '700px' }} // Установите нужную ширину в пикселях или других подходящих единиц

      /> </div>

      <div> <TextField
        label="ТПО Металл М"
        name="tpo_metall_m"
        value={data.tpo_metall_m}
        onChange={handleChange}
        margin="normal"
        variant="outlined"
          style={{ width: '700px' }} // Установите нужную ширину в пикселях или других подходящих единиц

      /> </div>

      <div> <TextField
        label="ТПО Крышки"
        name="tpo_krishki"
        value={data.tpo_krishki}
        onChange={handleChange}
        margin="normal"
        variant="outlined"
          style={{ width: '700px' }} // Установите нужную ширину в пикселях или других подходящих единиц

      /> </div>

      <div> <TextField
        label="ТПО Мешки"
        name="tpo_meshki"
        value={data.tpo_meshki}
        onChange={handleChange}
        margin="normal"
        variant="outlined"
          style={{ width: '700px' }} // Установите нужную ширину в пикселях или других подходящих единиц

      /> </div>

      <div> <TextField
        label="TПО Пластик"
        name="tpo_plastic"
        value={data.tpo_plastic}
        onChange={handleChange}
        margin="normal"
        variant="outlined"
          style={{ width: '700px' }} // Установите нужную ширину в пикселях или других подходящих единиц

      /> </div>

      <div> <TextField
        label="ТПО Шины"
        name="tpo_shini"
        value={data.tpo_shini}
        onChange={handleChange}
        margin="normal"
        variant="outlined"
          style={{ width: '700px' }} // Установите нужную ширину в пикселях или других подходящих единиц

      /> </div>

      <div> <TextField
        label="ТПО Ветош ФИ"
        name="tpo_vetosh_fi"
        value={data.tpo_vetosh_fi}
        onChange={handleChange}
        margin="normal"
        variant="outlined"
          style={{ width: '700px' }} // Установите нужную ширину в пикселях или других подходящих единиц

      /> </div>

      <div> <TextField
        label="ТПО Макул"
        name="tpo_makul"
        value={data.tpo_makul}
        onChange={handleChange}
        margin="normal"
        variant="outlined"
          style={{ width: '700px' }} // Установите нужную ширину в пикселях или других подходящих единиц

      /> </div>

      <div> <TextField
        label="ТПО Аккум"
        name="tpo_akkum"
        value={data.tpo_akkum}
        onChange={handleChange}
        margin="normal"
        variant="outlined"
          style={{ width: '700px' }} // Установите нужную ширину в пикселях или других подходящих единиц

      /> </div>

      <div> <TextField
        label="ТПО Тара Мет"
        name="tpo_tara_met"
        value={data.tpo_tara_met}
        onChange={handleChange}
        margin="normal"
        variant="outlined"
          style={{ width: '700px' }} // Установите нужную ширину в пикселях или других подходящих единиц

      /> </div>

      <div> <TextField
        label="ТПО Тара Пол"
        name="tpo_tara_pol"
        value={data.tpo_tara_pol}
        onChange={handleChange}
        margin="normal"
        variant="outlined"
          style={{ width: '700px' }} // Установите нужную ширину в пикселях или других подходящих единиц

      /> </div>

      <div> <TextField
        label="ПО Всего"
        name="po_total"
        value={data.po_total}
        onChange={handleChange}
        margin="normal"
        variant="outlined"
          style={{ width: '700px' }} // Установите нужную ширину в пикселях или других подходящих единиц

        sx={{Width: '300px'}}
      /> </div>

      <div> <TextField
        label="ПО Нефтеш"
        name="po_neftesh"
        value={data.po_neftesh}
        onChange={handleChange}
        margin="normal"
        variant="outlined"
          style={{ width: '700px' }} // Установите нужную ширину в пикселях или других подходящих единиц

      /> </div>

      <div> <TextField
        label="ПО Зам Гр"
        name="po_zam_gr"
        value={data.po_zam_gr}
        onChange={handleChange}
        margin="normal"
        variant="outlined"
          style={{ width: '700px' }} // Установите нужную ширину в пикселях или других подходящих единиц

      /> </div>

      <div> <TextField
        label="ПО Бур Шл"
        name="po_bur_shl"
        value={data.po_bur_shl}
        onChange={handleChange}
        margin="normal"
        variant="outlined"
          style={{ width: '700px' }} // Установите нужную ширину в пикселях или других подходящих единиц

      /> </div>

      <div> <TextField
        label="ПО Обр"
        name="po_obr"
        value={data.po_obr}
        onChange={handleChange}
        margin="normal"
        variant="outlined"
          style={{ width: '700px' }} // Установите нужную ширину в пикселях или других подходящих единиц

      /> </div>

      <div> <TextField
        label="ПО Хим Реаг"
        name="po_him_reag"
        value={data.po_him_reag}
        onChange={handleChange}
        margin="normal"
        variant="outlined"
          style={{ width: '700px' }} // Установите нужную ширину в пикселях или других подходящих единиц

      /> </div>
          <br />
          <Button variant="contained" type="submit">Отправить</Button>
        </form>
      </div>
      </center>
    );
  };

  export default UpdateProcessing;