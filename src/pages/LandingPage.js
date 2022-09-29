import React from "react";
import NoEditGrid from "../components/NoEditDataGrid";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import Cookies from 'universal-cookie';

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