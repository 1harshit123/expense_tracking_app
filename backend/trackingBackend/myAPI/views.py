from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import UserProfile, Expense
from .serializers import UserProfileSerializer, ExpenseSerializer, RegistrationSerializer, LoginSerializer
from django.contrib.auth import login
from rest_framework_simplejwt.tokens import RefreshToken

api_view('POST')
@api_view(['POST'])
def user_registration(request):
    serializer = RegistrationSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        refresh = RefreshToken.for_user(user)
        return Response({
            "message": "Registration successful",
            "user": UserProfileSerializer(user).data,
            "refresh": str(refresh),
            "access": str(refresh.access_token)
        }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        
api_view('POST')
def user_login(request):
    serializer = LoginSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.validated_data  # your LoginSerializer returns user object
        refresh = RefreshToken.for_user(user)

        return Response({
            "message": "Login successful",
            "user": UserProfileSerializer(user).data,
            "refresh": str(refresh),
            "access": str(refresh.access_token)
        }, status=status.HTTP_200_OK)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




def getting_daily_expenses(request):
    if request.method == 'POST':
        serializer = ExpenseSerializer()