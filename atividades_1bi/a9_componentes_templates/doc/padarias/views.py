from django.shortcuts import render
from django.http import HttpResponse


def home(request):
    return HttpResponse('Bem vindo ao Café com Pão!')


def contato(request):
    return HttpResponse('Entre em contato conosco!')