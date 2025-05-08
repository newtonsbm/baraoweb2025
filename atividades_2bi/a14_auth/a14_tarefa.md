## A14 - Autenticação e Autorização

### Resumo dos Conceitos Importantes

- Autenticação é o processo de verificar a identidade de um usuário entre diferentes acessos e diferentes dispositivos.
- É necessário sempre ter uma forma de representar unicamente um usuário. Isso pode ser feito através de um nome de usuário, e-mail, telefone, token ou CPF. 
- Também é necessário uma forma de verificar se o usuário é quem ele diz ser. Isso pode ser feito através de uma senha, token, biometria ou outro método de autenticação.
- Existem diferentes formas de autenticação, como autenticação por senha, autenticação por token, autenticação por biometria, por servidores de autenticação, entre outras. O Django possui suporte nativo para autenticação por senha e autenticação por token.
- Autorização é o processo de verificar se um usuário tem permissão para acessar um recurso ou executar uma ação. Isso pode ser feito através de permissões, grupos e regras de acesso.
- O Django possui suporte nativo para autorização através de permissões e grupos. As permissões são utilizadas para verificar se um usuário tem permissão para acessar um recurso ou executar uma ação. Os grupos são utilizados para agrupar permissões e facilitar a atribuição de permissões a usuários.

### Cadastro de Usuário

- Vamos criar a `view`, a rota em `urls.py` e o template na pasta `templates/registration` para o cadastro de usuário e também para login baseado nos protótipos `prototipo/registration_form.html` e `prototipo/registration_login.html`
- No arquivo `views.py` criara view `register` e a view `dashboard_main` que será a view que o usuário vai ser redirecionado após a criação da conta e após logar

```python
# No inicio do arquivo realizar as importacoes necessarias
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.contrib.auth import login
from django.contrib.auth.models import User
from .models import Padaria, Cesta


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
```

- Importar o decorator `login_required` e a função `login` do Django para fazer o login do usuário após o cadastro assim como o model `User` e `messages` para exibir mensagens de erro
- O decorator `login_required` é utilizado para verificar se o usuário está logado. Caso o usuário não esteja logado, ele será redirecionado para a página de login. Esse decorator pode ser utilizado em qualquer view que precise de autenticação.
- A função `login` é utilizada para fazer o login do usuário após o cadastro. Essa função recebe o request e o usuário como parâmetros e faz o login do usuário na sessão. Django verifica se o usuário permanece logado utilizando o cookie de sessão. O cookie de sessão é criado quando o usuário faz o login e é utilizado para identificar o usuário em requisições futuras. O Django possui suporte nativo para autenticação de usuários e gerenciamento de sessões.
- O método `create_user` é utilizado para criar um novo usuário no banco de dados. Esse método recebe o nome de usuário, e-mail, senha, nome e sobrenome como parâmetros e cria um novo usuário no banco de dados. O Django possui suporte nativo para criação de usuários e gerenciamento de senhas. O método `create_user` também gera um hash da senha do usuário para garantir a segurança da senha.
- A lib `messages` é utilizada para exibir mensagens de erro ou sucesso para o usuário. Essa lib permite exibir mensagens de forma simples e eficiente. O Django possui suporte nativo para exibição de mensagens e gerenciamento de sessões. As mensagens são armazenadas na sessão do usuário e podem ser exibidas em qualquer template.

### Criar Rota para Cadastro de Usuário

- Em `urls.py` criar a rota para a view `register` e a view `dashboard_main` além de incluir as outras rotas de autenticação do Django presentes em `django.contrib.auth.urls`

```python
urlpatterns = [
    ...
    path('accounts/', include("django.contrib.auth.urls")),
    path('accounts/register/', padarias_views.register, name='register'),
    path('dashboard/', padarias_views.dashboard_main, name='dashboard_main'),
    ...
]
```

### Template de Cadastro de Usuário

- Utilizando o protótipo `prototipo/registration_form.html` criar o template `templates/registration/form.html` para o cadastro de usuário. Esse template deve conter um formulário com os campos de e-mail, senha, confirmação de senha, nome e sobrenome. O formulário deve enviar os dados para a view `register`.

