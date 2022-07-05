from django.contrib import admin
from django.urls import path, include
from rest_framework.permissions import AllowAny
from userapp.views import UserViewSet, AuthToken
from todoapp.views import ProjectViewSet, NoteViewSet
from rest_framework.routers import DefaultRouter
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from graphene_django.views import GraphQLView
from django.views.generic import TemplateView

schema_view = get_schema_view(
    openapi.Info(
        title='Library',
        default_version='1.0',
        description='description',
        contact=openapi.Contact(email='test@mail.com'),
        license=openapi.License(name='My')
    ),
    public=True,
    permission_classes=(AllowAny, )
)


router = DefaultRouter()
router.register('users', UserViewSet, basename='users')
router.register('projects', ProjectViewSet)
router.register('notes', NoteViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api-auth/', include('rest_framework.urls')),
    path('api-auth-token/', AuthToken.as_view()),
    path('swagger/', schema_view.with_ui()),
    path('graphql/', GraphQLView.as_view(graphiql=True)),
    path('', TemplateView.as_view(template_name='index.html'))
]
