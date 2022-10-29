from django.contrib import admin

# Register your models here.

from .models import *

admin.site.register(Student)
admin.site.register(Teacher)
admin.site.register(Courses)
admin.site.register(Lesson)
admin.site.register(EntranceTesting)
admin.site.register(QuestionEntranceTesting)
admin.site.register(resultEntranceTesting)
admin.site.register(LessonTest)
admin.site.register(QuestionLessonTest)
admin.site.register(resultLessonTest)
admin.site.register(StudentGroup)
