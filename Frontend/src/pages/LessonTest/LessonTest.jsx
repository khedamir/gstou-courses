import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import CoursesService from "../../API/CoursesService";
import Test from "../../components/UI/Test/Test";
import s from "./LessonTest.module.css"

function LessonTest(){
    const [test, setTest] = useState({})
    const [questions, setQuestions] = useState([])

    const [answers, setAnswers] = useState('')


    const params = useParams()

    useEffect(() =>{
        getLessonTest()
        getQuestionsTest()
    }, [])

    async function getLessonTest(){
        const response = await CoursesService.getLessonTestById(params.id)
        setTest(response)
    }

    async function getQuestionsTest(){
        const response = await CoursesService.getQuestionsLessonTestById(params.id)
        setQuestions(response)
    }

    // console.log(answers)



    return(
        <div className={s.LessonTest}>
            <h1>{test.name}</h1>
            <h2>{test.description}</h2>
            
            <Test questions = {questions}/>
        </div>
    )
}

export default LessonTest