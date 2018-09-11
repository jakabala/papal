from django.shortcuts import render
from rest_framework import generics, viewsets, filters
from .models import Papers
from .serializers import PapersSerializers
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.generics import RetrieveUpdateDestroyAPIView

# Create your views here.

class ListPapersViewSet(viewsets.ModelViewSet):
    queryset = Papers.objects.all()
    serializer_class = PapersSerializers
    filter_backends = [SearchFilter, OrderingFilter]
    ordering_fields = ['title', 'year', 'receipient', 'sender', 'text']
    search_fields = ['title', 'year', 'receipient', 'sender', 'text']
