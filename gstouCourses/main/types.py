from django.conf import settings
from main.models import *
from rest_framework import serializers

from django.contrib.auth import get_user_model

class CoursesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Courses
        fields = "__all__"


class StudentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = "__all__"


class TeacehrsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teacher
        fields = "__all__"

class StudentGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentGroup
        fields = "__all__"


class LessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lesson
        fields = "__all__"

class LessonTestSerializer(serializers.ModelSerializer):
    class Meta:
        model = LessonTest
        fields = "__all__"

class QuestionsLessonTestSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestionLessonTest
        fields = "__all__"



class ResultLessonTestSerializer(serializers.ModelSerializer):
    class Meta:
        model = resultLessonTest
        fields = "__all__"


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = "__all__"
        extra_kwargs = {
            'password': {'write_only': True}
        }