
from rest_framework.generics import CreateAPIView
from .models import ContactMessage
from .serializers import ContactMessageCreateSerializer
from .notifications import notify_new_contact_message

#CONTACT VIEW
# Create your views here.

class ContactMessageCreateAPIView(CreateAPIView):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageCreateSerializer

    def perform_create(self, serializer):
        # Save first so the message is safely persisted, then notify.
        message = serializer.save()
        notify_new_contact_message(message)