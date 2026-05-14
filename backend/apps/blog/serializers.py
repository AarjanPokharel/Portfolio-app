#blog serializer

from rest_framework import serializers
from .models import BlogPost


class BlogPostListSerializer(serializers.ModelSerializer):
    cover_image_url = serializers.SerializerMethodField()

    class Meta:
        model = BlogPost
        fields = [
            'id',
            'title',
            'slug',
            'excerpt',
            'cover_image_url',
            'published_at',
            'created_at',
            'updated_at',
        ]

    def get_cover_image_url(self, obj):
        request = self.context.get('request')

        if obj.cover_image:
            url = obj.cover_image.url
            return request.build_absolute_uri(url) if request else url
        
        if obj.cover_image_url:
            return obj.cover_image_url

        return None


class BlogPostDetailSerializer(serializers.ModelSerializer):
    cover_image_url = serializers.SerializerMethodField()

    class Meta:
        model = BlogPost
        fields = [
            'id',
            'title',
            'slug',
            'excerpt',
            'content',
            'cover_image_url',
            'status',
            'published_at',
            'created_at',
            'updated_at',
        ]

    def get_cover_image_url(self, obj):
        request = self.context.get("request")

        if obj.cover_image:
            url = obj.cover_image.url
            return request.build_absolute_uri(url) if request else url

        if obj.cover_image_url:
            return obj.cover_image_url

        return None
