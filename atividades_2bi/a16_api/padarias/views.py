from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.contrib.auth import login
from django.contrib.auth.models import User
from .models import Padaria, Cesta, Assinatura


def home(request):
  return render(request, 'home.html')


def contato(request):
    form_message = None

    if request.method == 'POST':
        name = request.POST.get('name')
        email = request.POST.get('email')
        phone = request.POST.get('phone')
        subject = request.POST.get('subject')
        rating = request.POST.get('rating')
        message = request.POST.get('message')

        # Salvar no banco de dados
        Feedback.objects.create(
            nome=name,
            email=email,
            assunto=subject,
            avaliacao=rating,
            mensagem=message,
            telefone=phone
        )


        # Simular o processamento do email printando no console
        print(f"Email de {name} ({email})")
        print(f"Telefone: {phone}")
        print(f"Assunto: {subject}")
        print(f"Avaliação: {rating} estrelas")
        print(f"Mensagem: {message}")

        form_message = f"Obrigado pelo seu feedback, {name}! Recebemos sua mensagem e em breve entraremos em contato."

    context = {
        'form_message': form_message
    }
    return render(request, 'contato.html', context)

def padarias_list(request):
    return render(request, 'padarias/padarias_list.html')

def cestas_list(request):
    cestas = Cesta.objects.all()
    context = {
        'cestas': cestas,
    }
    return render(request, 'cestas/cestas_list.html', context=context)

def cestas_detail(request, pk):
    cesta = get_object_or_404(Cesta, pk=pk)
    context = {
        'cesta': cesta,
    }
    return render(request, 'cestas/cestas_detail.html', context)


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