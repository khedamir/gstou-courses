import { Button, TextField } from "@mui/material";
import React from "react";
import { useState } from "react";

import LessonsList from "../../components/UI/LessonsList/LessonsList";

import s from './AddCourse.module.css'

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';




function AddCourse(){
    const [course, setCourse] = useState({
        link: '',
        name: '',
        description: '',
        category: '',
    })

    const category = [
        'Институт прикладных информационных технологий',
        'Институт строительства архитектуры и дизайна',
        'Институт нефти и газа',
        'Институт энергетики',
        'Институт цифровой экономики и технологического предпринимательства',
    ]

    const [courseForm, setCourseForm] = useState({})
    const [lessonForm, setLessonForm] = useState({display: 'none'})

    const [lessons, setLessons] = useState([])



    const [lessonInput, setLessonInput] = useState({
        name: '',
        description: '',
        lecture: '',
        exercise: ''
    })

    function forForm(){
        setCourseForm({
            display: 'none'
        })

        setLessonForm({
            display: 'block'
        })
    }

    function setLessonButton(){
        setLessons([...lessons, {
            name: lessonInput.name, 
            description: lessonInput.description, 
            lecture: lessonInput.lecture, 
            exercise: lessonInput.exercise
        }])


        let a = {
            name: '',
            description: '',
            lecture: '',
            exercise: '',
        }

        setLessonInput(a)
        debugger
        console.log(lessonInput)
    }

    return(
        <div className={s.AddCourse}>
            <h1>Заполните форму, чтобы создать курс</h1>
            <form className={s.courseForm} style={courseForm} action="">
                <label htmlFor="">Скопируйте сюда ссылку на изображение</label>
                <TextField type="text" value={course.link} onChange={(e) => setCourse({...course, link: e.target.value})} />

                <label htmlFor="">Название курса</label>
                <TextField type="text" value={course.name} onChange={(e) => setCourse({...course, name: e.target.value})} />

                <label htmlFor="">Описание курса</label>
                <TextField rows={6} multiline value={course.description} onChange={(e) => setCourse({...course, description: e.target.value})}></TextField>

                <Button onClick={() => forForm()}>Перейти дальше</Button>
            </form>


            <div className={s.lessonFrom} style={lessonForm}>
                <header>
                    <h1>{course.name}</h1>
                    <p>{course.description}</p>
                </header>

                <LessonsList lessons={lessons} />
                

                <form action="">
                    <label htmlFor="">Название урока</label>
                    <TextField type="text" value={lessonInput.name} onChange={(e) => setLessonInput({...lessonInput, name: e.target.value})} />

                    <label htmlFor="">Описание урока</label>
                    <TextField rows={6} multiline type="text" value={lessonInput.description} onChange={(e) => setLessonInput({...lessonInput, description: e.target.value})} />

                    <label htmlFor="">Лекция</label>
                    <CKEditor data={lessonInput.lecture} editor = {ClassicEditor} onChange={(e, editor) => setLessonInput({...lessonInput, lecture: editor.getData()})} />

                    <label htmlFor="">Домашнее задание</label>
                    <CKEditor data={lessonInput.exercise} editor = {ClassicEditor} onChange={(e, editor) => setLessonInput({...lessonInput, exercise: editor.getData()})} />

                    <Button onClick={setLessonButton}>Добавить урок</Button>
                </form>
                
            </div>
                <button  className={s.ButtonPublish}>Опубликовать курс</button>
        </div>
    )
}

export default AddCourse;