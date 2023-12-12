from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import TodoSerializer
from .models import Todo

# Create your views here.


class TodoView(APIView):
    def get(self,request , user = None , completed = None):
        if user is not None and completed is not None:
            
            try:
                task = Todo.objects.filter(user = user , completed = True)
                res = TodoSerializer(task , many = True)
                return Response(res.data)
            except Todo.DoesNotExist:
                return Response({'message' : 'No completed tasks'} , status = status.HTTP_404_NOT_FOUND)
        elif user is not None:
            try:
                task = Todo.objects.filter(user = user)
                res = TodoSerializer(task , many = True)
                return Response(res.data)
            except Todo.DoesNotExist:
                return Response({'message' : 'not found'},status=status.HTTP_404_NOT_FOUND)
        
        todo = Todo.objects.all()
        serializer = TodoSerializer(todo , many = True)
        return Response(serializer.data)
    
    def post(self , request):
        serializer = TodoSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data , status = status.HTTP_201_CREATED)
        return Response(serializer.errors , status = status.HTTP_400_BAD_REQUEST)
    def put(self , request , sno):
        try:
            update = Todo.objects.get(sno = sno)
        except Todo.DoesNotExist:
            return Response({'error' :'Not found'} , status = status.HTTP_404_NOT_FOUND)
        
        serializer = TodoSerializer(update , data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors , status = status.HTTP_400_BAD_REQUEST)
    def delete(self,request , sno):
        try:
            val =  Todo.objects.get(sno = sno)
        except Todo.DoesNotExist:
            return Response({'error' : 'Not found'} , status = status.HTTP_404_NOT_FOUND)
        
        val.delete()
        return Response({'message' : 'Deleted successfully'})
                
                