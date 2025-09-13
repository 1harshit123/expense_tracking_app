from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import UserProfile, Expense
from .serializers import UserProfileSerializer, ExpenseSerializer, RegistrationSerializer, LoginSerializer
from django.contrib.auth import login
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from rest_framework_simplejwt.exceptions import TokenError, InvalidToken
from rest_framework.authtoken.models import Token
from django.views.decorators.csrf import csrf_exempt


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

@csrf_exempt        
@api_view(['POST'])
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
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def user_logout(request):
    try:
        # Extract access token from Authorization header
        auth_header = request.headers.get('Authorization')
        if not auth_header or not auth_header.startswith("Bearer "):
            return Response({'detail': 'Access token missing'}, status=status.HTTP_400_BAD_REQUEST)

        access_token_str = auth_header.split(" ")[1]
        access_token = AccessToken(access_token_str)

        # Get the user
        user = request.user
        refresh = RefreshToken.for_user(user)
        refresh.blacklist()

        return Response({'detail': 'Successfully logged out'}, status=status.HTTP_200_OK)

    except (TokenError, InvalidToken) as e:
        return Response({'detail': 'Token is invalid or expired'}, status=status.HTTP_401_UNAUTHORIZED)
    except Exception as e:
        return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)



def getting_daily_expenses(request):
    if request.method == 'POST':
        serializer = ExpenseSerializer()