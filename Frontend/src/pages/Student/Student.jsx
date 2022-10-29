import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CoursesService from "../../API/CoursesService";
import CourseList from "../../components/UI/CourseList/CourseList";
import Navbar from "../../components/UI/Navbar/Navbar";
import s from "./Student.module.css"

function Student({user}){
    const router = useNavigate()
    const [courses, setCourses] = useState([])

    useEffect(() => {
        getCourses()
    }, [])

    async function getCourses(){
        const response = await CoursesService.getAll()
        setCourses(response.splice(0, 3))
    }

    console.log(courses)

    return(
        <div className={s.Student}>
            <ul className={s.StudentNav}>
                <li onClick={() => router("/student/courses/" + user.id)}>
                    <p>Мои курсы</p>
                </li>
                <li>
                    <p onClick={() => router("/catalog")}>Каталог курсов</p>
                </li>
            </ul>
            <div>
                <h1>Популярные курсы</h1>
                <CourseList courses={courses} group = {"Student"} subscribe = {false}/>
            </div>
        </div>
    )
}

export default Student