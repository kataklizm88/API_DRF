from .models import Projects, Notes
from .filters import NoteFilter
from .serializers import ProjectsSerializer, NotesSerializer, NotesPutMethodSerializer
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from rest_framework.pagination import LimitOffsetPagination
from rest_framework import viewsets


class ProjectLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 10


class NoteLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 20


class ProjectViewSet(viewsets.ModelViewSet):
    renderer_classes = [BrowsableAPIRenderer, JSONRenderer]
    queryset = Projects.objects.all()
    serializer_class = ProjectsSerializer
    pagination_class = ProjectLimitOffsetPagination
    filterset_fields = ['name']


class NoteViewSet(viewsets.ModelViewSet):
    renderer_classes = [BrowsableAPIRenderer, JSONRenderer]
    queryset = Notes.objects.all()
    pagination_class = NoteLimitOffsetPagination
    filterset_class = NoteFilter

    def get_serializer_class(self):
        if self.request.method in ['PUT']:
            return NotesPutMethodSerializer
        return NotesSerializer

    def perform_destroy(self, instance):
        instance.active = False
        instance.save()
