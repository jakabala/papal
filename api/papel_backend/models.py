from django.db import models

# Create your models here.
class Papers(models.Model):
    timestamp = models.DateTimeField(auto_now_add=True, null=False, editable=False)
    text = models.TextField(max_length=500000, null=False)
    class Meta:
        verbose_name_plural = "Papers"
