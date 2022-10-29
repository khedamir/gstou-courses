import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CoursesService from "../../API/CoursesService";
import CourseList from "../../components/UI/CourseList/CourseList";
import s from "./StudentCourses.module.css"

function StudentCourses(){
    const [coursesId, setCoursesId] = useState([])
    const [courses, setCourses] = useState([])
    const params = useParams()
    const router = useNavigate()


    useEffect(() => {
        getCoursesById()
    }, [])

    useEffect(() => {
        getAllCourses()
    }, [coursesId])

    async function getCoursesById() {
        const response = await CoursesService.getCoursesByIdStudent(params.id)
        setCoursesId(response)
    }

    async function getAllCourses() {
        const response = await CoursesService.getAll(params.id)
        setCourses(response.filter(course => {
            for(let i = 0; i < coursesId.length; i++){
                if(coursesId[i].course === course.id){
                    return true
                }
            }
            return false
        }))
    }
    
    console.log(courses)

    return(
        <div className={s.StudentCourses}>
            <h1>Активные курсы</h1>
            <CourseList router={router} courses = {courses} subscribe={1}/>

        </div>
    )
}

export default StudentCourses;