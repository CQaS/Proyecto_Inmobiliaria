from django.shortcuts import render
from django.http import HttpResponse
from .forms import ContactForm


# Create your views here.
def index(request):
    return render(request, 'index.html')

def about(request):
    return render(request, 'about.html')

def contact(request):
    
    form = ContactForm(request.POST or None, request.FILES or None)
    return render(request, 'contact.html', {'form': form})

def sevice(request):
    return render(request, 'login.html')




