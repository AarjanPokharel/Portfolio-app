from django.contrib import admin
from django.utils import timezone
from .models import ContactMessage

# Register your models here.

@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('name', 'email','message_type', 'subject', 'status', 'created_at')
    list_filter = ('message_type', 'status', 'created_at')
    search_fields = ('name', 'email', 'subject', 'message')
    readonly_fields = ('created_at', 'updated_at', 'replied_at')
    fieldsets = (
        (
            'Original Message',
            {
                'fields': (
                    'message_type',
                    'name',
                    'email',
                    'subject',
                    'message',
                    'source',
                    'created_at',
                    'updated_at',
                )
            },
        ),
        (
            'Response Workflow',
            {
                'fields': (
                    'status',
                    'reply_message',
                    'ai_reply_suggestion',
                    'internal_notes',
                    'replied_at',
                )
            },
        ),
    )

    def get_readonly_fields(self, request, obj=None):
        if obj:
            return self.readonly_fields + (
                'message_type',
                'name',
                'email',
                'subject',
                'message',
                'source',
            )

        return self.readonly_fields

    def save_model(self, request, obj, form, change):
        if obj.status == 'replied' and obj.reply_message and obj.replied_at is None:
            obj.replied_at = timezone.now()

        super().save_model(request, obj, form, change)
