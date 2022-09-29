import logo from '../logo.svg';
import { Grid } from '@mui/material';
import NoEditGrid from './noEditDataGrid';

const HomePage = () => {
    return (
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

export default HomePage