import React, { useState, useEffect, useContext } from 'react';
import { Card, Grid } from '@mui/material';
import FullFeaturedCrudGrid from '../components/dataGrid';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import PageviewIcon from '@mui/icons-material/Pageview';
import Dropdown from '../components/dropdown';
import SaveIcon from '@mui/icons-material/Save';

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
    if (token != undefined) {
        return (
            <>
                <Grid style={{
                    display: 'flex',
                    justifyContent: 'center',
                    height: 'auto',
                    width: 'auto',
                    margin: '50px',
                }}>
                    <Card style={{
                        display: 'flex',
                        width: '50%',
                        margin: '0 auto',
                        marginTop: '15px',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                    }}>
                        <h1>Welcome {token[0].FirstName} {token[0].LastName}</h1>
                    </Card>
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
                        <Card style={{
                            width: '100%',
                            padding: '15px',
                            paddingRight: '0px',
                            marginRight: '5px',
                        }}>
                            <p>Edit Item: <EditIcon /></p>
                            <p>View Details: <PageviewIcon /></p>
                            <p>Delete Item: <DeleteIcon /></p>
                            <p>Save Item: <SaveIcon /></p>
                        </Card>
                    </div>
                    <FullFeaturedCrudGrid inputRows={items} token={token} style={{
                        backgroundColor: 'white',
                    }} />
                </Grid>
                <Grid>
                    <Card style={{
                        width: '55%',
                        margin: '0 auto',
                        marginTop: '15px',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        alightText: 'center',
                        marginBottom: '150px'
                    }}>
                        <h1 style={{
                            display: 'flex',
                            alightItems:'center',
                            justifyContent: 'center',
                            alightText: 'center'
                        }}>Choose another user to view: </h1><Dropdown />
                    </Card>
                </Grid>
            </>
        )
    }
    else {
        return (
            <>
                {navigate('/login')}
            </>
        )
    }
}

export default ViewDetails