from django.conf import settings
from main.types import *

# Create your views here.

from rest_framework import status

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed

import jwt, datetime
from django.contrib.auth import get_user_model


class CoursesView(APIView):
    def get(self, request):
        # raise Exception(request.myuser)
        courses = Courses.objects.all()
        serializer = CoursesSerializer(courses, many = True)
        return Response({"courses": serializer.data })


class StudentsView(APIView):
    def get(self, request):
        # raise Exception(request.myuser)
        students = Student.objects.all()
        serializer = StudentsSerializer(students, many = True)
        return Response({"students": serializer.data })


class StudentView(APIView):
    def get(self, request, **kwargs):
        studentId = kwargs['id']
        try:
            student = Student.objects.get(id = studentId)
            serializer = StudentsSerializer(student)
            return Response({"student": serializer.data})
        except Student.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)



class TeacherView(APIView):
    def get(self, request, **kwargs):
        teacherId = kwargs['id']
        try:
            teacher = Teacher.objects.get(id = teacherId)
            serializer = TeacehrsSerializer(teacher)
            return Response({"teacher": serializer.data})
        except Teacher.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


class CourseView(APIView):
    def get(self, request, **kwargs):
        courseId = kwargs['id']
        try:
            course = Courses.objects.get(id = courseId)
            serializer = CoursesSerializer(course)
            return Response({"course": serializer.data})
        except Courses.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


class TeacherCoursesView(APIView):
    def get(self, request, **kwargs):
        teacherId = kwargs['id']
        try:
            course = Courses.objects.filter(teacher_id = teacherId)
            serializer = CoursesSerializer(course, many = True)
            return Response({"courses": serializer.data})
        except Courses.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


class LessonsView(APIView):
    def get(self, request, **kwargs):
        courseId = kwargs['id']
        try:
            lesson = Lesson.objects.filter(course = courseId)
            serializer = LessonSerializer(lesson, many = True)
            return Response({"lessons": serializer.data})
        except Courses.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


class LessonView(APIView):
    def get(self, request, **kwargs):
        lessonId = kwargs['id']
        try:
            lesson = Lesson.objects.get(id = lessonId)
            serializer = LessonSerializer(lesson)
            return Response({"lesson": serializer.data})
        except Courses.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


class LessonTestView(APIView):
    def get(self, request, **kwargs):
        lessonId = kwargs['id']
        try:
            test = LessonTest.objects.get(lesson = lessonId)
            serializer = LessonTestSerializer(test)
            return Response({"test": serializer.data})
        except Courses.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


class LessonsTestView(APIView):
    def get(self, request, **kwargs):
        courseId = kwargs['id']
        try:
            tests = LessonTest.objects.filter(course = courseId)
            serializer = LessonTestSerializer(tests, many = True)
            return Response({"tests": serializer.data})
        except Courses.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


class QuestionsLessonTestView(APIView):
    def get(self, request, **kwargs):
        testId = kwargs['id']
        try:
            quetion = QuestionLessonTest.objects.filter(lessonTest = testId)
            serializer = QuestionsLessonTestSerializer(quetion, many = True)
            return Response({"questions": serializer.data})
        except Courses.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


class relultLessonTestView(APIView):
    def get(self, rewuest, **kwargs):
        studentId = kwargs['id']
        try:
            lessonTestByStudent = resultLessonTest.objects.filter(student__id = studentId) 
            serializer = ResultLessonTestSerializer(lessonTestByStudent, many = True)
            return Response({"resultLessonTest": serializer.data})
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)



class StudentCourseView(APIView):
    def get(self, rewuest, **kwargs):
        studentId = kwargs['id']
        try:
            coursesByStudent = StudentGroup.objects.filter(student__id = studentId)
            serializer = StudentGroupSerializer(coursesByStudent, many = True)
            return Response({"studentCourses": serializer.data})
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)


class StudentGroupView(APIView):
    def get(self, rewuest, **kwargs):
        courseId = kwargs['id']
        try:
            group = StudentGroup.objects.filter(course__id = courseId)
            serializer = StudentGroupSerializer(group, many = True)
            return Response({"group": serializer.data})
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)   



# class StudentCourseView(APIView):
#     def get(self, rewuest, **kwargs):
#         studentId = kwargs['id']
#         coursesByStudent = StudentGroup.objects.filter(student = studentId)
#         coursesId = []
#         for coursee in coursesByStudent:
#             coursesId.append(coursee.course.id) 
        
#         try:
#             courses = Courses.objects.filter(id in coursesId)
#             # raise Exception(courses)
#             serializer = CoursesSerializer(courses, many = True)
#             return Response({"courses": serializer.data})
#         except:
#             return Response(status=status.HTTP_404_NOT_FOUND)


















class LoginView(APIView):
    def post(self, request):
        username = request.data['username']
        password = request.data['password']

        user = get_user_model().objects.filter(username=username).first()
        
        if user is None:
            raise AuthenticationFailed('User not found!')

        if not user.check_password(password):
            raise AuthenticationFailed('Incorrect password!')

        payload = {
            'id': user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
            'iat': datetime.datetime.utcnow()
        }

        token = jwt.encode(payload, 'secret', algorithm='HS256')

        response = Response()

        response.set_cookie(key='jwt', value=token, httponly=True)
        response.data = {
            'jwt': token
        }
        return response


class UserView(APIView):

    def get(self, request):
        return Response(UserSerializer(request.myuser).data)
        #смотри как теперь легче получить юзера
        token = request.COOKIES.get('jwt')

        if not token:
            raise AuthenticationFailed('Unauthenticated!')

        try:
            payload = jwt.decode(jwt=token, key='secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated!')
       
        user = get_user_model().objects.filter(id=payload['id']).first()
        
        serializer = UserSerializer(user)
        return Response(serializer.data)


class LogoutView(APIView):
    def post(self, request):
        response = Response()
        response.delete_cookie('jwt')
        response.data = {
            'message': 'success'
        }
        return response