from django.test import TestCase
from .views import UserViewSet
from rest_framework.test import APIRequestFactory, APITestCase, force_authenticate
from rest_framework import status
from .models import User


class TestUser(TestCase):

    def setUp(self) -> None:
        self.user = User.objects.create_superuser(username='Bob', password='Bob567')

    def test_get_list(self):
        factory = APIRequestFactory()
        request = factory.get('/api/users')
        force_authenticate(request, self.user)
        view = UserViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class TestUser2(APITestCase):

    def setUp(self) -> None:
        self.user = User.objects.create_superuser(username='Bob', password='Bob567')

    def test_get_list3(self):
        self.client.login(username='Bob', password='Bob567')
        response = self.client.get('/api/users/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
