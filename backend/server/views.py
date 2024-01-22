from django.http import JsonResponse
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
def add_entry_and_notify(request):
    # Your logic for adding an entry to the database goes here
    # Assuming a new entry is added, send a notification to WebSocket consumers
    message = "A new entry has been added!"
    channel_layer = get_channel_layer()
    async_to_sync(channel_layer.group_send)(
        "notifications_group",
        {
            "type": "notify_user",
            "message": message,
        },
    )
    return JsonResponse({"success": True})