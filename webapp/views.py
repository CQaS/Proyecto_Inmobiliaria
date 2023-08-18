from django.shortcuts import render
from django.http import HttpResponse
from .forms import ContactForm


# Create your views here.
def index(request):
    return render(request, 'index.html')

def about(request):
    return render(request, 'about.html')

def contact(request):
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            # Procesa los datos del formulario aquí (enviar correo, guardar en la base de datos, etc.)
            pass
    else:
        form = ContactForm()
    return render(request, 'contact.html', {'form': form})

def sevice(request):
    return render(request, 'login.html')




