import React from "react";
import NoEditGrid from "../components/noEditDataGrid";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import Cookies from 'universal-cookie';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PageviewIcon from '@mui/icons-material/Pageview';
import CancelIcon from '@mui/icons-material/Close';

const cookies = new Cookies();

const LandingPage = () => {
    let token = cookies.get('input')

    if (token != undefined) {
    return(
        <div>
            <Grid style={{
            display: 'flex',
            justifyContent: 'center',
            height: 'auto',
            width: 'auto',
            margin: '50px',
        }}>
            Welcome! {token[0].FirstName} {token[0].LastName}
        </Grid>

        <Grid style={{
            display: 'flex',
            justifyContent: 'center',
            height: 'auto',
            width: '55%',
            margin: '0 auto',
        }}>
            < NoEditGrid />
        </Grid>
        </div>
    )
    } else {
        return(
            <div>
            <Grid style={{
            display: 'flex',
            justifyContent: 'center',
            height: 'auto',
            width: 'auto',
            margin: '50px',
        }}>
            Welcome! Please log into to access editable attributes
        </Grid>

        <Grid style={{
            display: 'flex',
            justifyContent: 'center',
            height: 'auto',
            width: '55%',
            margin: '0 auto',
        }}>
            < NoEditGrid />
        </Grid>
        </div>
        )
    }
}


export default LandingPage