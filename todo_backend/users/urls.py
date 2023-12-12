from django.urls import path
from .views import UserLogin , UserRegistration , UserLogout
from rest_framework_simplejwt.views import (
    TokenObtainPairView ,
    TokenRefreshView
)

urlpatterns = [
    path('register/' , UserRegistration.as_view() , name='Registration'),
    path('login/' , UserLogin.as_view() , name='Login'),
    path('logout/' , UserLogout.as_view() , name = 'Logout' ),
    path('token/' , TokenObtainPairView.as_view() , name='TokenObtainPairView'),
    path('token/refresh/' ,TokenRefreshView.as_view() , name='TokenRefreshView' )
]
