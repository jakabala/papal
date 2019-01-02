from rest_framework import serializers
from .models import Papers

class PapersSerializers(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Papers
        fields= [ "title", "text", "id", "timestamp", "year", "receipient", "sender"]
