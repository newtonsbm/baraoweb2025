"""
URL configuration for cafecompao project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
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
    path('padarias/<int:pk>/', padarias_views.PadariaDetailView.as_view(), name='padarias_detail'),	
    path('padarias_paginated/', padarias_views.PadariaListView.as_view(), name='padarias_list_paginated'),
    path('cestas/', padarias_views.cestas_list, name='cestas_list'),
    path('cestas/<int:pk>/', padarias_views.cestas_detail, name='cestas_detail'),
    path('contato/', padarias_views.contato, name='contato'),
    path('accounts/', include("django.contrib.auth.urls")),
    path('accounts/register/', padarias_views.register, name='register'),
    path('dashboard/', padarias_views.dashboard_main, name='dashboard_main'),
    path('dashboard/perfil/', padarias_views.PerfilDetailView.as_view(), name='perfil_detail'),
    path('dashboard/perfil/update/', padarias_views.PerfilUpdateView.as_view(), name='perfil_update'),
    path('dashboard/perfil/delete/', padarias_views.PerfilDeleteView.as_view(), name='perfil_delete'),
    path('assinaturas/create/', padarias_views.assinatura_create, name='assinatura_create'),
    path('assinaturas/update/', padarias_views.assinatura_update, name='assinatura_update'),
    path('assinaturas/delete/', padarias_views.assinatura_delete, name='assinatura_delete'),
    path('receitas/', padarias_views.recipe_search, name='recipe_search'),
    path("__reload__/", include("django_browser_reload.urls")),
    
    # API URLs
    path('api/', include(router.urls)),
    path('api/auth/', include('rest_framework.urls')),
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/schema/swagger/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('api/schema/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT) + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
