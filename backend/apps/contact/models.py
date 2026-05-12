from django.db import models

# Create your models here.

class ContactMessage(models.Model):
    STATUS_CHOICES = [
        ('new', 'New'),
        ('read', 'Read'),
        ('replied', 'Replied'),
        ('archived', 'Archived'),
    ]

    name = models.CharField(max_length=100)
    email = models.EmailField()
    subject = models.CharField(max_length=200, blank=True)
    message = models.TextField()

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='new',
    )

    ai_reply_suggestion = models.TextField(
        blank=True,
        help_text='Future AI-generated reply suggestion. Need approval before sending.',
    )

    source = models.CharField(
        max_length=50,
        default='portfolio',
        help_text='Where the message came from',
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f'Message from {self.name} - {self.email}'