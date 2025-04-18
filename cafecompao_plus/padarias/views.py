import requests

from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.urls import reverse_lazy
from django.views.generic import ListView, DetailView, UpdateView, DeleteView
from django.conf import settings
from django.contrib import messages
from django.contrib.auth import login
from django.contrib.auth.models import User
from django.contrib.auth.mixins import LoginRequiredMixin
from .models import Padaria, Cesta, Assinatura, Perfil
from .filters import PadariaFilter
from .forms import PerfilForm, UserForm, EnderecoForm


def home(request):
    return render(request, 'home.html')


def padarias_list(request):
    padarias = Padaria.objects.all()
    context = {
        'padarias': padarias,
    }
    return render(request, 'padarias/list.html', context=context)

class PadariaListView(ListView):
    model = Padaria
    template_name = 'padarias/list_paginated.html'
    context_object_name = 'padarias'
    paginate_by = 5

    def get_queryset(self):
        queryset = super().get_queryset()
        self.filterset = PadariaFilter(self.request.GET, queryset=queryset)
        return self.filterset.qs
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['filter'] = self.filterset
        context['cities'] = Padaria.objects.values_list('endereco__cidade', flat=True) \
                           .distinct().exclude(endereco__cidade__isnull=True) \
                           .order_by('endereco__cidade')
        return context

class PadariaDetailView(DetailView):
    model = Padaria
    template_name = 'padarias/detail.html'
    context_object_name = 'padaria'



def cestas_list(request):
    cestas = Cesta.objects.all()
    context = {
        'cestas': cestas,
    }
    return render(request, 'cestas/list.html', context=context)


def contato(request):

    form_message = None

    if request.method == 'POST':
        name = request.POST.get('name')
        email = request.POST.get('email')
        subject = request.POST.get('subject')
        rating = request.POST.get('rating')
        message = request.POST.get('message')

        # Simulate email handling by printing to console
        print(f"Email de {name} ({email})")
        print(f"Assunto: {subject}")
        print(f"Avaliação: {rating} estrelas")
        print(f"Mensagem: {message}")

        form_message = f"Obrigado por entrar em contato, {name}! Recebemos sua mensagem e em breve entraremos em contato."

    return render(request, 'contato.html', {'form_message': form_message})


def cestas_detail(request, pk):
    cesta = get_object_or_404(Cesta, pk=pk)
    context = {
        'cesta': cesta,
    }
    return render(request, 'cestas/detail.html', context)


