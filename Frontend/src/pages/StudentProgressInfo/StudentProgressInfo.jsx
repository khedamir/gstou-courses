import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CoursesService from "../../API/CoursesService";
import s from "./StudentInfo.module.css"

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));


  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  


function StudentProgressInfo(){
    const [student, setStudent] = useState({})
    const [lessons, setLessons] = useState([])
    const [lessonsTest, setLessonsTest] = useState([])
    const [resultLessonsTest, setResultLessonTest] = useState([])



    const params = useParams()

    useEffect(() => {
        getStudentById()
        getLessonByIdCourses()
        getResultByIdStudent()
        getLessonTestsByIdCourse()
    }, [])

    async function getStudentById(){
        const response = await CoursesService.getStudent(params.student_id)
        setStudent(response)
    }

    async function getLessonByIdCourses() {
        const response = await CoursesService.getLessonByIdCourse(params.id)
        setLessons(response)
    }


    async function getLessonTestsByIdCourse() {
        const response = await CoursesService.getTestsByIdCourse(params.id)
        setLessonsTest(response)
    }

    async function getResultByIdStudent() {
        const response = await CoursesService.getResultByIdStudent(params.student_id)
        setResultLessonTest(response.filter(result => result.course === +params.id))
    }
    
    console.log(lessonsTest)
    // console.log(lessons)   

    return(
        <div className={s.StudentProgress}>
            <h1>Информация о прохождении курса</h1>
            <hr />

            <h2>Студент: {student.last_name} {student.name} {student.patronymic}</h2>

            <div>
                <p>Всего уроков в курсе: {lessons.length}</p>
                <p>Пройдено: {resultLessonsTest.length} ({Math.round((resultLessonsTest.length * 100)/lessons.length)}%)</p>

                    <h2>Результаты тестов</h2>
                <table>
                    {lessonsTest.map(test => 
                        <tr key={test.id}>
                            <td>{test.name}</td>
                            <td>
                                {resultLessonsTest.find(result => result.lessonTest === test.id) ? 
                                    (resultLessonsTest.find(result => result.lessonTest === test.id).result) : 
                                    <span>Не пройден</span>}
                            </td>
                        </tr>
                        )}
                </table>
            </div>

        </div>
    )
}

export default StudentProgressInfo