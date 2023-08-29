from django import forms
from .models import *

class InmuebleForm(forms.ModelForm):
    class Meta:
        model = Inmueble
        fields = '__all__'
        exclude = ['id_cliente']

class ClienteForm(forms.ModelForm):
    class Meta:
        model = Clientes
        fields = '__all__'
        exclude = ['categoria']
        widgets = {
            'fechnac': forms.DateInput(
                attrs = {
                    'type':'date'
                    }
            )
        }

class EmpleadoForm(forms.ModelForm):
    class Meta:
        model = Empleados
        fields = '__all__'