```html
{% extends 'base.html' %}
{% load static %}

{% block title %}Registrar - Café com Pão{% endblock %}

{% block content %}
  <!-- INICIO DO HERO -->
  <div class="hero bg-base-200 min-h-screen">
    <div class="hero-content flex-col gap-20 lg:flex-row">
      <img src="{% static 'images/cafe3.png' %}" class="max-w-2xl rounded-lg shadow-2xl opacity-60" alt="">
      <div class="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div class="card-body">
          <h1 class="text-3xl font-bold my-8">Crie sua conta</h1>
          <form method="post" class="space-y-4">
            {% csrf_token %}
            <fieldset class="fieldset">
              <legend class="fieldset-legend">Email</legend>
              <label class="input">
                <i class="bi bi-envelope opacity-50"></i>
                <input type="email" id="email" name="email" value="{{ email }}" required>
              </label>
            </fieldset>
            <fieldset class="fieldset">
              <legend class="fieldset-legend">Senha</legend>
              <label class="input">
                <i class="bi bi-lock opacity-50"></i>
                <input type="password" id="password" name="password" required>
              </label>
            </fieldset>
            <fieldset class="fieldset">
              <legend class="fieldset-legend">Confirme a senha</legend>
              <label class="input">
                <i class="bi bi-lock-fill opacity-50"></i>
                <input type="password" id="password_verification" name="password_verification" required>
              </label>
            </fieldset>
            <fieldset class="fieldset">
              <legend class="fieldset-legend">Nome</legend>
              <label class="input">
                <i class="bi bi-person-fill opacity-50"></i>
                <input type="text" id="first_name" name="first_name" value="{{ first_name }}" required>
              </label>
            </fieldset>
            <fieldset class="fieldset">
              <legend class="fieldset-legend">Sobrenome</legend>
              <label class="input">
                <i class="bi bi-person-lines-fill opacity-50"></i>
                <input type="text" id="last_name" name="last_name" value="{{ last_name }}" required>
              </label>
            </fieldset>
            <div class="form-control mt-6">
              <button type="submit" class="btn btn-primary">Registrar</button>
              <a href="{% url 'login' %}" class="btn">Já tenho conta</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <!-- FIM DO HERO -->
{% endblock %}
```

- O template de cadastro de usuário exibe um formulário com os campos de e-mail, senha, confirmação de senha, nome e sobrenome. O formulário envia os dados para a view `register` que irá criar o usuário no banco de dados. O template também exibe um botão para redirecionar o usuário para a página de login caso ele já tenha uma conta.
- Criar o template do dashboard em `templates/dashboard/main.html` que será exibido após o login do usuário. Esse template deve exibir uma mensagem de boas-vindas e o nome do usuário logado

```html
{% extends 'base.html' %}
{% load static %}

{% block title %}Dashboard - Café com Pão{% endblock %}

{% block dashboard_content %}
  <h1 class="text-4xl mb-4">Bem-vindo à sua conta</h1>
  <p class="mb-6">Aqui você pode gerenciar suas informações e assinaturas.</p>
  <section>
    <h2 class="text-2xl mb-2">Informações do Usuário</h2>
    <p><strong>Nome:</strong> {{ user.first_name }} {{ user.last_name }}</p>
    <p><strong>Email:</strong> {{ user.email }}</p>
  </section>
{% endblock %}
```

### Configuração de Login e Logout

- Vamos configurar a página de login já que a lógica de autenticação já está pronta e sua url ja foi importada anteriormente
- Configurações gerais de autenticação e autorização estão no arquivo `settings.py` do projeto.
- Principais configurações:
- `LOGIN_REDIRECT_URL`: URL de redirecionamento após o login. O Django possui uma URL de redirecionamento padrão, mas podemos criar uma URL de redirecionamento personalizada.
- `LOGOUT_REDIRECT_URL`: URL de redirecionamento após o logout. O Django possui uma URL de redirecionamento padrão, mas podemos criar uma URL de redirecionamento personalizada.

```python

# login redirect
LOGIN_REDIRECT_URL = 'dashboard_main'
LOGOUT_REDIRECT_URL = 'home'
```

- Criar a página de login baseada no protótipo `prototipo/registration_login.html` em `templates/registration/login.html`

```html
{% extends 'base.html' %}
{% load static %}

{% block title %}Login - Café com Pão{% endblock %}

{% block content %}
  <!-- INICIO DO HERO -->
  <div class="hero bg-base-200 min-h-screen">
    <div class="hero-content flex-col gap-20">
      <div class="text-center lg:text-left shrink-0">
        <h1 class="text-5xl font-bold">Acesse sua conta</h1>
      </div>
      <div class="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div class="card-body">
          {% if form.errors %}
          <div class="alert alert-error shadow-lg mb-4">
            <span class="text-xs">
              {% for field_errors in form.errors.values %}
                {% for error in field_errors %}{{ error }} {% endfor %}
              {% endfor %}
            </span>
          </div>
          {% endif %}
          <form method="post" action="{% url 'login' %}">
            {% csrf_token %}
            <fieldset class="fieldset">
              <legend class="fieldset-legend">Email</legend>
              <label class="input">
                <i class="bi bi-envelope opacity-50"></i>
                <input type="email" name="username" required>
              </label>
            </fieldset>
            <fieldset class="fieldset">
              <legend class="fieldset-legend">Senha</legend>
              <label class="input">
                <i class="bi bi-lock opacity-50"></i>
                <input type="password" name="password" required>
              </label>
            </fieldset>
            <button class="btn btn-primary mt-4" type="submit">Entrar</button>
            <a href="{% url 'register' %}" class="btn btn-secondary mt-4">Criar conta</a>
          </form>
        </div>
      </div>
    </div>
  </div>
  <!-- FIM DO HERO -->
{% endblock %}
```

