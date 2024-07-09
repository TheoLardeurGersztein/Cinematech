from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView

from .serializers import AccountSerializer
from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
import json
from rest_framework.response import Response

class AccountInfoView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        print(request.headers)
        user = request.user
        print(user)

        return Response({
            'id': user.id,
            'username': user.username,
            'email': user.email,
        })
