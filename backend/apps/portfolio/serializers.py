#portfolio

from rest_framework import serializers
from .models import Education, Experience, Profile, Project, Role, Service, Skill


class ProfileSerializer(serializers.ModelSerializer):
    profile_image_url = serializers.SerializerMethodField()
    resume_file_url = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = [
            'id',
            'full_name',
            'headline',
            'bio',
            'about_me',
            'architecture_description',
            'location',
            'email',
            'linkedin_url',
            'github_url',
            'profile_image_url',
            'resume_file_url',
            'created_at',
            'updated_at',
        ]

    def get_profile_image_url(self, obj):
        if obj.profile_image:
            return obj.profile_image.url  # relative path e.g. /media/profile/...

        if obj.profile_image_url:
            return obj.profile_image_url  # external URL stored directly

        return None

    def get_resume_file_url(self, obj):
        if obj.resume_file:
            return obj.resume_file.url  # relative path e.g. /media/resumes/...

        return None


class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = [
            'id',
            'school_name',
            'degree',
            'field_of_study',
            'location',
            'start_date',
            'end_date',
            'description',
            'display_order',
        ]


class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = [
            'id',
            'company_name',
            'job_title',
            'location',
            'start_date',
            'end_date',
            'currently_working',
            'description',
            'display_order',
        ]


class SkillSerializer(serializers.ModelSerializer):
    label = serializers.CharField(source='get_category_display', read_only=True)
    items_list = serializers.SerializerMethodField()

    class Meta:
        model = Skill
        fields = ['id', 'category', 'label', 'items_list', 'display_order']

    def get_items_list(self, obj):
        return [line.strip() for line in obj.items.splitlines() if line.strip()]


class ProjectSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    tech_stack_list = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = [
            'id',
            'title',
            'slug',
            'short_description',
            'description',
            'tech_stack',
            'tech_stack_list',
            'github_url',
            'live_url',
            'image_url',
            'featured',
            'created_at',
            'updated_at',
        ]

    def get_image_url(self, obj):
        if obj.image:
            return obj.image.url  # relative path e.g. /media/projects/...

        if obj.image_url:
            return obj.image_url  # external URL stored directly

        return None

    def get_tech_stack_list(self, obj):
        return [
            tech.strip()
            for tech in obj.tech_stack.split(',')
            if tech.strip()
        ]


class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = ['id', 'text', 'icon', 'display_order']


class ServiceSerializer(serializers.ModelSerializer):
    points_list = serializers.SerializerMethodField()

    class Meta:
        model = Service
        fields = ['id', 'category', 'points_list']

    def get_points_list(self, obj):
        return [line.strip() for line in obj.points.splitlines() if line.strip()]