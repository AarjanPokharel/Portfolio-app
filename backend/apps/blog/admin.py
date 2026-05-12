from django.contrib import admin
from .models import BlogPost

# Register your models here.
@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ('title', 'status', 'published_at', 'created_at', 'updated_at')
    list_filter = ('status', 'created_at', 'published_at')
    search_fields = ('title', 'excerpt', 'content')
    prepopulated_fields = {'slug': ('title',)}