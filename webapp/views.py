from django.shortcuts import render
from django.http import HttpResponse
from .forms import ContactForm


# Create your views here.
def index(request):
    form = ContactForm(request.POST or None, request.FILES or None)
    return render(request, 'index.html', {'form': form})


def sevice(request):
    return render(request, 'login.html')




