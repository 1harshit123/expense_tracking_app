from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status
from .models import UserProfile, Expense
from .serializers import UserProfileSerializer, ExpenseSerializer, RegistrationSerializer, LoginSerializer
from django.contrib.auth import login
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from rest_framework_simplejwt.exceptions import TokenError, InvalidToken
from rest_framework.authtoken.models import Token
from django.views.decorators.csrf import csrf_exempt
from rest_framework import authentication
   


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
    

@api_view(['GET'])
@permission_classes([AllowAny])
def check_login_status(request):
    if(request.user.is_authenticated):
        serializer = UserProfileSerializer(request.user)
        return Response({
            'is_logged_in': True,
            'user': serializer.data
        }, status=status.HTTP_200_OK)
    else:
        return Response({
            'is_logged_in': False,
            'message': 'No user is currently logged in.'
        }, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def daily_expenses(request):
    if request.method == 'POST':
        serializer = ExpenseSerializer(data = request.data)
        if serializer.is_valid():
            user_profile = UserProfile.objects.get(data = request.data)
            serializer.save(user = user_profile)
            return Response({
                'user': UserProfile(request.user).data,
                'Details': request.data
            }, status = status.HTTP_400_BAD_REQUEST)
    else:
        return Response(
            {
                'message': 'Some error with the view and serilizer'
            }, status=status.HTTP_400_BAD_REQUEST
        )

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getting_expanse(request):
    user_profile = UserProfile.objects.get(user = request.user)
    expenses = Expense.objects.filter(user = user_profile)
    serializer = ExpenseSerializer(expenses, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)