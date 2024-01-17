from rest_framework import serializers
from notes.models import Note
    
  
class CreateNoteSerializer(serializers.Serializer):
    title = serializers.CharField()
    body = serializers.CharField()
    
    def update(self, instance, validated_data):
        instance.title = validated_data.get('title', instance.title)
        instance.body = validated_data.get('body', instance.body)
        instance.save()
        
        return instance
    

  
class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = '__all__'
