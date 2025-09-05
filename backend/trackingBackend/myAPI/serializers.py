from rest_framework import serializers
from .models import UserProfile, Expense
from django.contrib.auth import get_user_model
User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']  # or fields you want

class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)  # nested user serializer
    class Meta:
        model = UserProfile
        fields = ['id', 'user', 'income', 'savings']

class ExpenseSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())  # or nested serializer if needed

    class Meta:
        model = Expense
        fields = ['id', 'user', 'amount', 'date', 'description']
