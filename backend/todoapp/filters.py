from django_filters import rest_framework as filters
from .models import Notes


class NoteFilter(filters.FilterSet):
    created_data = filters.DateFilter(field_name='created_data', lookup_expr='contains')
    created_data_lt = filters.DateFilter(field_name='created_data', lookup_expr='lt')
    created_data_gt = filters.DateFilter(field_name='created_data', lookup_expr='gt')

    class Meta:
        model = Notes
        fields = ['created_data', 'created_data_lt', 'created_data_gt']
