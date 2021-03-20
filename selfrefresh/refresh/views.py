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
    trivia_store = TriviaStore.objects.all().values()
    trivia_list = list(trivia_store)
    i = random.randint(0, len(trivia_list))

    return JsonResponse(trivia_list[i], safe=False)

@csrf_exempt
def saveresponse(request):
    if request.method=='POST':
        received_json_data = json.loads(request.body)
        print(received_json_data)
        print(received_json_data['tid'])
        print(received_json_data['answer'])
        print(received_json_data['like'])
        return HttpResponse(received_json_data)
