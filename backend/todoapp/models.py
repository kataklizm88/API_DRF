from django.db import models
from userapp.models import User


class Projects(models.Model):
    name = models.CharField(max_length=64, unique=True)
    repo_link = models.URLField(max_length=128, blank=True)
    users = models.ManyToManyField(User)

    def __str__(self):
        return self.name


class Notes(models.Model):
    name = models.CharField(max_length=64, unique=True)
    project = models.ForeignKey(Projects, on_delete=models.CASCADE)
    text = models.TextField(blank=True, null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    active = models.BooleanField(default=True)
    created_data = models.DateTimeField(auto_now_add=True)
    updated_data = models.DateField(auto_now=True, blank=True)

    def __str__(self):
        return f'Note {self.name} of project {self.project}'
