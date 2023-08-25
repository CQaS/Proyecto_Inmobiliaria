from django import forms
from .models import User

class ContactForm(forms.ModelForm):
    class Meta:
        model = User
        fields = '__all__'


    """ nombre = forms.CharField(label='Nombre y Apellido', max_length=100)
    correo = forms.EmailField(label='Correo electrónico')
    telefono = forms.CharField(label='Telefono')
    mensaje = forms.CharField(label='Mensaje', widget=forms.Textarea) """
