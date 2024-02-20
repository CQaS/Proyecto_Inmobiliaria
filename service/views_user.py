from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import UserCreationForm
from .forms import SuperuserCreationForm


@login_required(login_url='/#modal-opened')
def create_superuser(request):
    ERR = ''
    if not request.user.is_superuser:
        # Si el usuario autenticado no es un superusuario, redirigirlo a alguna página de error
        return redirect('404')

    if request.method == 'POST':
        form = SuperuserCreationForm(request.POST)
        try:
            if form.is_valid():
                u = form.save(commit=False)
                u.first_name = request.POST['first_name']
                print(u.__dict__)
                u.save()
                ERR = f'Superusuário {u.username}, criado com sucesso.'
            if not form.is_valid():
                errors = form.errors
                ERR = errors
                print(errors)

        except Exception as e:
            # Aquí puedes manejar la excepción según tus necesidades
            ERR = f"Error al crear el superusuario: {e}"
            print(ERR)
    else:
        print('F5')
        print('superuser FORM')
        form = SuperuserCreationForm()
    print(ERR)
    return render(request, 'registration/create_superuser.html', {'form': form, 'err': ERR})


def success(request):
    return render(request, 'success.html')


def error(request):
    return render(request, 'error.html')
