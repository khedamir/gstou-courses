from django.urls import  path
from . import views

urlpatterns = [
    path('courses/', views.CoursesView.as_view()),
    path('courses/<int:id>/', views.CourseView.as_view()),
    path('courses/<int:id>/tests/', views.LessonsTestView.as_view()),

    path('lessons/<int:id>/', views.LessonsView.as_view()),

    path('lesson/<int:id>/', views.LessonView.as_view()),
    path('lesson/test/<int:id>/', views.LessonTestView.as_view()),
    path('lesson/test/questions/<int:id>/', views.QuestionsLessonTestView.as_view()),

    path('student/courses/<int:id>/', views.StudentCourseView.as_view()),
    path('student/course/<int:id>/', views.relultLessonTestView.as_view()),

    path('teacher/courses/<int:id>/', views.TeacherCoursesView.as_view()),
    path('teacher/course/info/<int:id>/', views.StudentGroupView.as_view()),


    path('students/', views.StudentsView.as_view()),
    path('student/<int:id>', views.StudentView.as_view()),


    path('teacher/<int:id>', views.TeacherView.as_view()),


    path('login/', views.LoginView.as_view()),
    path('user/', views.UserView.as_view()),
]