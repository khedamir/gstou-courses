import React from "react";
// import Form from "../../components/UI/Form/Form";
import Navbar from "../../components/UI/Navbar/Navbar";
import s from "./Login.module.css"
import { Button, Card, CardContent, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


function Login({user}) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const router = useNavigate()

    const submit = async (e) => {
        e.preventDefault();
        console.log(username, password)

        // debugger
        // const response = await fetch('http://127.0.0.1:8000/api/login?username=' + username + "&password=" + password, {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' }
        // });

        const response = await fetch('http://127.0.0.1:8000/api/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({
                username,
                password
            })
        });

        const content = await response.json();
        console.log(content)
    }


    function routerTo(){
        if(user.group == "Teacher"){
            router('/teacher')
        }else{
            router('/student')
        }
    }


    return (
        <div className={s.Login}>
            <Navbar />

            <div className={s.formBlock}>
                <Card component="span" sx={{ width: '500px', display: 'inline-block' }}>
                    <CardContent>
                        <h1>Авторизация</h1>
                        <form onSubmit={submit}>
                            <TextField
                                onChange={e => setUsername(e.target.value)}
                                required
                                id="outlined-required"
                                label="Login"
                            />

                            <TextField
                                onChange={e => setPassword(e.target.value)}
                                id="outlined-password-input"
                                label="Password"
                                type="password"
                                autoComplete="current-password"
                            />
                            <Button onClick={() => routerTo()} type="submit" variant="contained">Войти</Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default Login