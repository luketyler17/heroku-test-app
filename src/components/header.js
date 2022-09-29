import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';


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
          >Home</Button>
          {token == undefined ? (<Button color="inherit"
          onClick={navigateLoginHandle}
          >Login</Button>) : (<><Button color="inherit" onClick={handleDetails}>Details</Button><Button color="inherit" onClick={removeCookie}>LOG OUT</Button></>)}
        </Toolbar>
      </AppBar>
    </Box>
  );
}