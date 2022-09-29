import React, { useState } from 'react';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

var bcrypt = require('bcryptjs');


const setCookie = (input) => {
    let d = new Date();
    d.setTime(d.getTime() + (15*60*1000));

    cookies.set('input', input, {path: '/', expires: d})
}

const LoginPage = ({ setToken }) => {

    const [createAccount, setCreateAccount] = useState(0)
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
                console.log(hash.length);
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
                }).then((data) => {
                    setDatabaseFlag(data.status)
                })
            })
        })
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

        const loginHandle = () => {
            passwordSalterLogin(password)
        }
        return (
            <div style={{
                width: '100%',
                height: '100%',
            }}>
                {createAccount == 1 ? (<div style={{
                    width: '25%',
                    display: 'flex',
                    margin: '0 auto',
                    marginTop: '100px',
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
                    <Button variant="contained" onClick={accountCreation}>Create New Account</Button>
                    <Button variant="contained" style={{
                        margin: '15px'
                    }}
                        onClick={createAccountToggle}>Back to Login</Button>

                </div>)
                    :
                    (<div style={{
                        width: '25%',
                        display: 'flex',
                        margin: '0 auto',
                        marginTop: '100px',
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
                        {errorFlag == 6 ? (<p>Password was Incorrect</p>):(<></>)}
                        <Button variant="contained" onClick={createAccountToggle}>Create New Account</Button>
                    </div>)}


            </div>
        )
    }

    export default LoginPage