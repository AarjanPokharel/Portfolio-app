from django.shortcuts import render

# Create your views here. 
#PORTFOLIO VIEW 

from rest_framework.decorators import api_view
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.response import Response

from .models import Education, Experience, Involvement, Profile, Project, Role, Service, Skill, Stat
from .serializers import (
    EducationSerializer,
    ExperienceSerializer,
    InvolvementSerializer,
    ProfileSerializer,
    ProjectSerializer,
    RoleSerializer,
    ServiceSerializer,
    SkillSerializer,
    StatSerializer,
)

@api_view(['GET'])
def profile_detail(request):
    '''
    Return the first profile record.
    Usually this portfolio app will only have one profile.
    '''
    profile = Profile.objects.first()

    if profile is None:
        return Response(
            {
                'detail': 'No profile has been created yet. Add one from Django Admin.'
            },
            status=404,
        )

    serializer = ProfileSerializer(profile, context={'request': request})
    return Response(serializer.data)

class EducationListAPIView(ListAPIView):
    queryset = Education.objects.all()
    serializer_class = EducationSerializer


class ExperienceListAPIView(ListAPIView):
    queryset = Experience.objects.all()
    serializer_class = ExperienceSerializer


class SkillListAPIView(ListAPIView):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer


class ProjectListAPIView(ListAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer


class ProjectDetailAPIView(RetrieveAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    lookup_field = 'slug'


class RoleListAPIView(ListAPIView):
    queryset = Role.objects.all()
    serializer_class = RoleSerializer


class StatListAPIView(ListAPIView):
    queryset = Stat.objects.all()
    serializer_class = StatSerializer


class InvolvementListAPIView(ListAPIView):
    queryset = Involvement.objects.all()
    serializer_class = InvolvementSerializer


class ServiceListAPIView(ListAPIView):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer