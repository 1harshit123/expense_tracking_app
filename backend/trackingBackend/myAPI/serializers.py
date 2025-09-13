from rest_framework import serializers
from .models import UserProfile, Expense
from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']  # or fields you want

class RegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    password1 = serializers.CharField(write_only = True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'password1']

    def validate(self, attrs):
        if(attrs['password'] != attrs['password1']):
            raise serializers.ValidationError({"Password" : "Password must match"})
        else:
            return attrs
    

    def create(self, validated_data):
        validated_data.pop('password1')
        user = User.objects.create_user(
            username = validated_data['username'],
            email = validated_data.get('email'),
            password = validated_data['password']
        )
        UserProfile.objects.create(user = user)
        return user
        
    

class LoginSerializer(serializers.Serializer):
    identifier = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        identifier = data.get("identifier")
        password = data.get("password")
        try:
            validate_email(identifier)
            user_obj = User.objects.filter(email__iexact=identifier).first()
        except ValidationError:
            user_obj = User.objects.filter(username__iexact=identifier).first()

        if user_obj:
            user = authenticate(username=user_obj.username, password=password)
            if user:
                return user

        raise serializers.ValidationError("Invalid credentials")

class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)  # nested user serializer
    class Meta:
        model = UserProfile
        fields = ['id', 'user', 'income', 'savings']

class ExpenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expense
        fields = ['id', 'user', 'amount', 'date', 'description']
