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
            'fechnasc': forms.DateInput(
                attrs = {
                    'type':'date'
                    }
            )
        }

class EmpleadoForm(forms.ModelForm):
    class Meta:
        model = Empleados
        fields = '__all__'
