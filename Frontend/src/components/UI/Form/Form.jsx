import { Button, Card, CardContent, TextField } from "@mui/material";
import React from "react";
import s from "./Form.module.css"

function Form() {
    return (
        <div className={s.formBlock}>
            <Card component="span"
                sx={{ width: '500px', display: 'inline-block'}}>
                <CardContent>
                    <h1>Авторизация</h1>
                    <form action="">
                        <TextField
                            required
                            id="outlined-required"
                            label="Login"
                        />

                        <TextField
                            id="outlined-password-input"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                        />
                        <Button type="submit" variant="contained">Войти</Button>
                    </form>
                </CardContent>

            </Card>
        </div>
    )
}

export default Form