import React from "react";
import { Link } from "react-router-dom";
import s from "./Main.module.css"

import { CardActionArea } from '@mui/material';
import Navbar from "../../components/UI/Navbar/Navbar";

import main from './main.jpeg'


function Main() {
    return (
        <div className={s.Main} >
            <header  className={s.mainHeader}>
                <h1 className={s.mainTitle} >Образовательная платформа для курсов ГГНТУ</h1>
            </header>

            <ul className={s.mainItems} >
                <li className={s.mainItem}>
                    <CardActionArea>
                        <Link to="/catalog">Каталог курсов</Link>
                    </CardActionArea>
                </li>

                <li className={s.mainItem}>
                    <CardActionArea>
                        <Link to="/login">Студентам</Link>
                    </CardActionArea>
                </li>

                <li className={s.mainItem}>
                    <CardActionArea>
                        <Link to="/login">Преподавателям</Link>
                    </CardActionArea>
                </li>

            </ul>
        </div>
    )
}

export default Main;