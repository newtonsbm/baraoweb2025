from django.shortcuts import render
from django.shortcuts import get_object_or_404
from .models import Feedback, Cesta


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