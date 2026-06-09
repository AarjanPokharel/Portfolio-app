from django.urls import path

from .views import (
    EducationListAPIView,
    ExperienceListAPIView,
    ProjectDetailAPIView,
    ProjectListAPIView,
    RoleListAPIView,
    ServiceListAPIView,
    SkillListAPIView,
    profile_detail,
)


urlpatterns = [
    path('profile/', profile_detail, name='profile-detail'),
    path('education/', EducationListAPIView.as_view(), name='education-list'),
    path('experience/', ExperienceListAPIView.as_view(), name='experience-list'),
    path('skills/', SkillListAPIView.as_view(), name='skill-list'),
    path('projects/', ProjectListAPIView.as_view(), name='project-list'),
    path('projects/<slug:slug>/', ProjectDetailAPIView.as_view(), name='project-detail'),
    path('services/', ServiceListAPIView.as_view(), name='service-list'),
    path('roles/', RoleListAPIView.as_view(), name='role-list'),
]
