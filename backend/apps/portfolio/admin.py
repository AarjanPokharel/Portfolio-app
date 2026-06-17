from django.contrib import admin
from .models import AboutPhoto, Profile, Project, Role, Service, Skill, Stat, Involvement, Education, Experience

# Register your models here.

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'headline', 'email', 'updated_at')

@admin.register(Education)
class EducationAdmin(admin.ModelAdmin):
    list_display = ('school_name', 'degree', 'field_of_study', 'start_date', 'end_date', 'display_order')
    search_fields = ('school_name', 'degree', 'field_of_study')
    list_filter = ('start_date', 'end_date')


@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ('company_name', 'job_title', 'start_date', 'end_date', 'currently_working', 'display_order')
    search_fields = ('company_name', 'job_title', 'description')
    list_filter = ('currently_working', 'start_date', 'end_date')

@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ('category', 'display_order')
    list_editable = ('display_order',)
    ordering = ('display_order',)


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'featured', 'created_at', 'updated_at')
    list_filter = ('featured', 'created_at')
    search_fields = ('title', 'short_description', 'tech_stack')
    prepopulated_fields = {'slug': ('title',)}


@admin.register(Role)
class RoleAdmin(admin.ModelAdmin):
    list_display = ('text', 'icon', 'display_order')
    list_editable = ('display_order',)
    ordering = ('display_order',)


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('category',)
    list_filter = ('category',)
    ordering = ('category',)


@admin.register(Stat)
class StatAdmin(admin.ModelAdmin):
    list_display = ('value', 'label', 'display_order')
    list_editable = ('display_order',)
    ordering = ('display_order',)


@admin.register(Involvement)
class InvolvementAdmin(admin.ModelAdmin):
    list_display = ('title', 'organization', 'period', 'display_order')
    list_editable = ('display_order',)
    search_fields = ('title', 'organization')
    ordering = ('display_order',)


@admin.register(AboutPhoto)
class AboutPhotoAdmin(admin.ModelAdmin):
    list_display = ('__str__', 'caption', 'display_order')
    list_editable = ('display_order',)
    ordering = ('display_order',)
