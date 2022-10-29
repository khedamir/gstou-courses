import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CoursesService from "../../API/CoursesService";
import s from './Lesson.module.css'

import Button from '@mui/material/Button';


function Lesson() {
    const [lesson, setLesson] = useState({})
    const params = useParams()

    const router = useNavigate()

    useEffect(() => {
        getLesson()
    }, [])

    async function getLesson() {
        const response = await CoursesService.getLessonById(params.id)
        setLesson(response)
    }

    console.log(lesson)


    return (
        <div className={s.Lesson}>
            {params.subscribe === '1' ?
                <div>
                    <h1>{lesson.name}</h1>
                    <p>{lesson.description}</p>
                    <Button variant="contained" onClick={() => router('/lesson/test/' + params.id)}>Пройти тестирование</Button>

                    <p dangerouslySetInnerHTML={{ __html: lesson.lecture }}></p>
                    <p dangerouslySetInnerHTML={{ __html: lesson.exercise }}></p>
                    <Button variant="contained" onClick={() => router('/lesson/test/' + params.id)}>Пройти тестирование</Button>
                </div>
                :
                <h1>Необходмо сделать подписку на курс</h1>
            }
        </div>
    )
}

export default Lesson