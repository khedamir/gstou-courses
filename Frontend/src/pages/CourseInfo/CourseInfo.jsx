import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import CoursesService from "../../API/CoursesService";
import s from './CourseInfo.module.css'

function CourseInfo({user}){
    const [lessons, setLessons] = useState([])
    const [resulrLessonsTest, setResultLessonTest] = useState([])
    const [lessonsTest, setLessonsTest] = useState([])



    const params = useParams()


    useEffect(() => {
        getLessonByIdCourses()
        getResultByIdStudent()
        getLessonTestsByIdCourse()

    }, [])

    async function getLessonByIdCourses() {
        const response = await CoursesService.getLessonByIdCourse(params.id)
        setLessons(response)
    }

    async function getLessonTestsByIdCourse() {
        const response = await CoursesService.getTestsByIdCourse(params.id)
        setLessonsTest(response)
    }


    async function getResultByIdStudent() {
        const response = await CoursesService.getResultByIdStudent(user.id)
        setResultLessonTest(response.filter(result => result.course === +params.id))
        console.log(resulrLessonsTest)
    }

    console.log(resulrLessonsTest)
    

    return(
        <div className={s.CourseInfo}>
            <h1>Информация о прохождении курса</h1>
            <div>
                <p>Всего уроков в курсе: {lessons.length}</p>
                <p>Пройдено: {resulrLessonsTest.length} ({Math.round((resulrLessonsTest.length * 100)/lessons.length)}%)</p>
            </div>
            <div>
            <table>
                    {lessonsTest.map(test => 
                        <tr key={test.id}>
                            <td>{test.name}</td>
                            <td>
                                {resulrLessonsTest.find(result => result.lessonTest === test.id) ? 
                                    (resulrLessonsTest.find(result => result.lessonTest === test.id).result) : 
                                    <span>Не пройден</span>}
                            </td>
                        </tr>
                        )}
                </table>
            </div>
        </div>
    )
}



export default CourseInfo;