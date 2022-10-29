import React from "react";
import s from './LessonsList.module.css'


function LessonsList({lessons, router, params}) {
    return (
        <div className={s.lessonItems}>
            {lessons.map((lesson, id) =>
                <div className={s.lessonItem} key={id} onClick={() => router("/lesson/" + lesson.id + "/" + params.subscribe)}>
                    <h2>{lesson.name}</h2>
                    <p>{lesson.description}</p>
                </div>
            )}
        </div>
    )
}

export default LessonsList;