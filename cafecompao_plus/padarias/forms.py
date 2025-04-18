from django import forms
from .models import Perfil, Endereco
from django.contrib.auth.models import User

class UserForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ['first_name', 'last_name']
        labels = {
            'first_name': 'Nome',
            'last_name': 'Sobrenome',
        }

class EnderecoForm(forms.ModelForm):
    class Meta:
        model = Endereco
        exclude = ['padaria', 'perfil']

class PerfilForm(forms.ModelForm):
    class Meta:
        model = Perfil
        exclude = ['user', 'data_cadastro', 'endereco']
        widgets = {
            'data_nascimento': forms.DateInput(attrs={'type': 'date'}),
        }
