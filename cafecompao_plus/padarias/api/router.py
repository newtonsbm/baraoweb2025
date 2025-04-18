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
