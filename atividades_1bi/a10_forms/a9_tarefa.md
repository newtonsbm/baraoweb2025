## A9 - Composição de Templates e Componentes e Arquivos Estáticos

### Resumo dos Conceitos Importantes

Existem diferentes libs e frameworks que permitem a composição de templates e componentes. Essas libs permitem que os desenvolvedores criem templates reutilizáveis e componentes que podem ser utilizados em diferentes partes da aplicação. Um componente é um bloco de código que pode ser reutilizado em diferentes partes da aplicação. Um componente pode ser um cabeçalho, um rodapé, um menu, um formulário, etc. A composição de templates e componentes é uma técnica poderosa que permite a reutilização de código e a criação de interfaces consistentes. 
Frameworks de desenvolvimento web em geral implementam sistemas de templating que usam de duas abordagens principais para construção das páginas web: composição (por meio da inclusão de componentes) e herança (por meio da extensão desses componentes ou templates). 
Os sistemas de template e componentização variam muito em termos de complexidade indo desde de formas simples como componentes web nativos, passando por sistemas de template que criam componentes de baixa/média complexidade (como é o caso do Django) até sistemas de componentização com JSX que permitem incorporar diversos comportamentos diretamente no componente (como é o caso do React e Svelte).
No Django, a composição de templates é feita através de tags e filtros que permitem a inclusão de componentes dentro de outros templates. Além disso, o Django possui um sistema de herança de templates que permite a criação de templates base e a extensão desses templates em outros templates. [Ver mais sobre templates em Django.](https://docs.djangoproject.com/en/5.0/topics/templates/)

### Modificações realizadas no projeto

- Criar a pasta `templates` na pasta da aplicação `padarias`
- Criar a pasta `components` dentro da pasta `templates`
- Instalar o plugin `django-browser-reload` para recarregar automaticamente o navegador quando houver alterações nos arquivos do projeto
- Copiar as imagens para a pasta `static/images`
- Criar o arquivo css `main.css` na pasta `static/css`

### Criar Componentes de Cabeçalho e Rodapé

- Vamos utilizar como base os protótipos HTML criados anteriormente
- Criar os arquivos `header.html` e `footer.html` na pasta `templates/components` 
- Colocar um código inicial no arquivo `header.html` e `footer.html`

arquivo `header.html`
```html
<header>
    <p>Este é o Componente de Header - 
      <a href="">Ir para Principal</a>
      <a href="">Sobre o Café com Pão</a>
    </p>
</header>
 
```

arquivo `footer.html`
```html
<footer>
    <p>Este é o Componente de Footer</p>
</footer>
```

```python
urlpatterns = [
    path('admin/', admin.site.urls),
    path('', padaria_views.home, name='home'),
] 
``` 

### Criar Template Base Principal

- Criar o arquivo `base.html` na pasta `templates` com o seguinte conteúdo

```html
{% load static %}
<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width">
  <title>Café com Pão</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
  <link href="https://cdn.jsdelivr.net/npm/daisyui@5" rel="stylesheet" type="text/css" />
  <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
  <link href="https://cdn.jsdelivr.net/npm/daisyui@5.0.0/themes.css" rel="stylesheet" type="text/css" />
</head>
<body>
  {% include 'components/header.html' %}
  <main>
    {% block content %}{% endblock %}
  </main>
  {% include 'components/footer.html' %}
</body>
</html>
```

- No arquivo `base.html` estamos incluindo os 2 componentes criados anteriormente e definindo o bloco de conteúdo `{% block content %}` para que os templates filhos (aqueles que herdam deste template base) possam sobrescrever o conteúdo desses blocos

### Compor a Página Inicial

- Criar o arquivo `templates/home.html` para herdar do template base `base.html` e sobrescrever o bloco de conteúdo

```html
{% extends 'base.html' %}

{% load static %}

{% block content %}  

<h1> Página Home </h1>

{% endblock %}
```

- No arquivo `home.html` estamos sobrescrevendo o bloco de conteúdo `{% block content %}` com o conteúdo específico da página inicial
- O comando `{% extends 'base.html' %}` é utilizado para herdar do template base `base.html`
- Rodar o servidor de desenvolvimento `py manage.py runserver` e acessar a página `http://localhost:8000/` no navegador e verificar se a página `home.html` é exibida corretamente com o cabeçalho e rodapé criados

### Alterar View para Renderizar HTML no Servidor 

- No arquivo `views.py`
- Alterar o retorno do HttpResponse para renderizar o template `home.html`

```python

def home(request): 
    return render(request, 'home.html')

```
### Roteando para a Home 

- Alterar o menu principal em `templates/components/header.html` para incluir o link para a página principal usando a template tag `{% url 'nome_da_view' %}`

```html
<header>
    <p>Este é o Componente de Header - 
      <a href="{% url 'home' %}">Ir para Principal</a>
      <a href="">Sobre o Café com Pão</a>
    </p>
</header>
```

- A template tag `{% url 'nome_da_rota' %}` é utilizada para gerar a URL correta para a rota especificada. No caso do desenvolvimento local a URL será `http://localhost:8000/nome_da_rota` e em produção a URL será algo como `http://www.cafecompao.com/nome_da_rota`
- A URL para a rota `home` é gerada dinamicamente pela template tag `{% url 'home' %}`


### Arquivos Estáticos - Imagens e CSS

- No desenvolvimento local, os arquivos estáticos são servidos pelo servidor de desenvolvimento. Em produção, os arquivos estáticos são servidos por um servidor de arquivos estáticos como o `whitenoise`, um bucket (S3 ou GCP) ou uma CDN (Content Delivery Network). Neste caso a template tag `static` irá gerar a URL correta para o arquivo estático dependendo do ambiente de execução.
- A tag `{% load static %}` é utilizada para carregar os arquivos estáticos como imagens, css e js dinamicamente
- Isso significa que cada arquivo estático terá uma rota específica que será gerada dinamicamente pelo Django
- Essa rota pode estar no próprio servidor de desenvolvimento ou em um servidor de arquivos estáticos em produção ou em um bucket ou CDN
- Outro tipo de arquivo estático são arquivos de mídia como imagens, vídeos, áudios, etc
- Geralmente esses arquivos são armazenados em um diretório específico chamado `media` e são servidos por um servidor de arquivos estáticos ou por um servidor de mídia
- Vamos carregar dinamicamente as rotas estáticas e de arquivos de mídia em `urls.py` 

```python	
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', padarias_views.home, name='home'),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT) + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
```

- A função `static` é utilizada para carregar as rotas estáticas e de arquivos de mídia dinamicamente
- Vamos configurar as váriaveis `STATIC_URL`, `STATIC_ROOT`, `MEDIA_URL` e `MEDIA_ROOT` no arquivo `settings.py`

```python
STATIC_URL = '/static/'
STATIC_ROOT =  BASE_DIR / 'static'

MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'
```

- A variável `BASE_DIR` é utilizada para definir o diretório base do projeto Django
- O diretório `static` é utilizado para armazenar arquivos estáticos do projeto todo como imagens, css e js
- O diretório `media` é utilizado para armazenar arquivos de mídia relacionados aos model do projeto como imagens, vídeos, áudios, etc
- Copiar as imagens que estão em `doc/prototipos/images` para a pasta `static/images` do projeto

- Ajustar a url para imagens usando a tag `{% static 'caminho_da_imagem_na_pasta_static' %}`


- Arquivo `home.html`

```html
{% extends 'base.html' %}

{% load static %}

{% block content %}  

<h1> Página Home </h1>
<img src="{% static 'images/cafe.jpg' %}" alt="Café com Pão" />

{% endblock %}
```

- A tag `{% static 'images/cafe.png' %}` é utilizada para carregar a URL correta para a imagem 'cafe.png' que está na pasta `static/images` do projeto
- A mesma coisa podemos fazer para outros arquivos estáticos como css e js

### Atividade na Aula

- Reproduzir os passos acima
- Utilizar o arquivo html da pasta `doc/prototipo`, particularmnete o `home.html` para criar os componentes `header`, `footer` e o template final de `home.html`
- Fazer o mesmo processo para a página `contato.html`
  - Criar template `contato.html` que herda do template base e inclui o cabeçalho e rodapé e um conteúdo simples
  - Alterar a view para retornar o template `contato.html`
  - Criar a rota para a view `contato` em `urls.py`
  - Alterar o menu principal em `templates/components/header.html` para incluir o link para a página de contato
- Alterar as rotas das imagens e das URLs corretamente usando a tag `{% static %}` e `{% url %}`