import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import {Typography} from '@mui/material'

export default function Header() {
    const cookies = new Cookies();
    var token = cookies.get('input')
    let navigate = useNavigate()
    const navigateLoginHandle = () => {
        navigate('/login')
    }
    const navigateHome = () => {
        navigate('/');
    }
    const handleDetails = () => {
        navigate('/details')
    }
    const removeCookie = () => {
        cookies.remove('input', {path: '/'})
        navigate('/')
        window.location.reload(true);
    }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
        <Button color="inherit"
          onClick={navigateHome}
          style={{
          }}
          >Home</Button>
          {token == undefined ? (<Button color="inherit"
          onClick={navigateLoginHandle}
          >Login</Button>) : (<><Button color="inherit" onClick={handleDetails} style={{
          }}>Details</Button><Button color="inherit" onClick={removeCookie} style={{
            width: 'min-content'
          }}>LOG OUT</Button></>)}
          <div style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'center',
            alightItems: 'center',
          }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}style={{
            alignText: 'center',
            width: '100%'
          }}>
            Inventory Tracker 10.00.01
          </Typography>
            </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}