from django.contrib import admin
from .models import Papers

# Register your models here.

admin.site.register(Papers)
admin.site.site_header = "Papal Adminstrator"
admin.site.site_url = "http://localhost:8000/api/papers/"
