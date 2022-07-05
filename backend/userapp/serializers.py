from rest_framework.serializers import ModelSerializer

from .models import User


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email']


class UserSerializerV2(ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'is_superuser', 'is_staff']
