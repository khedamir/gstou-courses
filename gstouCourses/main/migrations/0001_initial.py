# Generated by Django 4.0.5 on 2022-06-10 18:15

import ckeditor.fields
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Courses',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=250, verbose_name='Название курса')),
                ('description', models.CharField(max_length=250, verbose_name='Описание курса')),
                ('date', models.DateField(auto_now_add=True, null=True)),
                ('category', models.CharField(choices=[('1', 'Институт прикладных информационных технологий'), ('2', 'Институт строительства архитектуры и дизайна'), ('3', 'Институт нефти и газа'), ('4', 'Институт энергетики'), ('5', 'Институт цифровой экономики и технологического предпринимательства')], max_length=5, verbose_name='Категория')),
            ],
        ),
        migrations.CreateModel(
            name='EntranceTesting',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=150, verbose_name='Наименование теста')),
                ('description', models.CharField(max_length=250, verbose_name='Описание теста')),
                ('course', models.OneToOneField(db_column='Курс', on_delete=django.db.models.deletion.DO_NOTHING, to='main.courses')),
            ],
        ),
        migrations.CreateModel(
            name='Lesson',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=250, verbose_name='Название урока')),
                ('description', models.CharField(max_length=250, verbose_name='Описание урока')),
                ('lecture', ckeditor.fields.RichTextField(verbose_name='Лекция')),
                ('exercise', models.CharField(max_length=250, verbose_name='Название урока')),
                ('course', models.ForeignKey(db_column='Курс', on_delete=django.db.models.deletion.DO_NOTHING, to='main.courses')),
            ],
        ),
        migrations.CreateModel(
            name='LessonTest',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=150, verbose_name='Наименование теста')),
                ('description', models.CharField(max_length=250, verbose_name='Описание теста')),
                ('lesson', models.ForeignKey(db_column='Урок', on_delete=django.db.models.deletion.DO_NOTHING, to='main.lesson')),
            ],
        ),
        migrations.CreateModel(
            name='Student',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('birth_date', models.DateField(blank=True, null=True)),
                ('group', models.CharField(max_length=45, verbose_name='Группа студента')),
                ('user', models.OneToOneField(limit_choices_to={'groups__name': 'Students'}, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Teacher',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('birth_date', models.DateField(blank=True, null=True)),
                ('user', models.OneToOneField(limit_choices_to={'groups__name': 'Teachers'}, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='StudentGroup',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('course', models.ForeignKey(db_column='Курс', on_delete=django.db.models.deletion.DO_NOTHING, to='main.courses')),
                ('student', models.ForeignKey(db_column='Студент', on_delete=django.db.models.deletion.DO_NOTHING, to='main.student')),
            ],
        ),
        migrations.CreateModel(
            name='resultLessonTest',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('result', models.CharField(max_length=1, verbose_name='Оценка')),
                ('lessonTest', models.ForeignKey(db_column='Тест', on_delete=django.db.models.deletion.DO_NOTHING, to='main.lessontest')),
                ('student', models.ForeignKey(db_column='Студент', on_delete=django.db.models.deletion.DO_NOTHING, to='main.student')),
            ],
        ),
        migrations.CreateModel(
            name='resultEntranceTesting',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('result', models.CharField(max_length=1, verbose_name='Оценка')),
                ('lessonTest', models.ForeignKey(db_column='Тест', on_delete=django.db.models.deletion.DO_NOTHING, to='main.entrancetesting')),
                ('student', models.ForeignKey(db_column='Студент', on_delete=django.db.models.deletion.DO_NOTHING, to='main.student')),
            ],
        ),
        migrations.CreateModel(
            name='QuestionLessonTest',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('question', models.CharField(max_length=250, verbose_name='Вопрос')),
                ('answers', models.CharField(max_length=250, verbose_name='Ответы')),
                ('correctAnswer', models.CharField(max_length=250, verbose_name='Правильный ответ')),
                ('lessonTest', models.ForeignKey(db_column='Тест', on_delete=django.db.models.deletion.DO_NOTHING, to='main.lessontest')),
            ],
        ),
        migrations.CreateModel(
            name='QuestionEntranceTesting',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('question', models.CharField(max_length=250, verbose_name='Вопрос')),
                ('answers', models.CharField(max_length=250, verbose_name='Ответы')),
                ('correctAnswer', models.CharField(max_length=250, verbose_name='Правильный ответ')),
                ('entranceTesting', models.ForeignKey(db_column='Тест', on_delete=django.db.models.deletion.DO_NOTHING, to='main.entrancetesting')),
            ],
        ),
        migrations.AddField(
            model_name='courses',
            name='teacher',
            field=models.ForeignKey(db_column='Преподаватель', on_delete=django.db.models.deletion.DO_NOTHING, to='main.teacher'),
        ),
    ]
