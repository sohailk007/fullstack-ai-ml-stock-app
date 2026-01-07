from rest_framework import generics
from rest_framework.permissions import AllowAny
from django.contrib.auth import get_user_model
from .serializers import RegisterSerializer
from drf_spectacular.utils import extend_schema
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer, TokenRefreshSerializer
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser

User = get_user_model()

@extend_schema(
    tags=['Accounts'],
    request={
        "application/json": RegisterSerializer,
        },
    responses={201: RegisterSerializer},
)
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]
    parser_classes = [JSONParser]

@extend_schema(
    tags=['Accounts'],
    request={
        "application/json": TokenObtainPairSerializer
    },
)
class LoginView(TokenObtainPairView):
    permission_classes = [AllowAny]
    parser_classes = [JSONParser]

@extend_schema(
    request={
        "application/json": TokenRefreshSerializer
    },
    responses={200: TokenRefreshSerializer},
    tags=['Accounts'],
    
)
class RefreshTokenView(TokenRefreshView):
    permission_classes = [AllowAny]
    parser_classes = [JSONParser]

@extend_schema(
    request={
        "application/json": {}
    },
    responses={
        200: {
            "message": "You have been Hacked"
        }
    }
)    
class ProtectedView(generics.RetrieveAPIView):
    
    response = {
        "message": "You have been Hacked"
    }
    
    def get(self, request, *args, **kwargs):
        return Response(self.response)
    
