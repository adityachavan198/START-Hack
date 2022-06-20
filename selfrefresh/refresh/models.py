from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.


class UserOfApp(AbstractUser):
    uid = models.AutoField('uid', primary_key=True)
    eid = models.IntegerField('eid', null=True)


class Cluster(models.Model):
    cid = models.AutoField('cid', primary_key=True)
    cname = models.CharField('cname', max_length=120)


class TriviaStore(models.Model):
    tid = models.AutoField('tid', primary_key=True)
    cid = models.ForeignKey(Cluster, on_delete=models.CASCADE, db_column='cid', default=None)
    question = models.CharField('question', max_length=120)
    option1 = models.CharField('option1', max_length=120)
    option2 = models.CharField('option2', max_length=120)
    option3 = models.CharField('option3', max_length=120)
    option4 = models.CharField('option4', max_length=120)
    answer = models.IntegerField('answer', choices=[(0, 'null'), (1, 'answer1'), (2, 'answer2'), (3, 'answer3'), (4, 'answer4')])
    likes = models.IntegerField('likes', default=0)
    dislikes = models.IntegerField('dislikes', default=0)
    displayed = models.IntegerField('displayed', default=0)

    # def __str__(self):
    #     return {self.question: self.answer}


class Score(models.Model):
    sid = models.AutoField('sid', primary_key=True)
    uid = models.ForeignKey(
        UserOfApp, on_delete=models.CASCADE, db_column='uid', default=None)
    cid = models.ForeignKey(
        Cluster, on_delete=models.CASCADE, db_column='cid', default=None)
    score = models.IntegerField('score', default=0)
