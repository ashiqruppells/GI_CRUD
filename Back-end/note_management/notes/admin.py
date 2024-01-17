from django.contrib import admin
from .models import Note

class NoteAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'body')
    search_fields = ('title', 'body')
    
admin.site.register(Note, NoteAdmin)