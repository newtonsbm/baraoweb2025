## A8 - Projeto Django e Rotas

### Resumo dos Conceitos Importantes

Nesta atividade vamos criar de uma aplicação web fullstack. Diversos frameworks fullstack utilizam o padrão [MVC (Model-View-Controller)](https://developer.mozilla.org/en-US/docs/Glossary/MVC) que no caso particular do django utiliza uma variação desse modelo chamado [MVT (Model-View-Template)](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Django/Introduction). 

Todo framework de desenvolvimento web terá uma estrutura de pastas e arquivos que são necessários para o funcionamento do projeto. No caso do Django, temos a pasta do projeto principal que contém as configurações gerais (settings.py). Além disso todo framework também terá ferramentas de linha de comando (cli tools) que facilitam a criação de novos componentes do projeto além de outros utilitários. No caso do django essas ferramentas são o django-admin e o manage.py.

Por fim, outro conceito importante é da modularização e reuso de código. Todo framework agrupará seu código em módulos que podem ser reutilizados em diferentes projetos. No caso do Django, esses módulos são chamados de aplicações e são criados a partir do comando `startapp` do manage.py.

Outro conceito importante é o de *roteamento* das requisições. As rotas são responsáveis por mapear as URLs acessadas pelo usuário para o código que irá tratar dessa requisiçao. No django, as views são responsáveis por processar as requisições e retornar uma resposta ao usuário. No caso do Django, as views são funções que recebem um objeto `request` e retornam um objeto `response`.

### Projeto Django

- Instalar Python: https://www.python.org/downloads/
- Dentro do repositório clonado
- Instalar Django: `pip install -r requirement.txt` ou `py -m pip -r requirements.txt`
- No Windows: `py -m django-admin startproject cafecompao` ou `python -m django startproject cafecompao`
- Criar projeto Django: `django-admin startproject cafecompao` ou `py -m django startproject cafecompao`

### Aplicação Django

- Entrar na pasta criada do projeto: `cd cafecompao`
- Criar aplicação Django: 
`python manage.py startapp padarias` ou `py manage.py startapp padarias`
- Adicionar aplicação ao projeto em `cafecompao/settings.py`

```python
	INSTALLED_APPS = [
		'django.contrib.admin',
		'django.contrib.auth',
		'django.contrib.contenttypes',
		'django.contrib.sessions',
		'django.contrib.messages',
		'django.contrib.staticfiles',
		'padarias',  # adicionar essa linha
]
``` 

- Verificar se está tudo ok rodando o servidor: `py manage.py runserver` e acessar a página `http://localhost:8000` no navegador

### View e Rota Inicial
- Criar view `home` em `padarias/views.py`

```python
from django.http import HttpResponse

def home(request):
  return HttpResponse('<h1>Olá Django!</h1>')
```

- Criar rota para view `home` em `cafecompao/urls.py`

```python
from padarias import views as padarias_views  # adicionar esse import no início

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', padarias_views.home, name='home'),   # adicionar essa linha
]
```

### Atividade

- Instalar o django a partir do `requirements.txt` do projeto
- `pip install -r requirements.txt`
- Criar o projeto e subir a pasta ‘cafecompao’
- A atividade consiste em realizar os passos de criação da aplicação ‘padarias’ vistas na aula
- `python manage.py startapp padarias`
- Comando alternativo: `py manage.py startapp padarias`
- Criar uma nova view 'sobre' na aplicação padarias que retorna a string 'Página em construção' e realizar a configuração da rota para a url /contato
- `python manage.py run_server`
- Testar a aplicação ver se esta tudo OK acessando ‘localhost:8000/padarias  e localhost:8000/padarias/contato
