import graphene
from graphene_django import DjangoObjectType
from userapp.models import User
from .models import Projects, Notes


class ProjectsType(DjangoObjectType):
    class Meta:
        model = Projects
        fields = '__all__'


class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = '__all__'


class NotesType(DjangoObjectType):
    class Meta:
        model = Notes
        fields = '__all__'


class Query(graphene.ObjectType):
    all_projects = graphene.List(ProjectsType)

    def resolve_all_projects(root, info):
        return Projects.objects.all()

    all_users = graphene.List(UserType)

    def resolve_all_users(root, info):
        return User.objects.all()

    all_notes = graphene.List(NotesType)

    def resolve_all_notes(root, info):
        return Notes.objects.all()


class UserCreateMutation(graphene.Mutation):
    class Arguments:
        first_name = graphene.String(required=True)

    user = graphene.Field(UserType)

    @classmethod
    def mutate(cls, root, info, first_name):
        user = User(first_name=first_name)
        user.save()
        return cls(user)


class ProjectCreateMutation(graphene.Mutation):
    class Arguments:
        name = graphene.String(required=True)

    project = graphene.Field(ProjectsType)

    @classmethod
    def mutate(cls, root, info, name):
        project = Projects(name=name)
        project.save()
        return cls(project)


class ProjectUpdateMutation(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)
        name = graphene.String(required=True)

    project = graphene.Field(ProjectsType)

    @classmethod
    def mutate(cls, root, info, id, name):
        project = Projects.objects.get(pk=id)
        project.name = name
        project.save()
        return cls(project)


class Mutation(graphene.ObjectType):
    create_user = UserCreateMutation.Field()
    create_project = ProjectCreateMutation.Field()
    update_project = ProjectUpdateMutation.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
