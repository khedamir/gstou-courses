import React from "react";

import s from "./CourseList.module.css";


import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { spacing } from "@mui/system";

function CourseList({router, courses, subscribe, group}) {
    const category = [
        'Институт прикладных информационных технологий',
        'Институт строительства архитектуры и дизайна',
        'Институт нефти и газа',
        'Институт энергетики',
        'Институт цифровой экономики и технологического предпринимательства',
    ]

    function routerTo(id){
        router("/catalog/" + id + "/" + subscribe)
        // if(subscribe){
        // }else{
        //     alert("Необходимо сделать подписку на курс!")
        // }
    }

    function routerToCourseInfo(id){
        if(group == "Teacher"){
            router("/teacher/course/info/" + id)
        }else{
            router("/student/course/info/" + id)
        }
    }




    return (
        <div className={s.courseItems}>
            {courses.map((course, id) =>
                <Card className={s.Card} key={id} >
                        <CardMedia
                            component="img"
                            height="140"
                            image={course.img}
                            alt="gree)n iguana">
                        </CardMedia>
                        <CardContent>
                            <Typography className={s.courseName} gutterBottom variant="h5" component="div">{course.name}</Typography>
                            {/* <Typography variant="body2" color="text.secondary">{course.description}</Typography> */}
                            <Typography variant="body2" color="text.secondary">{course.date}</Typography>
                            <Typography className={s.courseCategory} gutterBottom variant="body2" component="div">{category[course.category-1] }</Typography>
                        </CardContent>
                    <div className={s.CardButtons}>

                        <CardActionArea className={s.CardButton}>
                            {subscribe ? 
                            <button onClick={() => routerToCourseInfo(course.id)} className={s.Info}>Инфо</button> 
                            : 
                            <button className={s.Info}>Записаться</button>}
                        </CardActionArea>

                        <CardActionArea className={s.CardButton}>
                            <button  onClick={() => routerTo(course.id)}>Открыть</button>
                        </CardActionArea>

                    </div>
                </Card>
            )}
        </div>
    )
}


export default CourseList;