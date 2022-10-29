import axios from "axios"


export default class CoursesService {
    static async getAll () {
        const response = await axios.get("http://127.0.0.1:8000/api/courses/")
        return response.data.courses
    }
    static async getById (id) {
        const response = await axios.get("http://127.0.0.1:8000/api/courses/" + id)
        return response.data.course
    }

    static async getLessonByIdCourse (id) {
        const response = await axios.get("http://127.0.0.1:8000/api/lessons/" + id)
        return response.data.lessons
    }

    static async getLessonById (id) {
        const response = await axios.get("http://127.0.0.1:8000/api/lesson/" + id)
        return response.data.lesson
    }

    static async getLessonTestById (id) {
        const response = await axios.get("http://127.0.0.1:8000/api/lesson/test/" + id)
        return response.data.test
    }

    static async getQuestionsLessonTestById (id) {
        const response = await axios.get("http://127.0.0.1:8000/api/lesson/test/questions/" + id)
        return response.data.questions
    }


    static async getCoursesByIdStudent (id) {
        const response = await axios.get("http://127.0.0.1:8000/api/student/courses/" + id)
        return response.data.studentCourses
    }

    static async getResultByIdStudent (id) {
        const response = await axios.get("http://127.0.0.1:8000/api/student/course/" + id)
        return response.data.resultLessonTest
    }


    static async getCoursesByIdTeacher (id) {
        const response = await axios.get("http://127.0.0.1:8000/api/teacher/courses/" + id)
        return response.data.courses
    }

    static async getGroupByIdCourse (id) {
        const response = await axios.get("http://127.0.0.1:8000/api/teacher/course/info/" + id)
        return response.data.group
    }

    static async getStudents() {
        const response = await axios.get("http://127.0.0.1:8000/api/students/")
        return response.data.students
    }

    static async getStudent(id) {
        const response = await axios.get("http://127.0.0.1:8000/api/student/" + id)
        return response.data.student
    }


    static async getTeacher(id) {
        const response = await axios.get("http://127.0.0.1:8000/api/teacher/" + id)
        return response.data.teacher
    }

    static async getTestsByIdCourse(id) {
        const response = await axios.get("http://127.0.0.1:8000/api/courses/" + id + "/tests")
        return response.data.tests
    }
}