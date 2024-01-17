from django.core.paginator import EmptyPage, PageNotAnInteger, Paginator
from django.db.models import Q
from django.utils.dateparse import parse_date
from django.utils import timezone

from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import status
from rest_framework.decorators import permission_classes, api_view

from datetime import datetime, timedelta, date

from .serializers import ( 
    NoteSerializer,
    CreateNoteSerializer
    )
from notes.models import Note


@api_view(['POST'])
def create_note(request):
    """
    View function to create a new note

    """
    serializer = CreateNoteSerializer(data=request.data)
    if serializer.is_valid():
        title = request.data.get('title')
        body = request.data.get('body')
        
        note = Note.objects.create(
            title=title,
            body=body
        )
        
        response_data = {
            "StatusCode": 6000,
            "data": {
                "title": "Success",
                "message": "Note created successfully"
            }
        }
    else:
        response_data = {
            "StatusCode":6001,
            "data":{
                "title":"Failed",
                "message":serializer._errors
            }
        }
        
    return Response(response_data, status=status.HTTP_201_CREATED)


@api_view(['GET'])
@permission_classes((AllowAny,))
def notes(request):
    """
    View function to get list of notes.

    """
    if Note.objects.filter(is_deleted=False).exists():
        notes = Note.objects.filter(is_deleted=False)
              
        serializer = NoteSerializer(notes, many=True)
        
        response_data = {
            "StatusCode":6000,
            "title":"Success",
            "data":serializer.data
        }
    else:
        response_data = {
            "StatusCode":6001,
            "data":{
                "title":"Failed",
                "message":"Notes not found"
            }
        }
    
    return Response(response_data, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes((AllowAny,))
def view_note(request, pk):
    """
    View function to get details of a particular note.

    """
    if Note.objects.filter(pk=pk, is_deleted=False).exists():
        note = Note.objects.get(pk=pk, is_deleted=False)
              
        serializer = NoteSerializer(note, many=False)
        
        response_data = {
            "StatusCode":6000,
            "title":"Success",
            "data":serializer.data
        }
    else:
        response_data = {
            "StatusCode":6001,
            "data":{
                "title":"Failed",
                "message":"Notes not found"
            }
        }
    
    return Response(response_data, status=status.HTTP_200_OK)


@api_view(['PUT'])
@permission_classes((AllowAny,))
def edit_note(request, pk):
    """
    View function to edit of a particular note.

    """
    if Note.objects.filter(pk=pk, is_deleted=False).exists():
        note = Note.objects.get(pk=pk, is_deleted=False)
              
        serializer = CreateNoteSerializer(note, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()

        response_data = {
            "StatusCode": 6000,
            "title": "Success",
            "data": serializer.data
        }
    else:
        response_data = {
            "StatusCode":6001,
            "data":{
                "title":"Failed",
                "message":"Notes not found"
            }
        }
    
    return Response(response_data, status=status.HTTP_200_OK)


@api_view(['DELETE'])
@permission_classes((AllowAny,))
def delete_note(request, pk):
    """
    View function to delete of a particular note.

    """
    if Note.objects.filter(pk=pk, is_deleted=False).exists():
        note = Note.objects.get(pk=pk, is_deleted=False)
              
        note.is_deleted = True
        note.save()

        response_data = {
            "StatusCode": 6000,
            "data":{
                "title":"Success",
                "message":"Deleted successfully"
            }
        }
    else:
        response_data = {
            "StatusCode":6001,
            "data":{
                "title":"Failed",
                "message":"Notes not found"
            }
        }
    
    return Response(response_data, status=status.HTTP_200_OK)







