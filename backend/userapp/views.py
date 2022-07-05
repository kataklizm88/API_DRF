from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from .serializers import UserSerializer, UserSerializerV2
from .models import User
from rest_framework import mixins
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from rest_framework.authtoken import views
from rest_framework.authtoken.models import Token
from rest_framework.response import Response


class UserViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin,
                  mixins.UpdateModelMixin, viewsets.GenericViewSet):
    queryset = User.objects.all()
    permission_classes = [AllowAny]
    renderer_classes = [BrowsableAPIRenderer, JSONRenderer]

    def get_serializer_class(self):
        if self.request.version == '2.0':
            return UserSerializerV2
        return UserSerializer


class AuthToken(views.ObtainAuthToken):

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        need_user = User.objects.get(username=user)
        token, created = Token.objects.get_or_create(user=user)
        return Response({'token': token.key, 'name': need_user.first_name})
