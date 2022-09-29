import React, { useState, useEffect, useContext } from 'react';
import { Grid } from '@mui/material';
import FullFeaturedCrudGrid from '../components/dataGrid';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import PageviewIcon from '@mui/icons-material/Pageview';
import Dropdown from '../components/dropdown';

const ViewDetails = () => {
    const cookies = new Cookies();
    let token = cookies.get('input')
    console.log(token)
    let navigate = useNavigate();
    const [items, setItems] = useState(undefined)
    const [useEffectChange, setUseEffectChange] = useState(0)
    useEffect(() => {
        fetch('https://ussf-z-prefix-tyler-api.herokuapp.com/inventory/seeitem', {
            method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    UserId: token[0].id
                })
            }
            ).then(res => res.json())
            .then(data => setItems(data))
    }, [])
    if(token != undefined) {
    return (
        <>
        <Grid style={{
            display: 'flex',
            justifyContent: 'center',
            height: 'auto',
            width: 'auto',
            margin: '50px',
        }}>
            <div style={{
                alightText: 'center'
            }}>
            <p>Welcome {token[0].FirstName} {token[0].LastName}</p>
            </div>
        </Grid>
        
        <Grid style={{
            display: 'flex',
            justifyContent: 'center',
            height: 'auto',
            width: '85%',
            margin: '0 auto',
        }}>
            <div style={{
            margin: '50px',
            justifyContent: 'center',
            alightText: 'center',
            width: '10%',
        }}>
                <p>Edit Item: <EditIcon/></p>
                <p>View Details: <PageviewIcon/></p>
                <p>Delete Item: <DeleteIcon/></p>
        </div>
        <FullFeaturedCrudGrid inputRows={items} token={token} style={{
            backgroundColor: 'white',
        }}/>
        </Grid> 
        <Grid>
        <Dropdown /> 
        </Grid>  
        </>
    )
    }
    else {
        return(
            <>
            {navigate('/login')}
            </>
        )
    }
}

export default ViewDetails