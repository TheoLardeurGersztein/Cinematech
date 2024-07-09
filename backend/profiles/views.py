from django.contrib.auth.decorators import login_required
from rest_framework import status, viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Profile
from .serializers import ProfileSerializer


class ProfilesView(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]

    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def list(self, request, *args, **kwargs):
        profile_id = request.headers.get('X-Profile-ID')
        if profile_id:
            try:
                profile = Profile.objects.get(id=profile_id, user=request.user)
                serializer = self.get_serializer(profile)
                return Response(serializer.data)
            except:
                return Response()
        else:
            return Response()


class ProfileListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        account_id = request.user.id
        if account_id:
            profiles = Profile.objects.filter(user__id=account_id)
            serializer = ProfileSerializer(profiles, many=True)
            return Response(serializer.data)
        else:
            return Response()
