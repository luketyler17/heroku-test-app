import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import { useState } from "react"
import { useEffect } from "react"
import DrilledDownGrid from "./drilledDownGrid"
const Dropdown = () => {
    const [name, setName] = useState(undefined)
    const [drilledData, setDrilledData] = useState(undefined)
    const [names, setNames] = useState(undefined)
    useEffect(() => {
        fetch('https://ussf-z-prefix-tyler-api.herokuapp.com/users')
            .then(data => data.json())
            .then(data => setNames(data))
    }, [])
    const handleChange = (event) => {
        let newName = names.filter(newUser => event.target.value == newUser.Username )
        setDrilledData(newName);
    };
    const handleClick = () => {
        setDrilledData(undefined)
    }

    console.log(drilledData);
    return (
        <>
        {(names != undefined) ? (<FormControl fullWidth style={{
                display: 'flex',
                justifyContent: 'center',
                height: 'auto',
                width: '15%',
                margin: '0 auto',
                marginTop: '50px',
                marginBottom: '15px'
            }}
            sx={{
                backgroundColor: 'white'
            }}>
            <InputLabel id="demo-simple-select-label">Other User Table</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={name}
                label="Other_User_Table"
                onChange={(e) => handleChange(e)}
            >
                {names.map(name => <MenuItem value={name.Username}>{name.Username}</MenuItem>)}
            </Select>
        </FormControl>) : (<></>)
        }
        <div style={{
                display: 'flex',
                height: 'auto',
                width: '100%',
                margin: '0 auto',
            }}>{drilledData != undefined ? (<DrilledDownGrid token={drilledData}/>) : (<></>)}</div>
        </>
    )
}

export default Dropdown