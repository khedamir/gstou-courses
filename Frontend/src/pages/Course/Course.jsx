import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CoursesService from "../../API/CoursesService";
import s from "./Course.module.css"

import LessonsList from "../../components/UI/LessonsList/LessonsList";


import Button from '@mui/material/Button';


function Course(){
    const [course, setCourse] = useState({})
    const [teacher, setTeacher] = useState({})
    const [lessons, setLessons] = useState([])
    const params = useParams()

    const router = useNavigate()
    

    const category = [
        'Институт прикладных информационных технологий',
        'Институт строительства архитектуры и дизайна',
        'Институт нефти и газа',
        'Институт энергетики',
        'Институт цифровой экономики и технологического предпринимательства',
    ]

    useEffect(() => {
        getCourseById()
        getLessonByIdCourse()
    }, [])


    useEffect(() => {
        getTeacher()
    }, [course])

    async function getCourseById() {
        const response = await CoursesService.getById(params.id)
        setCourse(response)
    }

    async function getLessonByIdCourse() {
        const response = await CoursesService.getLessonByIdCourse(params.id)
        setLessons(response)
    }


    async function getTeacher() {
        const response = await CoursesService.getTeacher(course.teacher)
        setTeacher(response)
    }

    console.log(teacher)


    return (
        <div className={s.Course}>
            <header className={s.header}>
                <h4>{category[course.category - 1]}</h4>
                <h1>{course.name}</h1>
                <p>{course.description}</p>
                <p>{course.date}</p>
                <div className={s.headerSection}>
                    <h3>Преподаватель: {teacher.last_name} {teacher.name} {teacher.patronymic}</h3>
                    <Button variant="contained">Записаться</Button>
                </div>
            </header>

       
            <LessonsList lessons={lessons} router={router} params = {params}/>

            {/* <div className={s.lessonItems}>
                {lessons.map((lesson, id) => 
                    <div className={s.lessonItem} key={id} onClick={() => router("/lesson/" + lesson.id  + "/" + params.subscribe)}>
                        <h2>{lesson.name}</h2>
                        <p>{lesson.description}</p>
                    </div>
                )}
            </div> */}
        </div>
    )
}

export default Course