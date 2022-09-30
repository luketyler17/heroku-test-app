import React from "react";
import NoEditGrid from "../components/NoEditDataGrid";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import Cookies from 'universal-cookie';
import { Card } from "@mui/material";

const cookies = new Cookies();

const LandingPage = () => {
    let token = cookies.get('input')

    if (token != undefined) {
        return (
            <div>
                <Grid style={{
                    display: 'flex',
                    justifyContent: 'center',
                    height: 'auto',
                    width: 'auto',
                    margin: '50px',
                }}>
                    <Card style={{
                    width: '55%',
                    height: 'auto',
                    display: 'flex',
                    justifyContent: 'center',
                    verticalAlign: 'center',
                    paddingTop: '15px',
                    flexWrap: 'wrap',
                   }}><h1 style={{}}>Inventory Tracker 5000</h1> 
                   <div style={{flexBasis: '100%'}}></div>
                       <p>Welcome! {token[0].FirstName} {token[0].LastName}</p></Card>
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
        return (
            <div>
                <Grid style={{
                    display: 'flex',
                    justifyContent: 'center',
                    height: 'auto',
                    width: 'auto',
                    margin: '50px',
                }}>
                   <Card style={{
                    width: '55%',
                    height: 'auto',
                    display: 'flex',
                    justifyContent: 'center',
                    verticalAlign: 'center',
                    paddingTop: '15px',
                    flexWrap: 'wrap',
                   }}> <h1 style={{}}>Inventory Tracker 5000</h1> 
                    <div style={{flexBasis: '100%'}}></div>
                        <p>Welcome! Please log into to edit attributes</p></Card>
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