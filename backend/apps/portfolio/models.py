
from django.core.validators import FileExtensionValidator
from django.db import models
from django.utils.text import slugify

# Create your models here.

class Profile(models.Model):
    full_name = models.CharField(max_length=100)
    headline = models.CharField(max_length=200)
    bio = models.TextField()
    about_me = models.TextField(
        blank=True,
        help_text="Text shown in the About Me section on the homepage. Separate from bio."
    )
    architecture_description = models.TextField(
        blank=True,
        help_text="Description shown in the Architecture card on the homepage."
    )
    location = models.CharField(max_length=100, blank=True)
    email = models.EmailField(blank=True)

    linkedin_url = models.URLField(blank=True)
    github_url = models.URLField(blank=True)
    instagram_url = models.URLField(blank=True)

    profile_image = models.ImageField(
        upload_to='profile/',
        blank=True,
        null=True
    )

    profile_image_url = models.URLField(
        blank=True,
        help_text="Optional external image URL. Used if no local image is uploaded."
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
        ('cloud',       'Cloud'),
        ('devops',      'DevOps & CI/CD'),
        ('backend',     'Backend'),
        ('database',    'Databases'),
        ('security',    'Security'),
        ('networking',  'Networking'),
        ('programming', 'Programming'),
        ('tools',       'Tools'),
    ]

    category = models.CharField(
        max_length=50,
        choices=CATEGORY_CHOICES,
        unique=True,
        help_text="One record per category."
    )
    items = models.TextField(
        default="",
        blank=True,
        help_text="Enter each skill on a new line. e.g:\nAWS EC2\nS3\nLambda"
    )
    display_order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['display_order', 'category']

    def __str__(self):
        return self.get_category_display()


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

    image_url = models.URLField(
        blank=True,
        help_text="Optional external project image URL. Used if no local image is uploaded."
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


class Role(models.Model):
    ICON_CHOICES = [
        ('aws',        'AWS'),
        ('docker',     'Docker'),
        ('python',     'Python'),
        ('linux',      'Linux'),
        ('devops',     'DevOps / Gear'),
        ('backend',    'Backend / Server'),
        ('cloud',      'Cloud'),
        ('automation', 'Automation / Robot'),
        ('security',   'Security / Shield'),
        ('database',   'Database'),
        ('code',       'Code / Dev'),
    ]

    text = models.CharField(
        max_length=200,
        help_text="Role label that gets typed out, e.g. 'Cloud & DevOps Engineer'"
    )
    icon = models.CharField(
        max_length=20,
        choices=ICON_CHOICES,
        default='code',
        help_text="Icon shown alongside the typed text."
    )
    display_order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['display_order']

    def __str__(self):
        return self.text


class Service(models.Model):
    CATEGORY_CHOICES = [
        ('service', 'Areas I Can Help With'),
        ('focus', 'Best Fit Opportunities'),
    ]

    category = models.CharField(
        max_length=20,
        choices=CATEGORY_CHOICES,
        unique=True,
        help_text="Only one record per category."
    )
    points = models.TextField(
        default="",
        blank=True,
        help_text="Enter each point on a new line. Each line becomes one bullet/tag."
    )

    class Meta:
        ordering = ['category']

    def __str__(self):
        return self.get_category_display()


class Stat(models.Model):
    """A single highlight stat shown in the About section (e.g. '5+' / 'Projects')."""
    value = models.CharField(
        max_length=20,
        help_text="The figure to show, e.g. '5+', '2 yrs', 'AWS'."
    )
    label = models.CharField(
        max_length=50,
        help_text="What it counts, e.g. 'Projects', 'Certifications'."
    )
    display_order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['display_order']

    def __str__(self):
        return f'{self.value} {self.label}'


class Involvement(models.Model):
    """Leadership, volunteering, and community work shown in the 'Beyond the Code' section."""
    title = models.CharField(max_length=200, help_text="Your role, e.g. 'Teaching Fellow'.")
    organization = models.CharField(max_length=200, blank=True)
    period = models.CharField(
        max_length=100,
        blank=True,
        help_text="Free text, e.g. 'Dec 2022' or 'Aug 2020 – Apr 2021'."
    )
    description = models.TextField(
        blank=True,
        help_text="One point per line — each line renders as a bullet."
    )
    display_order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['display_order']

    def __str__(self):
        return f'{self.title} — {self.organization}'

