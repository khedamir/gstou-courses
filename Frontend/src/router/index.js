import AddCourse from "../pages/AddCourse/AddCourse";
import Catalog from "../pages/Catalog/Catalog";
import Course from "../pages/Course/Course";
import CourseInfo from "../pages/CourseInfo/CourseInfo";
import Lesson from "../pages/Lesson/Lesson";
import LessonTest from "../pages/LessonTest/LessonTest";
import Login from "../pages/Login/Login";
import Main from "../pages/Main/Main";
import Student from "../pages/Student/Student";
import StudentCourses from "../pages/StudentCourses/StudentCourses";
import StudentProgressInfo from "../pages/StudentProgressInfo/StudentProgressInfo";
import Teacher from "../pages/Teacher/Teacher";
import TeacherCoursesInfo from "../pages/TeacherCoursesInfo/TeacherCoursesInfo";
import user from "../state";


export const teacherRoutes = [
    {path: '/login', element: <Login user = {user} />},
    {path: '/teacher/', element: <Teacher user = {user}/>},
    {path: '/teacher/course/info/:id', element: <TeacherCoursesInfo user = {user}/>},
    {path: '/teacher/course/info/:id/student/:student_id', element: <StudentProgressInfo user = {user}/>},
    {path: '/', element: <Main user = {user}/>},
    {path: '/catalog', element: <Catalog user = {user}/>},
    {path: '/catalog/:id/:subscribe', element: <Course user = {user}/>},
    {path: '/lesson/:id', element: <Lesson user = {user}/>},
    {path: '/lesson/test/:id', element: <LessonTest user = {user}/>},
    {path: '/teacher/add-course', element: <AddCourse/>},
]

export const studentRoutes = [
    {path: '/login', element: <Login user = {user} />},
    {path: '/student', element: <Student user = {user}/>},
    {path: '/student/courses/:id', element: <StudentCourses user = {user}/> },
    {path: '/student/course/info/:id', element: <CourseInfo user = {user}/> },

    {path: '/', element: <Main user = {user}/>},
    {path: '/catalog', element: <Catalog user = {user}/>},
    {path: '/catalog/:id/:subscribe', element: <Course user = {user}/>},
    {path: '/lesson/:id/:subscribe', element: <Lesson user = {user}/>},
    {path: '/lesson/test/:id', element: <LessonTest user = {user}/>},
]


// export const privateRoutes = [
//     {path: '/student', element: <Student/>},
//     {path: '/teacher/', element: <Teacher/>},
//     {path: '/teacher/course/info/:id', element: <TeacherCoursesInfo/>},
//     {path: '/teacher/course/info/:id/student/:student_id', element: <StudentProgressInfo/>},
//     {path: '/student/courses/:id', element: <StudentCourses/> },
//     {path: '/student/course/info/:id', element: <CourseInfo/> },
//     {path: '/', element: <Main/>},
//     {path: '/catalog', element: <Catalog/>},
//     {path: '/catalog/:id', element: <Course/>},
//     {path: '/lesson/:id', element: <Lesson/>},
//     {path: '/lesson/test/:id', element: <LessonTest/>},
// ]

export const publicRoutes = [
    {path: '/', element: <Main user = {user} />},
    {path: '/catalog', element: <Catalog user = {user} />},
    {path: '/catalog/:id', element: <Course user = {user} />},
    {path: '/login', element: <Login user = {user} />},
]