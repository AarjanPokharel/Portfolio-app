# CONTACT URLS 
from django.urls import path

from .views import ContactMessageCreateAPIView


urlpatterns = [
    path('messages/', ContactMessageCreateAPIView.as_view(), name='contact-message-create'),
]