from django.urls import path, re_path

from .views import (
   notes,
   create_note,
   view_note,
   edit_note,
   delete_note
)

app_name = "api_v1_notes"

urlpatterns = [
    re_path(r"^create-note/$", create_note, name="create_note"),
    re_path(r"^$", notes, name="notes"),
    re_path(r"^edit/(?P<pk>.*)/$", edit_note, name="edit_note"),
    re_path(r"^delete/(?P<pk>.*)/$", delete_note, name="delete_note"),
    re_path(r"^(?P<pk>.*)/$", view_note, name="view_note"),
    
    
    
]

