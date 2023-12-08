from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import status
from .serializers import UserSerializer
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User

# Create your views here.

class UserRegistration(APIView):
    permission_classes = [AllowAny]
    def post(self , request):
        serializer = UserSerializer(data = request.data)
        if serializer.is_valid():
            user = serializer.save()
            # refresh = RefreshToken.for_user(user)
            # response_data = {
            #     'refresh' : str(refresh),
            #     'access' : str(refresh.access_token)
            # }
            return Response({'data' :serializer.data , 'message':'Created Successfully'} , status = status.HTTP_201_CREATED)
        return Response(serializer.errors , status = status.HTTP_400_BAD_REQUEST)

class UserLogin(APIView):
    permission_classes = [AllowAny]
    def post(self , request):
        data = request.data
        username = data.get('username' , None)
        password = data.get('password' , None)
        if username and password:
            user = User.objects.get(username = username)
            if user and user.check_password(password):
                serializer = UserSerializer(user)
                # refresh = RefreshToken.for_user(user)
                # response_data = {
                #     'refresh' : str(refresh),
                #     'access' : str(refresh.access_token)
                # }
                return Response({'data':serializer.data , 'message':'Logged In Successfully'} , status = status.HTTP_200_OK)
            return Response({'detail' :  'Incorrect username or password'} , status = status.HTTP_400_BAD_REQUEST)
class UserLogout(APIView):
    def post(self , request):
        # Assuming you are using token-based authentication
        # Invalidate the user's token (if applicable)
        #request.auth.delete()
        return Response({'detail': 'Successfully logged out.'}, status=status.HTTP_200_OK)