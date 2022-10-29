import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CoursesService from "../../API/CoursesService";
import s from "./CourseInfo.module.css"
import Button from '@mui/material/Button'


function TeacherCoursesInfo(){
    const [group, setGroup] = useState({})
    const [students, setStudents] = useState([])
    const [course, setCourse] = useState([])

    const router = useNavigate()


    const params = useParams()

    useEffect(() => {
        getStudentGroup()
        getCourse()
    }, [])


    useEffect(() => {
        getStudents()
    }, [group])



    async function getStudentGroup(){
        const response = await CoursesService.getGroupByIdCourse(params.id)
        setGroup(response)
    }

    async function getCourse(){
        const response = await CoursesService.getById(params.id)
        setCourse(response)
    }

    async function getStudents(){
        const response = await CoursesService.getStudents()
        setStudents(response.filter(student => {
            for(let i = 0; i < group.length; i++){
                if(student.id === group[i].student){
                    return true
                }
            }
            return false
        }))
    }

    console.log(students)


    return(
        <div className={s.CourseInfo}>
            <h1>{course.name}</h1>
            <hr />
            <h2>Группа</h2>
            <ol className={s.Items}>
                {students.map((student, id) =>
                    <li className={s.Item} key={student.id}>
                        <p>{id+1}. {student.last_name} {student.name} {student.patronymic}</p>
                        <Button variant="text" onClick = {() => router("student/" + student.id)}>Посмотреть прогресс</Button>
                    </li>
                )}
            </ol>
        </div>
    )   
}

export default TeacherCoursesInfo