def register(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')
        password_verification = request.POST.get('password_verification')
        first_name = request.POST.get('first_name')
        last_name = request.POST.get('last_name')
        context = {
            'email': email,
            'first_name': first_name,
            'last_name': last_name,
        }

        if password != password_verification:
            messages.error(request, 'As senhas não coincidem.')
            return render(request, 'registration/form.html', context)

        if User.objects.filter(username=email).exists():
            messages.error(request, 'Este email já está registrado.')
            return render(request, 'registration/form.html', context)

        user = User.objects.create_user(username=email, email=email, password=password, first_name=first_name, last_name=last_name)
        login(request, user)
        return redirect('dashboard_main')

    return render(request, 'registration/form.html')


@login_required
def dashboard_main(request):
    return render(request, 'dashboard/main.html')


@login_required
def assinatura_create(request):
    if request.method == 'POST':
        cesta_id = request.POST.get('cesta')
        observacoes = request.POST.get('observacoes')
        cesta = get_object_or_404(Cesta, id=cesta_id)
        assinatura = Assinatura.objects.create(user=request.user, cesta=cesta, observacao=observacoes)
        messages.success(request, 'Assinatura criada com sucesso!')
        return redirect('dashboard_main')
    cestas = Cesta.objects.all()
    return render(request, 'assinaturas/create.html', {'cestas': cestas})

@login_required
def assinatura_update(request):
    assinatura = get_object_or_404(Assinatura, user=request.user)
    if request.method == 'POST':
        cesta_id = request.POST.get('cesta')
        observacoes = request.POST.get('observacoes')
        cesta = get_object_or_404(Cesta, id=cesta_id)
        assinatura.cesta = cesta
        assinatura.observacao = observacoes
        assinatura.save()
        messages.success(request, 'Assinatura atualizada com sucesso!')
        return redirect('dashboard_main')
    cestas = Cesta.objects.all()
    return render(request, 'assinaturas/update.html', {'assinatura': assinatura, 'cestas': cestas})

@login_required
def assinatura_delete(request):
    assinatura = get_object_or_404(Assinatura, user=request.user)
    if request.method == 'POST':
        assinatura.delete()
        messages.success(request, 'Assinatura cancelada com sucesso!')
        return redirect('dashboard_main')
    return render(request, 'assinaturas/delete.html', {'assinatura': assinatura})


class PerfilDetailView(LoginRequiredMixin, DetailView):
    model = Perfil
    template_name = 'dashboard/perfil/detail.html'
    context_object_name = 'perfil'
    
    def get_object(self, queryset=None):
        perfil, created = Perfil.objects.get_or_create(user=self.request.user)
        return perfil

class PerfilUpdateView(LoginRequiredMixin, UpdateView):
    model = Perfil
    form_class = PerfilForm
    template_name = 'dashboard/perfil/form.html'
    success_url = reverse_lazy('perfil_detail')
    
    def get_object(self, queryset=None):
        perfil, created = Perfil.objects.get_or_create(user=self.request.user)
        return perfil
        
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        
        if self.request.method == 'POST':
            context['user_form'] = UserForm(self.request.POST, instance=self.request.user)
        else:
            context['user_form'] = UserForm(instance=self.request.user)
        
        endereco = self.object.endereco if hasattr(self.object, 'endereco') and self.object.endereco else None
        if self.request.method == 'POST':
            context['endereco_form'] = EnderecoForm(self.request.POST, instance=endereco, prefix='endereco')
        else:
            context['endereco_form'] = EnderecoForm(instance=endereco, prefix='endereco')
            
        return context
        
    def form_valid(self, form):
        context = self.get_context_data()
        user_form = context['user_form']
        endereco_form = context['endereco_form']
        
        if user_form.is_valid() and endereco_form.is_valid():
            user_form.save()
            
            endereco = endereco_form.save(commit=False)
            if self.object.endereco:
                endereco.id = self.object.endereco.id
            endereco.save()
            
            if not self.object.endereco:
                self.object.endereco = endereco
                self.object.save()
            
        response = super().form_valid(form)
        messages.success(self.request, 'Perfil atualizado com sucesso!')
        return response

class PerfilDeleteView(LoginRequiredMixin, DeleteView):
    model = Perfil
    template_name = 'dashboard/perfil/delete.html'
    success_url = reverse_lazy('home')
    
    def get_object(self, queryset=None):
        return Perfil.objects.get(user=self.request.user)
    
    def delete(self, request, *args, **kwargs):
        messages.success(request, 'Seu perfil foi excluído com sucesso.')
        return super().delete(request, *args, **kwargs)


def recipe_search(request):
    recipes = []
    query = request.GET.get('query', '')
    error_message = None
    
    if query:
        try:
            api_key = settings.SPOONACULAR_API_KEY
            url = "https://api.spoonacular.com/recipes/complexSearch"
            params = {
                'apiKey': api_key,
                'query': query,
                'number': 12,  # Number of results to return
            }
            
            response = requests.get(url, params=params)
            response.raise_for_status()  # Raise an exception for 4XX/5XX responses
            
            data = response.json()
            recipes = data.get('results', [])
            
        except requests.RequestException as e:
            error_message = f"Não foi possível buscar receitas: {str(e)}"
    
    context = {
        'recipes': recipes,
        'query': query,
        'error_message': error_message,
    }
    
    return render(request, 'recipes/search.html', context)

