
from django.core.validators import FileExtensionValidator, MaxValueValidator, MinValueValidator
from django.db import models
from django.utils.text import slugify

# Create your models here.

class Profile(models.Model):
    full_name = models.CharField(max_length=100)
    headline = models.CharField(max_length=200)
    bio = models.TextField()
    location = models.CharField(max_length=100, blank=True)
    email = models.EmailField(blank=True)

    linkedin_url = models.URLField(blank=True)
    github_url = models.URLField(blank=True)

    profile_image = models.ImageField(
        upload_to='profile/',
        blank=True,
        null=True
    )

    resume_file = models.FileField(
        upload_to='resumes/',
        blank=True,
        null=True,
        validators=[FileExtensionValidator(allowed_extensions=['pdf'])]
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.full_name


class Education(models.Model):
    school_name = models.CharField(max_length=200)
    degree = models.CharField(max_length=200)
    field_of_study = models.CharField(max_length=200, blank=True)
    location = models.CharField(max_length=100, blank=True)

    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)

    description = models.TextField(blank=True)
    display_order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['display_order', '-start_date']

    def __str__(self):
        return f'{self.degree} - {self.school_name}'


class Experience(models.Model):
    company_name = models.CharField(max_length=200)
    job_title = models.CharField(max_length=200)
    location = models.CharField(max_length=100, blank=True)

    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    currently_working = models.BooleanField(default=False)

    description = models.TextField(
        help_text='Use bullet-style text or short paragraphs describing your work.'
    )

    display_order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['display_order', '-start_date']

    def __str__(self):
        return f'{self.job_title} at {self.company_name}'


class Skill(models.Model):
    CATEGORY_CHOICES = [
        ('cloud', 'Cloud'),
        ('devops', 'DevOps'),
        ('backend', 'Backend'),
        ('database', 'Database'),
        ('security', 'Security'),
        ('networking', 'Networking'),
        ('programming', 'Programming'),
        ('tools', 'Tools'),
    ]

    name = models.CharField(max_length=100)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    proficiency = models.PositiveIntegerField(
        default=70,
        validators=[
            MinValueValidator(0),
            MaxValueValidator(100),
        ],
        help_text='Skill level from 0 to 100',
    )
    display_order = models.PositiveIntegerField(default=0)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['display_order', 'name']

    def __str__(self):
        return f'{self.name} ({self.category})'


class Project(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=220, unique=True, blank=True)

    short_description = models.CharField(max_length=300)
    description = models.TextField()

    tech_stack = models.TextField(
        help_text='Comma-separated technologies, for example: AWS, Terraform, Docker'
    )

    github_url = models.URLField(blank=True)
    live_url = models.URLField(blank=True)

    image = models.ImageField(
        upload_to='projects/',
        blank=True,
        null=True
    )

    featured = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-featured', '-created_at']

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title

