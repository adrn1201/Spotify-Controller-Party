from django.urls import path
from .views import (
    RoomView, 
    CreateRoomView
)

app_name = 'api'

urlpatterns = [
    path('room/', RoomView.as_view()),
    path('create-room/', CreateRoomView.as_view())
]