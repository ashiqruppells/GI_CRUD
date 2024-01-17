from django.contrib import admin
from django.views.static import serve
from django.urls import path, include, re_path
from django.conf import settings as SETTINGS

urlpatterns = [
    path('admin/', admin.site.urls),
    
    path('api/v1/notes/', include('api.v1.notes.urls', namespace="api_v1_notes")),
    
    # Media & Static
    re_path(r'^media/(?P<path>.*)$', serve, {'document_root': SETTINGS.MEDIA_ROOT}),
    re_path(r'^static/(?P<path>.*)$', serve, {'document_root': SETTINGS.STATIC_FILE_ROOT}),

]
