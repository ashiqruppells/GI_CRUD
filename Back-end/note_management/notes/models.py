import uuid
from django.db import models


class Note(models.Model):
    id = models.UUIDField(default=uuid.uuid4, primary_key=True, editable=False)
    title = models.CharField(max_length=255)
    body = models.TextField(blank=True, null=True)
    is_deleted = models.BooleanField(default=False)
    
    class Meta:
        db_table = 'notes_note'
        verbose_name = 'note'
        verbose_name_plural = 'notes'
        ordering = ('title',)

    def __str__(self):
        return self.title