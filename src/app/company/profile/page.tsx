"use client"
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import config from '@/config';
import './style.css'
import 'bootstrap/dist/css/bootstrap.css';

interface Company {
  id: number;
  name: string;
  email: string;
  bin_company: string,
  description: string
  // Другие свойства компании
}

const CompanyProfile = () => {
  const [company, setCompany] = useState<Company | null>(null);
  
  useEffect(() => {
    if (typeof window !== 'undefined') { // Проверка наличия window
      const token = localStorage.getItem('token');
      
      const fetchCompanyData = async () => {
        try {
          const response = await axios.get(`${config.API_BASE_URL}/api/getCompanyById`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setCompany(response.data);
        } catch (error) {
          console.error('Error fetching company data:', error);
        }
      };
  
      fetchCompanyData();
    }
  }, []);

  if (!company) {
    return <div>Loading...</div>;
  }

  return (
    <Box
      component="main"
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
      }}
    >
      <Toolbar />
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}></Grid>
        <center><h2>Профиль Компании</h2></center>
        <section className="background-section">
  <div className="container py-5">
    <div className="row">
      <div className="col-lg-4">
        <div className="card mb-4">
          <div className="card-body text-center">
            <img
              src="https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
              alt="avatar"
              className="rounded-circle img-fluid"
              style={{ width: '300px' }}
            />
            <h5 className="my-3">{company.name}</h5>
            <p className="text-muted mb-1">{company.email}</p>
            {/* <p className="text-muted mb-4">{company.bin_company}</p> */}
            {/* <p className="text-muted mb-4">{company.description}</p> */}
          </div>
        </div>
      </div>
      <div className="col-lg-8">
        <div className="card mb-4">
          <div className="card-body">
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Наименование компании</p>
              </div>
              <div className="col-sm-9">
                <p className="text-muted mb-0">{company.name}</p>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Email</p>
              </div>
              <div className="col-sm-9">
                <p className="text-muted mb-0">{company.email}</p>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">БИН Компании</p>
              </div>
              <div className="col-sm-9">
                <p className="text-muted mb-0">{company.bin_company}</p>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Описание</p>
              </div>
              <div className="col-sm-9">
                <p className="text-muted mb-0">{company.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
      </Container>
    </Box>
  );
};

export default CompanyProfile;