from datetime import datetime, timezone

from django.shortcuts import get_object_or_404
from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import JobApplication
from .mongo import notes
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


class ApplicationNotesView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, pk):
        # 404 if the application doesn't exist or belongs to someone else
        get_object_or_404(JobApplication, pk=pk, user=request.user)
        docs = notes.find({'application_id': pk}).sort('created_at', -1)
        data = [
            {'id': str(d['_id']), 'text': d['text'], 'created_at': d['created_at']}
            for d in docs
        ]
        return Response(data)

    def post(self, request, pk):
        get_object_or_404(JobApplication, pk=pk, user=request.user)
        text = str(request.data.get('text', '')).strip()
        if not text:
            return Response(
                {'detail': 'Note text is required.'},
                status=status.HTTP_400_BAD_REQUEST,
            )
        doc = {
            'application_id': pk,
            'user_id': request.user.id,
            'text': text,
            'created_at': datetime.now(timezone.utc),
        }
        result = notes.insert_one(doc)
        return Response(
            {'id': str(result.inserted_id), 'text': text, 'created_at': doc['created_at']},
            status=status.HTTP_201_CREATED,
        )