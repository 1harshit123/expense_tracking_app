from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import user_registration, user_login, UserProfile, user_logout
# You need to import the view you want to use

urlpatterns = [
     path('api/register/', user_registration, name='user_registration'),
    #path('api/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),   # JWT login
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
     path('api/login/', user_login, name = 'user_login'),
    path('api/logout/', user_logout, name = 'user_logout')
]