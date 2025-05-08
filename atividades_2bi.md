# Programação Web - Atividades Práticas do 2 Bi

Prof. Newton Miyoshi - newton.miyoshi@baraodemaua.br

## TLDR

- [11. A11 Bancos de Dados e ORM - Introdução](#a11---bancos-de-dados-e-orm---introdução)
- [12. A12 Models e Admin](#a12---models-e-admin)
- [13. A13 Fixtures e List e Detail de Cestas](#a13---fixtures-e-list-e-detail-de-cestas)
- [14. A14 Autenticação e Autorização](#a14---autenticação-e-autorização)
- [15. A15 Autenticação e Autorização - Parte 2](#a15---autenticação-e-autorização---parte-2)
- [16. A16 API REST com Django Rest Framework](#a16---api-rest-com-django-rest-framework)
- [17. A17 Aplicação FrontEnd](#a17---aplicação-frontend)

## A11 - Bancos de Dados e ORM - Introdução

### Resumo dos Conceitos Importantes

Nesta atividade vamos trabalhar com bancos de dados e o ORM (Object Relational Mapping). O ORM é uma técnica de mapeamento de objetos para tabelas de banco de dados relacionais. O ORM permite que o desenvolvedor utilize objetos e métodos para manipular dados no banco de dados sem a necessidade de escrever SQL diretamente. Além de abstrair a comunicação com o banco de dados, o ORM facilita o desenvolvimento de consultas e lida com diversos aspectos como segurança, otimização, migrações e consistência dos dados.

O Django possui um ORM poderoso que permite a criação de modelos de dados, consultas complexas e migrações de banco de dados de forma simples e eficiente. [Ver mais sobre ORM em Django.](https://docs.djangoproject.com/en/5.0/topics/db/models/)

Outros conceitos que vamos ver é o de migrations e fixtures. Migrations são arquivos que contém as alterações no banco de dados e são gerados pelo ORM sempre que existe alguma alteração no modelo de dados. As migrations representam as alterações no banco de dados e portanto são versionadas e podem ser revertidas. Fixtures são arquivos que contém dados iniciais para popular o banco de dados. Fixtures são úteis para popular o banco de dados com dados de teste ou dados iniciais para a aplicação (dados de configuração).

### Tabela de Feedback

![Modelo de Dados](doc/feedback-table.png)

### Criar Model de Feedback 

- Models são classes que representam as tabelas do banco de dados. Cada atributo da classe representa uma coluna da tabela. O Django possui diversos tipos de campos que representam os tipos de dados do banco de dados. [Ver mais sobre modelos de dados em Django.](https://docs.djangoproject.com/en/5.0/topics/db/models/#fields)
- Vamos criar o modelo que representa o Feedback enviado pelo usuário via formulário de contato
- Criar modelo de dados para `Feedback` em `padarias/models.py`

```python
class Feedback(models.Model):

    nome = models.CharField("Nome", max_length=100)
    email = models.EmailField("Email")
    assunto = models.CharField("Assunto", max_length=200)
    avaliacao = models.IntegerField("Avaliação")
    mensagem = models.TextField("Mensagem", null=True, blank=True)

    def __str__(self):
      return f"Feedback de {self.nome} - {self.email} - {self.assunto}"

``` 

### Criar Migration

- Criar migration automaticamente para o modelo de dados `Feedback` com o comando `python manage.py makemigrations`
- Verificar que o arquivo de migration foi criado em `padarias/migrations`
- Aplicar a migration com o comando `py manage.py migrate`
- Verificar que a tabela `padarias_feedback` foi criada no banco de dados

### Verificar Dados no Banco de Dados

- Instalar o sqlite browser: https://sqlitebrowser.org/dl/
- Abrir o arquivo `db.sqlite3` que esta na raiz do projeto com o sqlite browser e verificar se as categorias foram carregadas corretamente
- Existe uma extensão no VS Code chamada `SQLite` que também pode ser utilizada para visualizar o banco de dados

### Atividade em Aula
- Reproduzir os passos acima
- Alterar o campo para incluir o telefone no model
- Gerar a migration com o comando `python manage.py makemigrations` 
- Aplicar a migration com o comando `python manage.py migrate`
- Verificar se a tabela `padarias_feedback` foi criada corretamente no banco de dados
- Implementar página do protótipo `prototipo/cestas_list.html`, criar a view `cestas_list` e a rota para essa view com o mesmo nome `cestas_list`

## A12 - Models e Admin

### Resumo dos Conceitos Importantes

Vamos terminar a atividade anterior criando os modelos principais do Cafe com Pão e explorar outras possibilidades do ORM. Vamos criar os modelos de dados para `Categoria`, `Produto` e `Cesta` e `Endereço`.
Nesta atividade vamos trabalhar com o Django Admin. O Django Admin é uma interface administrativa que permite a criação, edição e exclusão de dados do banco de dados dos models registrados (CRUD - Create, Retrieve, Update e Delete). O Django Admin é uma ferramenta poderosa que permite a criação de interfaces administrativas de forma rápida e eficiente. Sua vantagem é ser altamente customizável e permite a criação de interfaces administrativas complexas e personalizadas.

### Diagrama Entidade Relacionamento do Cafe com Pão

![Modelo de Dados](doc/erd.png)
- Os principais models do Cafe com Pão são: `Categoria`, `Produto`, `Cesta` e `Endereço`
- `Categoria` representa a categoria de produtos (ex: Pães, Bolos, Doces, Salgados, Sucos, Frutas)
- `Produto` representa um produto que pode ser vendido (ex: Pão Francês, Bolo de Chocolate, Brigadeiro, Coxinha, Banana, Suco de Laranja)
- `Cesta` representa um nível de Cesta de café da manhã que pode ser assinada pelo usuário (ex: Cesta Simples, Cesta Completa, Cesta Personalizada)
- `Padaria` representa a padaria que faz parte da rede Café com Pão e vende os produtos e cestas
- `Endereço` representa o endereço de entrega do usuário

Os principais relacionamentos são:
- `Produto` pertence a somente uma `Categoria` e uma `Categoria` pode ter vários `Produtos`
- `Cesta` contém vários `Produtos` e pode ser preparada por várias `Padarias`
- `Endereço` pertence a uma `Padaria` e uma Padaria só pode ter 1 `Endereço`

### Criar Models de Categoria e Produto

- Criar os models de `Categoria` e `Produto` em `padarias/models.py`

```python
class Categoria(models.Model):
    nome = models.CharField(
        verbose_name="Nome", max_length=100, unique=True, null=False, blank=False, help_text="Nome da categoria")

    def __str__(self):
        return self.nome


class Produto(models.Model):
    nome = models.CharField(
        verbose_name="Nome", max_length=100, unique=True, null=False, blank=False, help_text="Nome do produto")
    descricao = models.TextField(
        verbose_name="Descrição", null=True, blank=True, help_text="Descrição do produto")
    preco = models.DecimalField(
        verbose_name="Preço", max_digits=10, decimal_places=2, null=False, blank=False, help_text="Preço do produto")
    categoria = models.ForeignKey(
        Categoria, on_delete=models.SET_NULL, verbose_name="Categoria", null=True, help_text="Categoria do produto")

    def __str__(self):
        return self.nome
```

- Criar as migrations para os models de `Categoria` e `Produto` com o comando `python manage.py makemigrations`
- Aplicar as migrations com o comando `python manage.py migrate`
- Verificar se as tabelas `padarias_categoria` e `padarias_produto` foram criadas corretamente no banco de dados

### Relacionamento 1-N 

- O relacionamento entre os models é feito através de chaves estrangeiras. No exemplo acima, o model `Produto` possui uma chave estrangeira para o model `Categoria`. Isso significa que um `Produto` pertence a uma `Categoria` e uma `Categoria` pode ter vários `Produtos`.
- Neste caso a chave estrangeira é do tipo `ForeignKey` que é um relacionamento de muitos para um. [Ver mais sobre relacionamentos em Django.](https://docs.djangoproject.com/en/5.0/topics/db/models/#relationships)
- Ambos os models possuem a função `__str__` que é uma função especial que retorna uma representação em string do objeto. Essa função é utilizada para exibir o objeto no Django Admin e em outras partes da aplicação. Análogo ao método `toString` em Java.

### Models de Cesta, Padaria e Endereço

- No arquivo `padarias/models.py` adicionar os models de `Cesta`, `Padaria` e `Endereço`

```python

class Padaria(models.Model):
    nome = models.CharField(
        verbose_name="Nome", max_length=100, unique=True, null=False, blank=False, help_text="Nome da padaria")
    descricao = models.TextField(
        verbose_name="Descrição", null=True, blank=True, help_text="Descrição da padaria")
    cestas = models.ManyToManyField(
        'Cesta', verbose_name="Cestas", help_text="Cestas da padaria", related_name="padarias")
    imagem = models.ImageField(
        verbose_name="Imagem", upload_to="padarias", null=True, blank=True, help_text="Imagem da padaria")
    telefone = models.CharField(
        verbose_name="Telefone", max_length=20, null=True, blank=True, help_text="Telefone da padaria")
    email = models.EmailField(
        verbose_name="E-mail", null=True, blank=True, help_text="E-mail da padaria")

    def __str__(self):
        return self.nome


class Cesta(models.Model):

    class Niveis(models.TextChoices):
        BASICO = 'B', 'Básico'
        MEDIO = 'M', 'Médio'
        PREMIUM = 'P', 'Premium'

    nome = models.CharField(
        verbose_name="Nome", max_length=100, unique=True, null=False, blank=False, help_text="Nome da cesta")
    descricao = models.TextField(
        verbose_name="Descrição", null=True, blank=True, help_text="Descrição da cesta")
    preco = models.DecimalField(
        verbose_name="Preço", max_digits=10, decimal_places=2, null=False, blank=False, help_text="Preço da cesta")
    produtos = models.ManyToManyField(
        Produto, verbose_name="Produtos", help_text="Produtos da cesta", related_name="cestas")
    nivel = models.CharField(
        verbose_name="Nível", max_length=1, choices=Niveis.choices, default=Niveis.BASICO, help_text="Nível da cesta")
    imagem = models.ImageField(
        verbose_name="Imagem", upload_to="cestas", null=True, blank=True, help_text="Imagem da cesta")

    def __str__(self):
        return self.nome


class Endereco(models.Model):
    rua = models.CharField(
        verbose_name="Rua", max_length=100, null=False, blank=False, help_text="Rua do endereço")
    numero = models.CharField(
        verbose_name="Número", max_length=10, null=False, blank=False, help_text="Número do endereço")
    complemento = models.CharField(
        verbose_name="Complemento", max_length=100, null=True, blank=True, help_text="Complemento do endereço")
    bairro = models.CharField(
        verbose_name="Bairro", max_length=100, null=True, blank=True, help_text="Bairro do endereço")
    cidade = models.CharField(
        verbose_name="Cidade", max_length=100, null=False, blank=False, help_text="Cidade do endereço")
    estado = models.CharField(
        verbose_name="Estado", max_length=2, null=False, blank=False, help_text="Estado do endereço")
    cep = models.CharField(
        verbose_name="CEP", max_length=8, null=False, blank=False, help_text="CEP do endereço")
    padaria = models.OneToOneField(
        Padaria, on_delete=models.CASCADE, verbose_name="Padaria", null=True, help_text="Padaria do endereço", related_name="endereco"
    )

    def __str__(self):
        return f"{self.rua}, {self.numero} - {self.cidade}/{self.estado}"
```

- Criar as migrations para os models de `Padaria`, `Cesta` e `Endereço` com o comando `python manage.py makemigrations`
- Aplicar as migrations com o comando `python manage.py migrate`

### Relacionamentos 1-1 e N-M

- O model `Endereço` possui um relacionamento de um para um com o model `Padaria`. Isso significa que um `Endereço` pertence a uma `Padaria` e uma `Padaria` só pode ter um `Endereço`. Neste caso a chave estrangeira é do tipo `OneToOneField` que é um relacionamento de um para um.
- O model `Padaria` possui um relacionamento de muitos para muitos com o model `Cesta`. Isso significa que uma `Padaria` pode ter várias `Cestas` e uma `Cesta` pode ser vendida por várias `Padarias`. Neste caso a chave estrangeira é do tipo `ManyToManyField` que é um relacionamento de muitos para muitos.

### Valores Fixos (Enums ou Choices)

- Muitas vezes é necessário criar campos que possuem valores fixos. Por exemplo, o campo `nivel` do model `Cesta` possui valores fixos que representam o nível da cesta (Básico, Médio, Premium). Para isso, podemos utilizar o campo `choices` que é uma lista de tuplas que representam os valores possíveis para o campo. No Django representamos isso com a classe `TextChoices` que é uma subclasse de `Choices` que representa valores de texto.
- Esse tipo de dado também é conhecido como Enumerado ou Enums.

### Django Admin

- O Django Admin é uma interface administrativa que permite a criação, edição e exclusão de dados do banco de dados dos models registrados (CRUD - Create, Retrieve, Update e Delete).
- Para registrar um model no Django Admin, é necessário criar uma classe que herda de `admin.ModelAdmin` e registrar o model com a função `admin.site.register(Model, ModelAdmin)`
- No arquivo `padarias/admin.py` registrar os models de `Categoria`, `Produto`, `Cesta`, `Padaria` e `Endereço`

```python
from django.contrib import admin
from . import models

# Register your models here.
admin.site.register(models.Categoria)
admin.site.register(models.Padaria)
admin.site.register(models.Produto)
admin.site.register(models.Cesta)
admin.site.register(models.Endereco)
```

- Para logar precisamos ter um superusuário. Criar um superusuário com o comando `python manage.py createsuperuser` e seguir as instruções
- Rodar o servidor com o comando `python manage.py runserver` e acessar o Django Admin em `http://localhost:8000/admin/`
- Logar com o superusuário criado e verificar se os models de `Categoria`, `Produto`, `Cesta`, `Padaria` e `Endereço` estão disponíveis para edição

### Atividade

- Reproduzir os passos acima
- Utilizando a ferramenta de admin do Django crie alguns registros nas categorias registradas
- Lembre de associar os produtos criados
- Navegue no banco criado com sqlitebrowser ou a extensão do VSCode Sqlite Viewer e verifique se os dados foram inseridos corretamente

## A13 - Fixtures e List e Detail de Cestas

### Resumo dos Conceitos Importantes

- Fixtures são arquivos que contém dados iniciais para popular o banco de dados. Fixtures são úteis para popular o banco de dados com iniciais para a aplicação (dados de configuração) ou muitas vezes com dados de teste.
- Fixtures podem ser criadas em diversos formatos como JSON, XML e YAML. O Django possui suporte nativo para JSON. Outro nome para Fixtures é Seeders ou Seed Data. 
- Uma vez criada a fixture, podemos carregar os dados no banco de dados com o comando `python manage.py loaddata <nome_da_fixture>`
- No Django, as fixtures são armazenadas na pasta `fixtures` dentro do app. O Django procura por arquivos de fixture nessa pasta e carrega os dados no banco de dados.
- CRUD - Create, Retrieve, Update e Delete. São as operações básicas de manipulação de dados em um banco de dados. O Django possui suporte nativo para essas operações através do ORM.
- Vamos criar fixture para carregar os dados iniciais de `Categoria`, `Produto` e `Cesta` no banco de dados. Vamos criar um arquivo JSON com os dados iniciais e carregar os dados no banco de dados com o comando `python manage.py loaddata <nome_da_fixture>`

### Carregar Fixtures

- Verificar as fixtures disponíveis na pasta `padarias/fixtures`
- Carregar as fixtures com o comando `python manage.py loaddata <nome_da_fixture>`
- A ordem de carregamento das fixtures é importante. O Django carrega as fixtures na ordem em que foram criadas. Portanto, se uma fixture depende de outra, a fixture dependente deve ser carregada depois da fixture que ela depende.
- Essa dependência é feita por meio de chaves estrangeiras. Por exemplo, se a fixture de `Produto` depende da fixture de `Categoria`, a fixture de `Produto` deve ser carregada depois da fixture de `Categoria`
- Vamos carregar nessa ordem: `categorias`, `produtos`, `cestas`, `padarias` e `enderecos`

```bash
python manage.py loaddata categorias produtos cestas padarias enderecos
```

- Verificar se os dados foram carregados corretamente no banco de dados abrindo o admin do Django em `http://localhost:8000/admin/` após iniciar o servidor com o comando `python manage.py runserver` 
- As imagens referente aos produtos e cestas estão na pasta `media` que foi criada na raiz do projeto. O Django serve os arquivos estáticos da pasta `media` automaticamente. Isso é feito a partir da configuração `MEDIA_URL` e `MEDIA_ROOT` no arquivo `settings.py` e, no ambiente de desenvolvimento, no arquivo `urls.py` do projeto. 

### Listando Cestas

- Vamos alterar a view `cestas_list` em `padarias/views.py` para carregar todas as padarias do banco de dados e exibir na página `templates/cestas/cestas_list.html` 
- No arquivo `padarias/views.py`:

```python
# no inicio do arquivo importar os models
from .models import Padaria, Cesta

def cestas_list(request):
    cestas = Cesta.objects.all()
    context = {
        'cestas': cestas,
    }
    return render(request, 'cestas/cestas_list.html', context=context)
```

- Agora vamos alterar o template `templates/cestas/cestas_list.html` para exibir as padarias no lugar dos dados mocados
- No template poderemos acessar a lista de cestas por meio da variável `cestas` que foi passada no contexto da view
- Como essa variavel é uma lista, podemos iterar sobre ela com o comando `{% for cesta in cestas %}` e exibir os dados de cada padaria
- Também podemos verificar se existem cestas na lista com o comando `{% if cestas %}` e exibir uma mensagem caso não existam cestas cadastradas 

```html

{% extends 'base.html' %}
{% load static %}

{% block title %}Cestas - Café com Pão{% endblock %}

{% block content %}
  <!-- INICIO DO HERO -->
  <div class="hero min-h-[70vh]" style="background-image: url({% static 'images/padaria2.png' %});">
    <div class="hero-overlay"></div>
    <div class="hero-content text-neutral-content text-center">
      <div class="max-w-2xl">
        <h1 class="mb-5 text-5xl font-bold">Cestas incríveis para TODOS os gostos!</h1>
      </div>
    </div>
  </div>
  <!-- FIM DO HERO -->
  <!-- INICIO DO MAIN HOME -->
  <main class="max-w-4xl mx-auto my-20">
    <h1 class="text-4xl">Nossas Cestas</h1>
    <section class="my-10 flex gap-5 flex-wrap justify-center">
      {% for cesta in cestas %}
        <div class="card bg-base-100 w-70 shadow-sm">
          <figure>
            <img class="aspect-video" src="{{ cesta.imagem.url }}" alt="{{ cesta.nome }}" />
          </figure>
          <div class="card-body">
            <h2 class="card-title">{{ cesta.nome }}</h2>
            <p>{{ cesta.descricao }}</p>
            <div class="card-actions justify-end">
              <a href="{% url 'cestas_detail' cesta.pk %}" class="btn btn-primary">Ver mais</a>
            </div>
          </div>
        </div>
      {% endfor %}
    </section>
  </main>
  <!-- FIM DO MAIN HOME -->
{% endblock %}

```

Alguns pontos importantes a se destacar:
- Verifique que estamos acessando a imagem da cesta com `{{ cesta.imagem.url }}`
- Podemos acessar os atributos de um objeto com o ponto. Por exemplo, para acessar o nome da cesta, utilizamos `{{ cesta.nome }}`
- Criamos um link para a página de detalhes da cesta com o comando `{% url 'cestas_detail' cesta.pk %}`. O `cesta.pk` é o id da cesta que foi gerado automaticamente pelo Django. O Django gera um id único para cada objeto criado no banco de dados. Esse id é chamado de `pk` (primary key) e é utilizado para identificar o objeto no banco de dados.
- Se rodarmos o servidor teremos um erro pois não criamos ainda a view e a rota para a página de detalhes da cesta. Vamos criar a view e a rota para a página de detalhes da cesta.

### Criar View e Rota para Detalhes da Cesta

- Precisamos criar a `view`, a rota em `urls.py` e o template na pasta `templates/cesta`
- Criar a view `cestas_detail` em `padarias/views.py` para exibir os detalhes da cesta. Essa view deve receber o `pk`(id) da cesta como parâmetro e carregar a cesta no banco de dados. Em seguida, deve passar a cesta para o template `templates/cestas/cestas_detail.html`.
- No arquivo `padarias/views.py`:

```python
def cestas_detail(request, pk):
    cesta = get_object_or_404(Cesta, pk=pk)
    context = {
        'cesta': cesta,
    }
    return render(request, 'cestas/cestas_detail.html', context)
```

- Vamos criar a rota para receber o `pk` da cesta em `padarias/urls.py`:

```python
urlpatterns = [
    ...
    path('cestas/<int:pk>/', padarias_views.cestas_detail, name='cestas_detail'), # INCLUIR ESSA ROTA
    ...
]
```

### Criar Template de Detalhes da Cesta

- Criar o template `templates/cestas/cestas_detail.html` para exibir os detalhes da cesta. Esse template deve exibir o nome, descrição, preço e imagem da cesta. Além disso, deve exibir os produtos que fazem parte da cesta.
- Utilizar como base o protótipo `prototipo/cestas_detail.html` e o template `templates/cestas/cestas_list.html` para criar o template de detalhes da cesta

```html
{% extends 'base.html' %}
{% load static %}

{% block title %}{{ cesta.nome }} - Café com Pão{% endblock %}

{% block content %}
  <!-- INICIO DO HERO -->
  <div class="hero bg-base-200 min-h-[50vh]">
    <div class="hero-content flex-col lg:flex-row-reverse">
      <img src="{{ cesta.imagem.url }}" class="max-w-lg rounded-lg shadow-2xl" alt="{{ cesta.nome }}" />
      <div>
        <h1 class="text-5xl font-bold">{{ cesta.nome }}</h1>
        <p class="py-6">{{ cesta.descricao }}</p>
        <span class="text-2xl font-bold">R$ {{ cesta.preco }}</span>
      </div>
    </div>
  </div>
  <!-- FIM DO HERO -->
  <!-- INICIO DO MAIN HOME -->
  <main class="max-w-4xl mx-auto my-20">
    <h1 class="text-4xl">Produtos da Cesta</h1>
    <table class="table w-full my-10">
      <thead>
        <tr>
          <th>Produto</th>
          <th>Preço</th>
          <th>Categoria</th>
          <th>Descrição</th>
        </tr>
      </thead>
      <tbody>
        {% for produto in cesta.produtos.all %}
          <tr>
            <td>{{ produto.nome }}</td>
            <td>R$ {{ produto.preco }}</td>
            <td>{{ produto.categoria }}</td>
            <td>{{ produto.descricao }}</td>
          </tr>
        {% endfor %}
      </tbody>
    </table>
    <a href="{% url 'cestas_list' %}" class="btn">Ver todas as cestas</a>
  </main>
  <!-- FIM DO MAIN HOME -->
{% endblock %}
```

- O template de detalhes da cesta exibe o nome, descrição, preço e imagem da cesta. Além disso, exibe os produtos que fazem parte da cesta em uma tabela. Para isso, utilizamos o comando `cesta.produtos.all` que retorna todos os produtos que fazem parte da cesta. Esse comando é gerado automaticamente pelo Django e utiliza o relacionamento de muitos para muitos entre os models `Cesta` e `Produto`.

### Atividade
- Reproduzir os passos acima
- Criar a página de listagem de padarias alterando a view `padarias_list` e o template `templates/padarias/padarias_list.html`


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


## A15 - Edit e Delete

### Resumo dos Conceitos Importantes

- Editar e deletar são operações básicas de manipulação de dados em um banco de dados. O Django possui suporte nativo para essas operações através do ORM.
- Nessa tarefa vamos criar as views, rotas e templates para criar, editar e deletar uma Assinatura de cesta de café da manhã para o usuário logado.
- O primeiro passo é criar o model de Assinatura que vai representar a assinatura do usuário. Esse model deve ter os campos de `user`, `cesta`, `observacao` e `data_inicio`. O campo `user` deve ser uma chave estrangeira para o model `User` e o campo `cesta` deve ser uma chave estrangeira para o model `Cesta`. Os campos `data_inicio` deve ser do tipo `DateField`. 

### Model Assinatura

- No arquivo `padarias/models.py` criar o model `Assinatura` 

```python

class Assinatura(models.Model):
    user = models.OneToOneField(
        'auth.User', on_delete=models.CASCADE, verbose_name="Usuário", null=False, help_text="Usuário da assinatura", related_name="assinatura")
    cesta = models.OneToOneField(
        Cesta, on_delete=models.CASCADE, verbose_name="Cesta", null=False, help_text="Cesta da assinatura", related_name="assinatura")
    data_inicio = models.DateField("Data de início", null=False, blank=False, help_text="Data de início da assinatura", auto_now_add=True)
    observacao = models.TextField("Observação", null=True, blank=True, help_text="Observação da assinatura")

```

- Criar a migração para o model `Assinatura` com o comando `python manage.py makemigrations` e aplicar a migração com o comando `python manage.py migrate`

### Create e Update de Assinatura

- No arquivo `padarias/views.py` criar a view `assinatura_create` para criar uma nova assinatura e a view `assinatura_update` para atualização de uma assinatura.  Caso o usuário esteja logado, deve carregar todas as cestas do banco de dados e exibir, basear no protótipo `prototipo/dash_assinatura_update.html`.
- Criar as views no arquivo `padarias/views.py`

```python
# importar model Assinatura
from .models import Padaria, Cesta, Assinatura

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

```

- Criar as rotas em `urls.py`

```python	
urlpatterns = [
    ...
    path('assinaturas/create/', padarias_views.assinatura_create, name='assinatura_create'),
    path('assinaturas/update/', padarias_views.assinatura_update, name='assinatura_update'),
    ...
] 
```

- Criar os templates para criação e atualização de assinatura
- Criar o arquivo `templates/assinaturas/create.html`

```html
{% extends 'dashboard/base_logged.html' %}
{% load static %}

{% block title %}Criar Assinatura - Café com Pão{% endblock %}

{% block dashboard_content %}
  <h1 class="text-2xl my-4">Criar Assinatura</h1>
  <form action="{% url 'assinatura_create' %}" method="post" class="space-y-4">
    {% csrf_token %}
    <div>
      <label for="cesta" class="block text-sm font-medium text-gray-700">Escolha a cesta:</label>
      <select id="cesta" name="cesta" class="select select-bordered w-full max-w-xs">
        {% for cesta in cestas %}
          <option value="{{ cesta.id }}">{{ cesta.nome }}</option>
        {% endfor %}
      </select>
    </div>
    <div>
      <label for="observacoes" class="block text-sm font-medium text-gray-700">Observações:</label>
      <textarea id="observacoes" name="observacoes" rows="4" class="textarea textarea-bordered w-full" placeholder="Digite suas observações aqui..."></textarea>
    </div>
    <div class="flex space-x-4">
      <button type="submit" class="btn btn-primary">Confirmar Assinatura</button>
      <a href="{% url 'dashboard_main' %}" class="btn btn-secondary">Cancelar</a>
    </div>
  </form>
{% endblock %}
```

- Criar arquivo `templates/assinaturas/update.html`

```html
{% extends 'dashboard/base_logged.html' %}
{% load static %}

{% block title %}Alterar Assinatura - Café com Pão{% endblock %}

{% block dashboard_content %}
  <h1 class="text-2xl my-4">Alterar Assinatura</h1>
  <form action="{% url 'assinatura_update' %}" method="post" class="space-y-4">
    {% csrf_token %}
    <div>
      <label for="cesta" class="block text-sm font-medium text-gray-700">Escolha a nova cesta:</label>
      <select id="cesta" name="cesta" class="select select-bordered w-full max-w-xs">
        {% for cesta in cestas %}
          <option value="{{ cesta.id }}" {% if cesta.id == assinatura.cesta.id %}selected{% endif %}>{{ cesta.nome }}</option>
        {% endfor %}
      </select>
    </div>
    <div>
      <label for="observacoes" class="block text-sm font-medium text-gray-700">Observações:</label>
      <textarea id="observacoes" name="observacoes" rows="4" class="textarea textarea-bordered w-full" placeholder="Digite suas observações aqui...">{{ assinatura.observacao }}</textarea>
    </div>
    <div class="flex space-x-4">
      <button type="submit" class="btn btn-primary">Confirmar Alteração</button>
      <a href="{% url 'dashboard_main' %}" class="btn btn-secondary">Cancelar</a>
    </div>
  </form>
{% endblock %}
```

### Delete de Assinatura

- Vamos criar a view, rota e template para cancelar uma assinatura
- Criar a view `assinatura_delete` em `padarias/views.py`

```python
@login_required
def assinatura_delete(request):
    assinatura = get_object_or_404(Assinatura, user=request.user)
    if request.method == 'POST':
        assinatura.delete()
        messages.success(request, 'Assinatura cancelada com sucesso!')
        return redirect('dashboard_main')
    return render(request, 'assinaturas/delete.html', {'assinatura': assinatura})
```

- Criar a rota em `urls.py`

```python
urlpatterns = [
    ...
    path('assinaturas/delete/', padarias_views.assinatura_delete, name='assinatura_delete'),
    ...
]
```

- Usar como base o protótipo `prototipo/dash_assinatura_delete.html`
- Criar arquivo `templates/assinaturas/delete.html`

```html
{% extends 'dashboard/base_logged.html' %}
{% load static %}

{% block title %}Cancelar Assinatura - Café com Pão{% endblock %}

{% block dashboard_content %}
  <div class="">
    <h2 class="text-xl font-bold">Plano Atual</h2>
    <p>Cesta: <span class="font-medium">{{ assinatura.cesta.nome }}</span></p>
    <p>Valor: <span class="font-medium">R$ {{ assinatura.cesta.preco }}</span></p>
    <p>Data de Início: <span class="font-medium">{{ assinatura.data_inicio }}</span></p>
    <div class="mt-6">
      <p class="text-lg">Ops! 😅</p>
      <p class="text-lg">Tem certeza de que quer dar tchau para as delícias matinais do Café com Pão?</p>
      <p class="mt-4">Se mudar de ideia, estamos aqui para te receber de volta com pães quentinhos e cafés especiais. 🥐</p>
    </div>
    <form action="{% url 'assinatura_delete' %}" method="post" class="flex space-x-4 mt-6">
      {% csrf_token %}
      <button type="submit" class="btn btn-primary">Confirmar Cancelamento</button>
      <a href="{% url 'dashboard_main' %}" class="btn btn-secondary">Voltar ao Menu Principal</a>
    </form>
  </div>
{% endblock %}
```


### Atualizar Menu da Área Logada

- Atualizar o template `templates/components/left_menu.html` para incluir o link para a página de criar assinatura e alterar assinatura

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
      <a href="{% url 'assinatura_update' %}">
        <i class="bi bi-pencil-square"></i>
        Alterar Assinatura
      </a>
    </li>
    <li>
      <a href="{% url 'assinatura_delete' %}">
        <i class="bi bi-x-circle"></i>
        Cancelar Assinatura
      </a>
    </li>
    {% else %}
    <li>
      <a href="{% url 'assinatura_create' %}">
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

### Atividade

- Reproduzir os passos acima
Desafio:
- Criar um model de Perfil para cadastrar outras informações importantes do Usuário
- Perfil tem relacionamento 1-1 com User
- Cadastrar algumas informações como: telefone, endereço, CPF, data de nascimento, etc
- Criar uma view para editar o perfil do usuário logado
- Criar rota e template para editar o perfil do usuário logado
- Exibir os dados do perfil na área logada

## A16 - Serviços Web e API REST

### Resumo dos Conceitos Importantes
- Serviço Web (ou Web API) é um sistema que permite a comunicação entre diferentes aplicações através da internet 
- Geralmente utiliza o protocolo HTTP para comunicação e troca de dados entre aplicações
- Frequentemente utiliza o formato JSON para troca de dados entre aplicações
- API REST é um tipo de serviço web que utiliza os princípios da arquitetura REST (Representational State Transfer) para comunicação entre aplicações
- APIs RESTful são projetadas para serem escaláveis e fáceis de usar, permitindo a integração entre diferentes sistemas

### Principal diferença entre Serviço Web e Aplicação Web Fullstack
- A principal diferença entre um serviço web e uma aplicação web fullstack é que o serviço web é projetado para fornecer dados e funcionalidades para outras aplicações, enquanto a aplicação web fullstack é projetada para fornecer uma interface de usuário completa e interativa para os usuários finais.
- Do ponto de vista do servidor, os serviços web geralmente respondem a requisições HTTP com dados em formato JSON ou XML, enquanto as aplicações web fullstack respondem a requisições HTTP com páginas HTML completas que podem incluir scripts, estilos e outros recursos.

### API Rest
- A API Rest possui diversas boas práticas que devem ser seguidas para garantir a escalabilidade e a facilidade de uso da API
- Algumas dessas boas práticas incluem:
- Usar os métodos HTTP corretos para cada operação (GET, POST, PUT, DELETE) 
- O CRUD em uma api REST geralmente utiliza os métodos HTTP da seguinte forma e com as seguintes tipos de rotas:
- **GET**: Para recuperar dados (ex: listar usuários, obter detalhes de um usuário)
- **POST**: Para criar novos dados (ex: adicionar um novo usuário)
- **PUT**: Para atualizar dados existentes (ex: editar informações de um usuário)
- **DELETE**: Para remover dados (ex: excluir um usuário)
- Usar URLs descritivas e significativas para identificar recursos (ex: `/users/` para listar usuários, `/users/{id}/` para obter detalhes de um usuário)
- Usar códigos de status HTTP apropriados para indicar o resultado da operação (ex: 200 OK, 201 Created, 204 No Content, 400 Bad Request, 404 Not Found, 500 Internal Server Error)
- Documentar a API de forma clara e acessível, incluindo exemplos de requisições e respostas para cada endpoint.

### Open API (Swagger)
- OpenAPI é uma especificação para descrever APIs RESTful de forma padronizada e legível por máquinas
- Permite que desenvolvedores e ferramentas entendam como a API funciona, quais endpoints estão disponíveis, quais parâmetros são necessários e quais respostas podem ser esperadas
- O Swagger é uma ferramenta que utiliza a especificação OpenAPI para gerar documentação interativa para APIs RESTful, permitindo que desenvolvedores testem os endpoints diretamente na documentação

### REST Clients - Postman, Insomnia e Bruno
- Postman, Insomnia e Bruno são ferramentas populares para testar APIs RESTful
- Cada uma delas possui características únicas que podem ser vantajosas dependendo do contexto de uso.
- Utilizamos essas ferramentas para testar as APIs RESTful que criamos 

### Django Rest Framework (DRF)
- O Django Rest Framework (DRF) é uma biblioteca poderosa e flexível para construir APIs RESTful em Django
- Ele fornece uma série de ferramentas e funcionalidades que facilitam a criação de APIs, como serialização de dados, autenticação, e permissões.
- Com o DRF, é possível criar endpoints de forma rápida e eficiente, além de oferecer suporte a diferentes formatos de resposta, como JSON e XML.
- Principais componentes do DRF:
    - Serializers: São responsáveis por converter dados complexos, como objetos de banco de dados, em tipos de dados nativos do Python que podem ser facilmente convertidos em JSON ou XML. Eles também podem validar dados de entrada e transformar dados de saída.
    - ViewSets: Permitem agrupar a lógica de visualização para um conjunto de operações relacionadas, facilitando a criação de APIs RESTful.
    - Routers: Automatizam a criação de URLs para as ViewSets, simplificando o roteamento das requisições.

### Configurando o DRF
- Instalar as dependencias `pip install -r requirements.txt` 
- Configurar o Django Rest Framework no seu projeto no settings.py
- Adicionar `rest_framework` à lista de INSTALLED_APPS no settings.py
- Adicionar `drf spectacular` à lista de INSTALLED_APPS no settings.py


```python
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django_extensions',
    'padarias.apps.PadariasConfig',
    'django_browser_reload',
    'rest_framework',
    'drf_spectacular',
]


# REST Framework settings
REST_FRAMEWORK = {
    'DEFAULT_SCHEMA_CLASS': 'drf_spectacular.openapi.AutoSchema',
}

# DRF Spectacular settings
SPECTACULAR_SETTINGS = {
    'TITLE': 'Café com Pão API',
    'DESCRIPTION': 'API para o sistema de assinatura de cestas matinais',
    'VERSION': '1.0.0',
    'SERVE_INCLUDE_SCHEMA': False,
}
```

- Criar a pasta `api` dentro do app `padarias` e criar os seguintes arquivos: `router.py`, `viewsets.py`, `serializers.py`
- Arquivo `router.py`

```python
from rest_framework import routers
from .viewsets import (
    CategoriaViewSet, PadariaViewSet, ProdutoViewSet,
    CestaViewSet, UserViewSet, 
)

router = routers.DefaultRouter()
router.register('categorias', CategoriaViewSet)
router.register('padarias', PadariaViewSet)
router.register('produtos', ProdutoViewSet)
router.register('cestas', CestaViewSet)
router.register('users', UserViewSet)
```

- Arquivo `viewsets.py`

```python
from rest_framework import viewsets 
from ..models import Categoria, Padaria, Produto, Cesta
from django.contrib.auth.models import User
from .serializers import (
    CategoriaSerializer, PadariaSerializer, ProdutoSerializer,
    CestaSerializer, UserSerializer, 
)

class CategoriaViewSet(viewsets.ModelViewSet):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer

class ProdutoViewSet(viewsets.ModelViewSet):
    queryset = Produto.objects.all()
    serializer_class = ProdutoSerializer

class CestaViewSet(viewsets.ModelViewSet):
    queryset = Cesta.objects.all()
    serializer_class = CestaSerializer

class PadariaViewSet(viewsets.ModelViewSet):
    queryset = Padaria.objects.all()
    serializer_class = PadariaSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
```

- Arquivo `serializers.py`

```python
from rest_framework import serializers
from ..models import Categoria, Padaria, Produto, Cesta, Endereco, Assinatura
from django.contrib.auth.models import User


class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = '__all__'


class ProdutoSerializer(serializers.ModelSerializer):
    categoria_nome = serializers.ReadOnlyField(source='categoria.nome')

    class Meta:
        model = Produto
        fields = '__all__'


class CestaSerializer(serializers.ModelSerializer):
    produtos = ProdutoSerializer(many=True, read_only=True)
    nivel_display = serializers.CharField(source='get_nivel_display', read_only=True)

    class Meta:
        model = Cesta
        fields = '__all__'


class EnderecoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Endereco
        fields = '__all__'


class PadariaSerializer(serializers.ModelSerializer):
    cestas = CestaSerializer(many=True, read_only=True)
    endereco = EnderecoSerializer(read_only=True)

    class Meta:
        model = Padaria
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']
        read_only_fields = ['id', 'username']
```

### Alterar
- Alterar o arquivo `cafecompao/urls.py` do projeto para incluir as rotas da API
- Importar o router criado anteriormente e incluir as rotas da API no arquivo `urls.py` do projeto

```python
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from padarias import views as padarias_views
from padarias.api.router import router
from drf_spectacular.views import SpectacularAPIView, SpectacularRedocView, SpectacularSwaggerView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', padarias_views.home, name='home'),
    path('padarias/', padarias_views.padarias_list, name='padarias_list'),
    path('cestas/', padarias_views.cestas_list, name='cestas_list'),
    path('cestas/<int:pk>/', padarias_views.cestas_detail, name='cestas_detail'),
    path('contato/', padarias_views.contato, name='contato'),
    path('accounts/', include("django.contrib.auth.urls")),
    path('accounts/register/', padarias_views.register, name='register'),
    path('dashboard/', padarias_views.dashboard_main, name='dashboard_main'),
    path('assinaturas/create/', padarias_views.assinatura_create, name='assinatura_create'),
    path('assinaturas/update/', padarias_views.assinatura_update, name='assinatura_update'),
    path('assinaturas/delete/', padarias_views.assinatura_delete, name='assinatura_delete'),
    path("__reload__/", include("django_browser_reload.urls")),
    
    # API URLs
    path('api/', include(router.urls)),
    path('api/auth/', include('rest_framework.urls')),
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/schema/swagger/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('api/schema/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT) + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
```

### Atividade

- Replicar os passos acima
- Rodar o servidor com `python manage.py runserver` e acessar o swagger em `http://localhost:8000/api/schema/swagger/` para visualizar a documentação da API
- Implementar rotas de Assinatura (CRUD)

## A17 - Aplicação FrontEnd

### Resumo dos Conceitos Importantes

- O Frontend é a parte da aplicação que o usuário vê e interage diretamente. É a interface gráfica que permite ao usuário acessar as funcionalidades do sistema.
- Agora que temos a backend focado na API, vamos criar uma aplicação frontend que consome essa API e exibe os dados para o usuário.
- Existem diferentes formas de criar um frontend, atualmente a utilização de frameworks específicos para frontend é a mais utilizada. Esses frameworks permitem criar aplicações web de forma mais rápida e eficiente, além de oferecerem uma série de funcionalidades que facilitam o desenvolvimento apesar de gerar um código mais complexo e muitas vezes um overhead maior. Alguns dos frameworks mais famosos incluem: Next.js, Vue, Angular, Svelte, Remix, entre outros.

### Next JS
- O Next é um framework para React que permite criar aplicações web de forma rápida e eficiente. 
- Atualmente é a forma oficial e recomendada para criar aplicações
- Alguns conceitos importantes do Next.js:
- **Rotas**: O Next.js possui dois sistemas de rotas: `pages` e `app`. O sistema de rotas `pages` é a forma original e muito utilizado e é baseado em arquivos. Cada arquivo dentro da pasta `pages` representa uma rota na aplicação. O sistema de rotas `app` é mais flexível e permite criar rotas dinâmicas e aninhadas. O sistema de rotas `app` é mais recente e segue uma abordagem parecida com a de `pages`
- **Componentes**: O Next.js permite a criação de componentes reutilizáveis que podem ser utilizados em diferentes partes da aplicação, facilitando a manutenção e a organização do código. Os componentes são baseado em React e conseguentemente JSX.
- **API Routes**: O Next.js permite criar rotas de API dentro da própria aplicação, facilitando a criação de APIs para consumo interno. Essas rotas são criadas dentro da pasta `pages/api` e podem ser utilizadas para criar endpoints de API RESTful.
- **SSR (Server Side Rendering)**: O Next.js permite renderizar páginas no servidor antes de enviá-las para o cliente, melhorando o desempenho e a experiência do usuário. Isso é feito através da função `getServerSideProps`, que permite buscar dados no servidor antes de renderizar a página.
- **SSG (Static Site Generation)**: O Next.js permite gerar páginas estáticas durante o build da aplicação, melhorando o desempenho e a experiência do usuário. Isso é feito através da função `getStaticProps`, que permite buscar dados no servidor durante o build da aplicação. Essa abordagem é ideal para páginas que não mudam com frequência e podem ser geradas uma vez e servidas para todos os usuários.
- **Middleware**: O Next.js permite criar middleware para interceptar requisições e respostas, permitindo adicionar lógica personalizada antes de processar a requisição. Isso é útil para autenticação, autorização e outras funcionalidades que precisam ser aplicadas em todas as rotas da aplicação.


### Criando a Aplicação Frontend
- Criar um novo projeto Next.js com o comando `npx create-next-app@latest frontend`
- Seguir as instruções do assistente de criação de projeto
- Utilizar o default das opções
- Aguarde a instalação das dependências e entre na pasta do projeto com o comando `cd frontend`
- Rodar o projeto com o comando `npm run dev` e acessar a aplicação em `http://localhost:3000`

### Dependências
- Vamos instalar o DaisyUI
- O DaisyUI é uma biblioteca de componentes para Tailwind CSS que fornece uma série de componentes prontos para uso, facilitando a criação de interfaces bonitas e funcionais.

`$ npm i daisyui`

- Vamos instalar o bootstrap Icons
`$ npm i bootstrap-icons`

### Verifique o repositorio de referencia

- Acesse o repositorio de referencia da disciplina para verificar uma aplicacão de exemplo NextJS e os conceitos apresentados pelo professor
- Veja especialemnte como foram definidos os componentes e as rotas
- Veja como foi feito o fetch da aplicação 

### Atividade

- Crie uma aplicação NextJS
- Crie os componentes e as rotas para a aplicação
- Duas opções
  - Replique a home page da aplicação café com pão
  - Crie uma página sua com um layout diferente (landingpage) pode utilizar outras dependências
- Utiliza rotas `app` que são as mais recentes
- Atenção ao uso de IA para não utilizar código desatualizado



