from django.test import TestCase
from .models import Projects, Notes
from rest_framework.test import APITestCase, APIClient
from rest_framework import status
from mixer.backend.django import mixer
from userapp.models import User


class TestProjects(TestCase):

    def test_get_project_list(self):
        client = APIClient()
        response = client.get('/api/projects/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


class TestNotes(APITestCase):

    def setUp(self) -> None:
        self.user = User.objects.create_superuser(username='Bob', password='Bob555')
        self.client.login(username='Bob', password='Bob555')

    def test_get_notes_list(self):
        response = self.client.get('/api/notes/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_retrieve_note(self):
        self.note = Notes.objects.create(id=10, name="Ivan", project=mixer.blend(Projects), user=mixer.blend(User))
        self.user = mixer.blend(User)
        new_name = 'Peter'
        self.project = mixer.blend(Projects)
        response = self.client.put(f'/api/notes/{self.note.id}/', {'name': new_name, 'project': self.project.id,
                                                                   'user': self.user.id})
        self.assertEqual(response.data['name'], new_name)
