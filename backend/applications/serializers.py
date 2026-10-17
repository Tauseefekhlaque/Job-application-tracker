from rest_framework import serializers
from .models import JobApplication


class JobApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobApplication
        fields = [
            'id', 'company', 'position', 'location',
            'job_url', 'status', 'applied_date', 'created_at',
        ]
        read_only_fields = ['id', 'created_at']