from rest_framework.serializers import ModelSerializer
from .models import Projects, Notes


class ProjectsSerializer(ModelSerializer):

    class Meta:
        model = Projects
        fields = ['id', 'name', 'repo_link', 'users']


class NotesSerializer(ModelSerializer):

    class Meta:
        model = Notes
        fields = ['id', 'name', 'project', 'text', 'user', 'created_data', 'active']


class NotesPutMethodSerializer(ModelSerializer):
    class Meta:
        model = Notes
        fields = ['id', 'name', 'project', 'text', 'user', 'created_data', 'active']
