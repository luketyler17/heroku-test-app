import React, { useState } from 'react';
import { Modal, TextField, Box, Typography } from '@mui/material';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { Card } from '@mui/material'
const cookies = new Cookies();

var bcrypt = require('bcryptjs');


const setCookie = (input) => {
    console.log("Cookie", input)
    let d = new Date();
    d.setTime(d.getTime() + (15 * 60 * 1000));

    cookies.set('input', input, { path: '/', expires: d })
}
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'auto',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const LoginPage = ({ setToken }) => {

    const [createAccount, setCreateAccount] = useState(0)
    const [modalOpen, setModalOpen] = useState(undefined)
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")
    const [verifyPassword, setVerifyPassword] = useState("")
    const [errorFlag, setErrorFlag] = useState(1)
    const [databaseFlag, setDatabaseFlag] = useState(1);
    const [firstName, setFirstname] = useState("")
    const [lastName, setLastname] = useState("")

    let navigate = useNavigate();
    const passwordSalterAccountCreator = (inptPass) => {
        const saltRounds = 10;
        bcrypt.genSalt(saltRounds, function (err, salt) {
            bcrypt.hash(inptPass, salt, function (err, hash) {
                //store in database here
                fetch("https://ussf-z-prefix-tyler-api.herokuapp.com/users", {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        FirstName: firstName,
                        LastName: lastName,
                        Username: username,
                        PasswordHash: hash
                    })
                }).then(data => data.json()).then((data) => {
                    console.log(data)
                    if (data.success) {
                        setModalOpen(true)
                        fetch('https://ussf-z-prefix-tyler-api.herokuapp.com/users')
                            .then(data => data.json())
                            .then(data => setCookie(data.filter(name => name.Username == username)))
                            .then()
                    } else {
                    setDatabaseFlag(406)
                    }
                })
            })
        })
    }

    const modalClose = () => {
        setModalOpen(false)
    }
    const passwordSalterLogin = (inptPass) => {
        console.log(username)
        bcrypt.hash(inptPass, 10, function (err, hash) {
            console.log(hash.length);
            //store in database here
            fetch("https://ussf-z-prefix-tyler-api.herokuapp.com/users/login", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    Username: username,
                })
            }).then((response) =>
                response.json()
            ).then(data => {
                console.log(data)
                bcrypt.compare(inptPass, data[0].PasswordHash, (err, res) => {
                    if (err) {
                        console.log(err)
                    } if (res == true) {
                        setCookie(data);
                        setToken(data)
                        setErrorFlag(0);
                        navigate('/details')
                    } else {
                        setErrorFlag(6);
                    }
                }
                )
            })
        })
    }

    const createAccountToggle = () => {
        if (createAccount == 1) {
            setCreateAccount(0)
        } else {
            setCreateAccount(1)
        }
    }
    const accountCreation = () => {
        if (password != verifyPassword) {
            setErrorFlag(0)
        } else if (username.length < 1 || password.length < 1) {
            setErrorFlag(2)
            console.log(username.length, password.length)
        } else {
            setErrorFlag(1)
            passwordSalterAccountCreator(password)
        }
    }
    const navigateModal = () => {
        navigate('/details')
    }
    const loginHandle = () => {
        passwordSalterLogin(password)
    }
    return (
        <div style={{
            width: '100%',
            height: '100%',
        }}>
            {createAccount == 1 ? (
                <Card elevation={4} style={{
                    width: '50%',
                    margin: '0 auto',
                    marginTop: '15px',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                }}>
                    <h1 style={{
                        width: '50%',
                        display: 'flex',
                        margin: '0 auto',
                        marginTop: '100px',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                    }}>
                        CREATE NEW ACCOUNT
                    </h1>
                    <div style={{
                        width: '25%',
                        display: 'flex',
                        margin: '0 auto',
                        marginTop: '50px',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                    }}>
                        <TextField label="First Name" variant="outlined" required style={{
                            margin: '15px',

                        }}
                            onChange={(e) => setFirstname(e.target.value)}
                        />
                        <TextField label="Last Name" variant="outlined" required style={{
                            margin: '15px',

                        }}
                            onChange={(e) => setLastname(e.target.value)}
                        />
                        <TextField label="Username" variant="outlined" required style={{
                            margin: '15px',

                        }}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <TextField
                            required
                            id="outlined-password-input"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            onChange={(e) => setPassword(e.target.value)}
                            style={{
                                margin: '15px'
                            }}
                        />
                        <TextField
                            required
                            id="outlined-password-input"
                            label="Verify Password"
                            type="Password"
                            autoComplete="current-password"
                            onChange={(e) => setVerifyPassword(e.target.value)}
                            style={{
                                margin: '15px'
                            }}
                        />
                        {errorFlag == 0 ? (<p style={{
                            color: 'red'
                        }}>Error, passwords are not the same</p>) :
                            errorFlag == 2 ? (<p style={{
                                color: 'red'
                            }}>Username or password is not filled</p>) : (<></>)}
                        {databaseFlag == 406 ? (<p style={{
                            color: 'red'
                        }}>Username already exists</p>) : (<></>)}
                    </div>
                    <div style={{
                        width: '35%',
                        display: 'flex',
                        margin: '0 auto',
                        marginTop: '25px',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                    }}>
                        <Button variant="contained" onClick={accountCreation}>Create New Account</Button>
                        <Button variant="contained" style={{
                            margin: '15px',
                            marginBottom: '50px',
                        }}
                            onClick={createAccountToggle}>Back to Login</Button>

                    </div>
                </Card>)
                :
                (
                    <Card elevation={4} style={{
                        width: '50%',
                        margin: '0 auto',
                        marginTop: '15px',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                    }}>
                        <h1 style={{
                        width: '50%',
                        display: 'flex',
                        margin: '0 auto',
                        marginTop: '25px',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                    }}>
                        LOGIN
                    </h1>
                        <div style={{
                            width: '25%',
                            display: 'flex',
                            margin: '0 auto',
                            marginTop: '50px',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                        }}>
                            <TextField label="Username" variant="outlined" required style={{
                                margin: '15px',
                            }}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <TextField
                                id="outlined-password-input"
                                label="Password"
                                type="password"
                                autoComplete="current-password"
                                style={{
                                    margin: '15px'
                                }}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <Button variant="contained" style={{
                                margin: '15px'
                            }}
                                onClick={loginHandle}>Login</Button>
                            {errorFlag == 6 ? (<p>Password was Incorrect</p>) : (<></>)}
                            <Button variant="contained" onClick={createAccountToggle} style={{
                                marginBottom: '50px',
                            }}>Create New Account</Button>
                        </div>
                        
                        </Card>
                        )}
                    {modalOpen === true ? (<Modal
                open={modalOpen}
                onClose={modalClose}
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Account Successfully Created
                    </Typography>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        justifyItems: 'center',
                    }}>
                    <Button onClick={navigateModal}>CONFIRM</Button>
                    </div>
                </Box>
            </Modal>): (<></>)}

                    </div>
                )
            }

            export default LoginPage