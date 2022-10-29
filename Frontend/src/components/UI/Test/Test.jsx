import React, { useEffect, useState } from "react";
import s from "./Test.module.css"

import Button from '@mui/material/Button';

function Test({ questions }) {
    const [answers, setAnswers] = useState([])

    useEffect(() => {
        const ans = []
        questions.map(question => {
            ans.push(question.answers.split('; '))
        })
        setAnswers(ans)
    }, [questions])



    console.log(answers)

    return (
        <form className={s.test}>
            {questions.map((question, id) =>
                <div className={s.question}>
                    <h3>{question.question}</h3>
                    <div>
                        {answers.length 
                            ?
                            answers[id].map(answer =>
                                <div className={s.answers}>
                                    <input type="radio" id="radioButton"></input>
                                    <span>{answer}</span>
                                </div>
                            )
                            :
                            <div></div>
                        }
                    </div>
                    
                </div>
            )}
            <Button variant="contained">Завершить</Button>
        </form>
    )
}

export default Test