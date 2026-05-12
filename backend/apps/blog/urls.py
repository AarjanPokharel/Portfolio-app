from django.urls import path

from .views import PublishedBlogPostDetailAPIView, PublishedBlogPostListAPIView


urlpatterns = [
    path('posts/', PublishedBlogPostListAPIView.as_view(), name='blog-post-list'),
    path('posts/<slug:slug>/', PublishedBlogPostDetailAPIView.as_view(), name='blog-post-detail'),
]