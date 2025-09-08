from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import UserProfile, Expense
from .serializers import UserProfileSerializer, ExpenseSerializer

def user_registration(request):
    if request.method == 'post':
        serializer = 


def getting_daily_expenses(request):
    if request.method == 'POST':
        serializer = ExpenseSerializer()