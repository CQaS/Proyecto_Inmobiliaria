from django import forms

class ContactForm(forms.Form):
    nombre = forms.CharField(label='Nombre y Apellido', max_length=100)
    correo = forms.EmailField(label='Correo electrónico')
    telefono = forms.CharField(label='Telefono')
    mensaje = forms.CharField(label='Mensaje', widget=forms.Textarea)
