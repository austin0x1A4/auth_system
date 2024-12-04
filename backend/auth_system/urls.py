from django.urls import path, include, re_path
from django.views.generic import TemplateView
from accounts.views import UserProfileView

urlpatterns = [
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('auth/', include('djoser.social.urls')),
    path('auth/users/me/', UserProfileView.as_view(), name='user-profile'),
]

urlpatterns += [re_path(r'^.*', TemplateView.as_view(template_name='index.html'))]
