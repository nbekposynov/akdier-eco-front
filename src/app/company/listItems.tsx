import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import Link from 'next/link';

 export const mainListItems = (
  <React.Fragment>
    <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <Link href="/company">
 <ListItemText primary="Главная страница" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', color: '#757575' }} />
      </Link>
    </ListItemButton>
    <ListItemButton>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <Link href="/company/profile" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', color: '#757575' }}>
        <ListItemText primary="Профиль" />
      </Link>
    </ListItemButton>
  </React.Fragment>
);

