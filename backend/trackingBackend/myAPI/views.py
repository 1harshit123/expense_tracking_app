from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import UserProfile, Expense
from .serializers import UserProfileSerializer, ExpenseSerializer, RegistrationSerializer, LoginSerializer
from django.contrib.auth import login

api_view('POST')
def user_registration(request):
    if request.method == 'post':
        serializer = RegistrationSerializer(data = request.data)
        if serializer.is_valid():
            UserProfile.objects.create_user(
                serializer.initial_data('username'),
                serializer.initial_data('email'),
                serializer.initial_data('password')
            )
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
api_view('POST')
def user_login(request):
    if request.method == 'post':
        serializer = LoginSerializer(data = request.data)
        if serializer.is_valid():
            user = serializer.validated_data
            login(request, user)
            details = UserProfile(user).data
            return Response(
            {"message": "Login successful", "user": details},
            status=status.HTTP_200_OK
        )
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




def getting_daily_expenses(request):
    if request.method == 'POST':
        serializer = ExpenseSerializer()