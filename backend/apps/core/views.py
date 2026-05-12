from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response

# Create your views here.

@api_view(["GET"])
def root(request):
    return Response({
        "message": "Welcome to Aarjan's Portfolio API",
        "available_endpoints": {
            "health": "/api/health/",
            "profile": "/api/portfolio/profile/",
            "education": "/api/portfolio/education/",
            "experience": "/api/portfolio/experience/",
            "skills": "/api/portfolio/skills/",
            "projects": "/api/portfolio/projects/",
            "blog_posts": "/api/blog/posts/",
            "contact": "/api/contact/messages/",
            "admin": "/admin/",
        }
    })

@api_view(["GET"])
def health_check(request):
    return Response({
        "status": "ok",
        "service": "django-backend",
        "message": "Django backend is running successfully."
    })
