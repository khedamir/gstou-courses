
from django.db import models

from ckeditor.fields import RichTextField

from django.conf import settings
from django.forms import CharField





class Student(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL,  on_delete=models.CASCADE, limit_choices_to={'groups__name': 'Student'})
    name = models.CharField("Имя", max_length=250, null=True)
    last_name = models.CharField("Фамилия", max_length=250, null=True)
    patronymic = models.CharField("Отчество", max_length=250, null=True)
    birth_date = models.DateField(null=True, blank=True)
    group = models.CharField("Группа студента", max_length=45)

    class Meta:
        ordering = ('last_name',)


class Teacher(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL,  on_delete=models.CASCADE, limit_choices_to={'groups__name': 'Teacher'})
    name = models.CharField("Имя", max_length=250, null=True)
    last_name = models.CharField("Фамилия", max_length=250, null=True)
    patronymic = models.CharField("Отчество", max_length=250, null=True)
    birth_date = models.DateField(null=True, blank=True)




class Courses(models.Model):
    img = models.CharField("ссылка на изображение", max_length=1500, null=True)
    name = models.CharField("Название курса", max_length=250)
    description = models.CharField("Описание курса", max_length=500)
    date = models.DateField(auto_now_add=True, editable=True, null=True)
    MY_CHOICES = (
        ("1", "Институт прикладных информационных технологий"),
        ("2", "Институт строительства архитектуры и дизайна"),
        ("3", "Институт нефти и газа"),
        ("4", "Институт энергетики"),
        ("5", "Институт цифровой экономики и технологического предпринимательства"),
    )
    category = models.CharField("Категория", max_length=5, choices=MY_CHOICES)
    teacher = models.ForeignKey(Teacher, on_delete=models.DO_NOTHING, db_column="Преподаватель")


    def __str__(self):
        return self.name




class EntranceTesting(models.Model):
    name = models.CharField("Наименование теста", max_length=150)
    description = models.CharField("Описание теста", max_length=250)
    course = models.OneToOneField(Courses, on_delete=models.DO_NOTHING, db_column="Курс")

    def __str__(self):
        return self.name

class QuestionEntranceTesting(models.Model):
    question = models.CharField("Вопрос", max_length=500)
    answers = models.CharField("Ответы", max_length=2500)
    correctAnswer = models.CharField("Правильный ответ", max_length=500)
    entranceTesting = models.ForeignKey(EntranceTesting, on_delete=models.DO_NOTHING, db_column="Тест")

    def __str__(self):
        return self.question

class resultEntranceTesting(models.Model):
    result = models.CharField("Оценка", max_length=1)
    student = models.ForeignKey(Student, on_delete=models.DO_NOTHING, db_column="Студент")
    lessonTest = models.ForeignKey(EntranceTesting, on_delete=models.DO_NOTHING, db_column="Тест")




class Lesson(models.Model):
    name = models.CharField("Название урока", max_length=250)
    description = models.CharField("Описание урока", max_length=500)
    lecture = RichTextField("Лекция")
    exercise = RichTextField("Домашнее задание")
    course = models.ForeignKey(Courses, on_delete=models.DO_NOTHING, db_column="Курс")

    def __str__(self):
        return self.name

class LessonTest(models.Model):
    name = models.CharField("Наименование теста", max_length=150)
    description = models.CharField("Описание теста", max_length=250)
    lesson = models.ForeignKey(Lesson, on_delete=models.DO_NOTHING, db_column="Урок")
    course = models.ForeignKey(Courses, on_delete=models.DO_NOTHING, db_column="Курс")

    def __str__(self):
        return self.name


class QuestionLessonTest(models.Model):
    question = models.CharField("Вопрос", max_length=500)
    answers = models.CharField("Ответы", max_length=2500)
    correctAnswer = models.CharField("Правильный ответ", max_length=500)
    lessonTest = models.ForeignKey(LessonTest, on_delete=models.DO_NOTHING, db_column="Тест")

    def __str__(self):
        return self.question

class resultLessonTest(models.Model):
    result = models.CharField("Оценка", max_length=1)
    student = models.ForeignKey(Student, on_delete=models.DO_NOTHING, db_column="Студент")
    lessonTest = models.ForeignKey(LessonTest, on_delete=models.DO_NOTHING, db_column="Тест")
    course = models.ForeignKey(Courses, on_delete=models.DO_NOTHING, db_column="Курс")



class StudentGroup(models.Model):
    course = models.ForeignKey(Courses, on_delete=models.DO_NOTHING, db_column="Курс")
    student = models.ForeignKey(Student, on_delete=models.DO_NOTHING, db_column="Студент")


