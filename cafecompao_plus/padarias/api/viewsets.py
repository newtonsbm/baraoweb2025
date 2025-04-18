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
