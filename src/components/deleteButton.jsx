import React, { useState, useEffect, useContext } from 'react';
import { Button } from '@mui/material';
import { AiFillCloseCircle } from 'react-icons/ai'
import { TextField } from '@mui/material';
import { Input } from '@mui/material';


const DeleteButton = ( {token }) => {
    const [addToggle, setAddToggle] = useState(undefined)
    const [quantity1, setQuantity] = useState(undefined)
    const [description1, setDescription] = useState(undefined)
    const [itemName1, setitemName] = useState(undefined)
    const [usrId, setUsrId] = useState(undefined)
    const [dbToggle, setdbToggle] = useState(undefined)
    console.log(token[0])
    const addNewItem = () => {
        if (addToggle == undefined) {
            setAddToggle(1)
            setUsrId(token[0].id)
        } else {
            setAddToggle(undefined)
        }
    }
    const handleQuantity = (e) => {
        setQuantity(e.target.value)
    }
    const handleDescription = (e) => {
        setDescription(e.target.value)
    }
    const handleItemName = (e) => {
        setitemName(e.target.value)
    }
    const sendEntry = () => {
        fetch("https://ussf-z-prefix-tyler-api.herokuapp.com/inventory", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    UserId: token[0].id,
                    Quantity: quantity1,
                    ItemName: itemName1,
                    Description: description1
                })
            }).then(res => res.json())
            .then(data => 
                {
                    if (data.success) {
                        setdbToggle(0);
                    } else {
                        setdbToggle(1)
                    }
                })
    }
    console.log(quantity1, itemName1, description1)
    return(
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            margin: '15px',
            width: '100%',
        }}>
            <Button variant="outlined"
                onClick={addNewItem}
            >Delete Item {addToggle ? <AiFillCloseCircle style={{
                margin: '5px'
            }} /> : <></>}</Button>
            {addToggle ? (<div style={{
                display: 'inline-block',
                justifyContent: 'center',
                margin: '15px',
                width: '35%',
            }}>
                <TextField id="filled-basic" label="Item Name" variant="filled" 
                onChange={handleItemName}
                />
                <TextField type="number" id="filled-basic" label="Quantity" variant="filled" 
                onChange={handleQuantity}/>
                <TextField
                    id="filled-multiline-static"
                    label="Description"
                    multiline
                    rows={4}
                    variant="filled"
                    style={{
                        width: '75%'
                    }}
                    onChange={handleDescription}

                />
                <Button style={{
                    marginTop: '15px',

                }} 
                onClick={sendEntry}
                variant="contained">Confirm</Button>
                {dbToggle == 0 ? (<p>Entry created Successfullly</p>): dbToggle == 1 ? (<p>Error creating entry, may already exist within database</p>) : (<></>)}


            </div>) : (<></>)}
        </div>
    )
}

export default DeleteButton