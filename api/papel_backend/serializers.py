from rest_framework import serializers
from .models import Papers

class PapersSerializers(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Papers
        fields= ["text", "timestamp"]
