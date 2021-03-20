from django.shortcuts import render
from .models import *
from django.contrib.auth import authenticate, login, logout
from django.urls import reverse
from django.http import HttpResponseRedirect
from django.http import HttpResponse, JsonResponse
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
    return JsonResponse(data)
