from django.db import models

# Create your models here.
class Papers(models.Model):
    timestamp = models.DateTimeField(auto_now_add=True, null=False, editable=False)
    text = models.TextField(max_length=500000, null=False)
    title = models.CharField(max_length=250, null=False)
    year = models.CharField(max_length=10, null=True)
    receipient = models.CharField(max_length=250, null=True)
    sender = models.CharField(max_length=250, null=True)

def __str__(self):
    """A string of the model"""
    return self.name


    class Meta:
        verbose_name_plural = "Papers"
