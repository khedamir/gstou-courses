# Generated by Django 4.0.5 on 2022-06-18 20:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0006_lessontest_course_alter_resultlessontest_course'),
    ]

    operations = [
        migrations.AddField(
            model_name='student',
            name='name',
            field=models.CharField(max_length=250, null=True, verbose_name='ФИО'),
        ),
    ]
