from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import JobApplicationViewSet, ApplicationNotesView

router = DefaultRouter()
router.register(r'applications', JobApplicationViewSet, basename='application')

urlpatterns = [
    path('applications/<int:pk>/notes/', ApplicationNotesView.as_view(), name='application-notes'),
    path('', include(router.urls)),
]