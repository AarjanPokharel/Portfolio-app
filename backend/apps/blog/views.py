from django.shortcuts import render
from rest_framework.generics import ListAPIView, RetrieveAPIView

from .models import BlogPost
from .serializers import BlogPostDetailSerializer, BlogPostListSerializer

#BLOG VIEWS 
# Create your views here.




class PublishedBlogPostListAPIView(ListAPIView):
    serializer_class = BlogPostListSerializer

    def get_queryset(self):
        return BlogPost.objects.filter(status='published')


class PublishedBlogPostDetailAPIView(RetrieveAPIView):
    serializer_class = BlogPostDetailSerializer
    lookup_field = 'slug'

    def get_queryset(self):
        return BlogPost.objects.filter(status='published')