from django.urls import path
from .views import  TodoView

urlpatterns = [
    path('todos/' , TodoView.as_view() , name = 'Tasks'),
    path('todos/<str:user>/' , TodoView.as_view() , name='UserTask'),
    path('todos/<str:user>/completed=<str:completed>' , TodoView.as_view() , name='UserCompletedTask'),
    path('todo/<int:sno>/' , TodoView.as_view() , name='TaskBySno')
]
