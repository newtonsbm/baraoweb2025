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


