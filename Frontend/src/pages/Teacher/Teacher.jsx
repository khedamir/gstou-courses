import { Button } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CoursesService from "../../API/CoursesService";
import CourseList from "../../components/UI/CourseList/CourseList";
import s from "./Teacher.module.css"

function Teacher({user}){
    const [courses, setCourses] = useState([])

    const router = useNavigate()

    useEffect(() => {
        getCourses()
    }, [])
    
    async function getCourses(){
        const response = await CoursesService.getCoursesByIdTeacher(user.id)
        setCourses(response)
    }



    return(
        <div className={s.teacher}>
            <header>
                <h1>Мои курсы</h1> 
                <Button onClick={() => router('add-course/')} className={s.headerButton} variant="contained">Добавить курс</Button>
            </header>
            <CourseList router = {router} courses = {courses} subscribe = {1} group = {user.group}/>
        </div>
    )
}


export default Teacher;