- Vamos alterar o header para exibir o nome do usuário logado caso ele esteja se nào vamos enviá-lo a página de login
- No arquivo `components/header.html` vamos alterar para incluir esse link

```html
<header class="navbar bg-base-100 shadow-sm">
  <div class="navbar-start">
    <div class="dropdown">
      <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
      </div>
      <ul tabindex="0" class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li><a href="{% url 'home' %}">Principal</a></li>
        <li><a href="{% url 'padarias_list' %}">Padarias</a></li>
        <li><a href="{% url 'cestas_list' %}">Cestas</a></li>
        <li><a href="{% url 'contato' %}">Contato</a></li>
      </ul>
    </div>
    <a class="btn btn-ghost text-xl"><i class="bi bi-cup-hot"></i> Café com Pão!</a>
  </div>
  <div class="navbar-center hidden lg:flex">
    <ul class="menu menu-horizontal px-1">
      <li><a href="{% url 'home' %}">Principal</a></li>
      <li><a href="{% url 'padarias_list' %}">Padarias</a></li>
      <li><a href="{% url 'cestas_list' %}">Cestas</a></li>
      <li><a href="{% url 'contato' %}">Contato</a></li>
    </ul>
  </div>
  <div class="navbar-end">
    {% if user.is_authenticated %}
      <a href="{% url 'dashboard_main' %}" class="btn">
        <i class="bi bi-person-fill"></i>
        <span>{{ user.first_name }} {{ user.last_name }}</span>
      </a>
    {% else %}
      <a href="{% url 'login' %}" class="btn">Entrar</a>
    {% endif %}
  </div>
</header>
```

### Área Logada e Logout

- Django já possui uma `view` com a lógica de logout assim como uma rota pré-configurada. Essa rota é chamada `logout` e já está importada no arquivo `urls.py` do projeto
- Vamos melhorar a área logada criando um layout especifico para área logada e um componente de menu. Veja o protótipo `prototipo/dash_main.html`
- No menu lateral da área logada teremos um botão para `logout`
- Criar o template `templates/components/left_menu.html`

```html
<nav class="menu bg-base-200 w-56 p-4">
  <ul>
    <li>
      <a href="{% url 'dashboard_main' %}">
        <i class="bi bi-person"></i>
        Minha Conta
      </a>
    </li>
    {% if user.assinatura %}
    <li>
      <a href="">
        <i class="bi bi-pencil-square"></i>
        Alterar Assinatura
      </a>
    </li>
    <li>
      <a href="">
        <i class="bi bi-x-circle"></i>
        Cancelar Assinatura
      </a>
    </li>
    {% else %}
    <li>
      <a href="">
        <i class="bi bi-credit-card"></i>
        Assinatura
      </a>
    </li>
    {% endif %}
    <li>
      <form action="{% url 'logout' %}" method="post" class="w-full block">
        {% csrf_token %}
        <button type="submit" class="w-full block text-left cursor-pointer">
          <i class="bi bi-box-arrow-right mr-2"></i>
          Sair
        </button>
      </form>
    </li>
  </ul>
</nav>
```

- Criar arquivo `templates/dashboard/base_logged.html` que importa o menu lateral criado anteriormente

```html
{% extends 'base.html' %}

{% block content %}
  <div class="flex min-h-[70vh] max-w-screen-xl mx-auto">
    {% include 'components/left_menu.html' %}
    <main class="flex-1 p-10">
      {% block dashboard_content %}{% endblock %}
    </main>
  </div>
{% endblock %}
```

- Alterar o `extends` do template `templates/dashboard/main.html` para herdar do template `base_logged.html`

```html
{% extends 'dashboard/base_logged.html' %}
{% load static %}

{% block dashboard_content %}
  <h1 class="text-4xl mb-4">Bem-vindo à sua conta</h1>
  <p class="mb-6">Aqui você pode gerenciar suas informações e assinaturas.</p>
  <section>
    <h2 class="text-2xl mb-2">Informações do Usuário</h2>
    <p><strong>Nome:</strong> {{ user.first_name }} {{ user.last_name }}</p>
    <p><strong>Email:</strong> {{ user.email }}</p>
  </section>
  <section class="mt-6">
    <h2 class="text-2xl mb-2">Assinatura Atual</h2>
    {% if user.assinatura %}
      <p><strong>Plano:</strong> {{ user.assinatura.cesta.nome }}</p>
      <p><strong>Data de Início:</strong> {{ user.assinatura.data_inicio }}</p>
    {% else %}
      <p>Você ainda não tem uma assinatura ativa</p>
    {% endif %}
  </section>
{% endblock %}
```

### Atividade

- Reproduzir os passos acima
