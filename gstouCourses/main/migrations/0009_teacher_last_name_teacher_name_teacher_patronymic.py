# Generated by Django 4.0.5 on 2022-06-19 12:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0008_student_last_name_student_patronymic_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='teacher',
            name='last_name',
            field=models.CharField(max_length=250, null=True, verbose_name='Фамилия'),
        ),
        migrations.AddField(
            model_name='teacher',
            name='name',
            field=models.CharField(max_length=250, null=True, verbose_name='Имя'),
        ),
        migrations.AddField(
            model_name='teacher',
            name='patronymic',
            field=models.CharField(max_length=250, null=True, verbose_name='Отчество'),
        ),
    ]
