import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Link from 'next/link';

export const mainListItems = (
  <React.Fragment>
    <ListItemButton>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <Link href="/admin" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', color: '#757575' }}>
      <ListItemText primary="Главная страница" />
      </Link>
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <Link href="/admin/final_processing" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', color: '#757575' }}>
      <ListItemText primary="Таблица 5" />
      </Link>
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <Link href="/admin/moderator" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', color: '#757575' }}>
      <ListItemText primary="Добавить Модератора" />
      </Link>
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <Link href="/admin/edit" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', color: '#757575' }}>
      <ListItemText primary="Изменить отчет" />
      </Link>
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <Link href="/admin/info/moderator" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', color: '#757575' }}>
      <ListItemText primary="Список Филиалов" />
      </Link>
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <Link href="/admin/info/company" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', color: '#757575' }}>
      <ListItemText primary="Список Заказчиков" />
      </Link>
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <Link href="/admin/final_processing/edit" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', color: '#757575' }}>
      <ListItemText primary="Изменить Таблицу 5" />
      </Link>
    </ListItemButton>
  </React.Fragment>
);
