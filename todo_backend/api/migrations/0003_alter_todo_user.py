# Generated by Django 4.2.2 on 2023-12-04 06:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_alter_todo_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='todo',
            name='user',
            field=models.CharField(max_length=200),
        ),
    ]
