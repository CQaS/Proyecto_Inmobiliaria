from django import forms
from .models import *

class InmuebleForm(forms.ModelForm):
    class Meta:
        model = Inmueble
        fields = '__all__'
        exclude = ['id_cliente']

class ClienteForm(forms.ModelForm):
    class Meta:
        model = Cliente
        fields = '__all__'
        exclude = ['id_catcliente']
