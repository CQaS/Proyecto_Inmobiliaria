from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
from django import forms
from .models import *


class InmuebleForm(forms.ModelForm):
    class Meta:
        model = Inmueble
        fields = '__all__'


class ClienteForm(forms.ModelForm):
    class Meta:
        model = Clientes
        fields = '__all__'
        widgets = {
            'fechnac': forms.DateInput(
                attrs={
                    'type': 'date'
                }
            )
        }


class EmpleadoForm(forms.ModelForm):
    class Meta:
        model = Empleados
        fields = '__all__'


class SuperuserCreationForm(UserCreationForm):
    print('SuperuserCreationForm')

    class Meta:
        model = User
        fields = [
            'username',
            'email',
            'password1',
            'password2',
            'is_superuser'
        ]

        # forms.py


class UsuarioForm(UserCreationForm):
    class Meta:
        model = User
        fields = [
            'first_name',
            'last_name',
            'email',
            'username',
            'password1',
            'password2',
        ]
        labels = {
            'first_name': 'Nomes',
            'last_name': 'Sobrenomes',
            'email': 'E-mail',
            'username': 'Nome de usuário',
            'password1': 'Digite sua senha',
            'password2': 'Confirme sua senha',
        }
        widgets = {
            'first_name': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Digite seu nome'}),
            'last_name': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Digite seu sobrenome'}),
            'email': forms.EmailInput(attrs={'class': 'form-control', 'placeholder': 'Digite seu e-mail'}),
            'username': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Digite seu nome de usuário'}),
            'password1': forms.PasswordInput(attrs={'class': 'form-control', 'placeholder': 'Digite sua senha'}),
            'password2': forms.PasswordInput(attrs={'class': 'form-control', 'placeholder': 'Confirme sua senha'}),
        }

    def clean_is_superuser(self):
        is_superuser = self.cleaned_data.get('is_superuser')
        print(is_superuser)
        if not is_superuser:
            print('SuperuserCreationForm3')
            raise forms.ValidationError("El usuario debe ser un Superusuario.")
        print('SuperuserCreationForm4')
        return is_superuser
