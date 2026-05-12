#portfolio

from rest_framework import serializers
from .models import Education, Experience, Profile, Project, Skill


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
        request = self.context.get('request')

        if obj.profile_image:
            url = obj.profile_image.url
            return request.build_absolute_uri(url) if request else url

        return None

    def get_resume_file_url(self, obj):
        request = self.context.get('request')

        if obj.resume_file:
            url = obj.resume_file.url
            return request.build_absolute_uri(url) if request else url

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
    class Meta:
        model = Skill
        fields = [
            'id',
            'name',
            'category',
            'proficiency',
            'display_order',
        ]


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
        request = self.context.get('request')

        if obj.image:
            url = obj.image.url
            return request.build_absolute_uri(url) if request else url

        return None

    def get_tech_stack_list(self, obj):
        return [
            tech.strip()
            for tech in obj.tech_stack.split(',')
            if tech.strip()
        ]