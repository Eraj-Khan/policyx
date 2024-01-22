# asgi.py
import os
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from django.urls import path
from . import consumer  # Import your consumers module
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'server.settings')
application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": AuthMiddlewareStack(
        URLRouter(
            [
                path('ws/notifications/', consumer.NotificationConsumer.as_asgi()),
                # Add other WebSocket paths if needed
            ]
        )
    ),
})