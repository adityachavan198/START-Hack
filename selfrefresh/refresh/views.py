from django.shortcuts import render
from .models import *
from django.contrib.auth import authenticate, login, logout
from django.urls import reverse
from django.http import HttpResponseRedirect
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
import random
import json
# Create your views here.


def fetchtrivia(request):
    data = {
        'tid': 1,
        'question': 'Who is the current CEO of Accenture Company?',
        'option1': 'David P Rowland',
        'option2': 'Patrick Roland',
        'option3': 'John Rowland',
        'option4': 'Rowland Mackenzie',
        'answer': 'David P Rowland',
    }
    # trivia_store = TriviaStore.objects.all().values()
    # trivia_list = list(trivia_store)
    # i = random.randint(0, len(trivia_list))
    # print(i)
    # return JsonResponse(trivia_list[i], safe=False)
    totalQuestions = TriviaStore.objects.count()
    randomQuestionId = random.randint(0, totalQuestions)
    question = TriviaStore.objects.filter(tid=randomQuestionId).values()
    return JsonResponse(question[0], safe=False)


@csrf_exempt
def saveresponse(request):
    if request.method == 'POST':
        received_json_data = json.loads(request.body)
        print(received_json_data['tid'])
        print(received_json_data['answer'])
        print(received_json_data['like'])
        print(received_json_data['uid'])
        tid = received_json_data['tid']
        answer = received_json_data['answer']
        like = received_json_data['like']
        uid = received_json_data['uid']
        data = received_json_data
        question = TriviaStore.objects.filter(tid=tid)[0]
        cid = question.cid
        score = Score.objects.filter(uid=uid, cid=cid)
        user = UserOfApp.objects.get(pk=uid)
        if len(score) == 0:
            # create score
            if answer == True:
                t = 10
            else:
                t = 0
            score = Score(uid=user, cid=cid, score=t)
        else:
            if answer == True:
                score = score[0]
                score.score = score.score + 10
                score.save()
        if like == 0:
            question.dislikes = question.dislikes + 1
            question.save()
        elif like == 1:
            question.likes = question.likes + 1
            question.save()

        print('score', score)
        print('question', question)
        print('cluster', cid)
        print('like', like, type(like))
        print(user)
        return HttpResponse('Changes Saved Sucessfully')


@csrf_exempt
def logIn(request):
    success = {'type': 'success'}
    fail = {'type': 'error'}
    if request.method == 'POST':
        received_json_data = json.loads(request.body)
        print(received_json_data['email'])
        print(received_json_data['password'])
        email = received_json_data['email']
        password = received_json_data['password']
        user = authenticate(username=email, password=password)
        if user is not None:
            success['uid'] = user.uid
            return JsonResponse(success)
        else:
            return JsonResponse(fail)
