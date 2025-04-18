import django_filters
from .models import Padaria

class PadariaFilter(django_filters.FilterSet):
    nome = django_filters.CharFilter(lookup_expr='icontains', label='Nome da Padaria')
    cidade = django_filters.CharFilter(field_name='endereco__cidade', lookup_expr='icontains', label='Cidade')
    
    HAS_PHONE_CHOICES = (
        ('', 'Todos'),
        ('yes', 'Com telefone'),
        ('no', 'Sem telefone'),
    )
    has_phone = django_filters.ChoiceFilter(
        choices=HAS_PHONE_CHOICES,
        label='Telefone',
        method='filter_has_phone'
    )
    
    def filter_has_phone(self, queryset, name, value):
        if value == 'yes':
            return queryset.exclude(telefone__isnull=True)
        elif value == 'no':
            return queryset.filter(telefone__isnull=True)
        return queryset
    
    class Meta:
        model = Padaria
        fields = ['nome', 'has_phone', 'cidade']