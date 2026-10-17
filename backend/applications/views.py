from rest_framework import viewsets, permissions
from .models import JobApplication
from .serializers import JobApplicationSerializer


class JobApplicationViewSet(viewsets.ModelViewSet):
    serializer_class = JobApplicationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Each user only sees their own applications
        return JobApplication.objects.filter(user=self.request.user).order_by('-applied_date')

    def perform_create(self, serializer):
        # Attach the logged-in user automatically
        serializer.save(user=self.request.user)