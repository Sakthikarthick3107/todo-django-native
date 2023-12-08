from django.db import models
from django.utils import timezone
# Create your models here.

class Todo(models.Model):
    sno = models.AutoField(primary_key=True)
    user = models.CharField(max_length=200 )
    task = models.CharField(max_length=200)
    completed = models.BooleanField(default= False)
    creation_timestamp = models.DateTimeField(auto_now_add=True)
    completion_timestamp = models.DateTimeField(null=True , blank=True)
    
    def complete_task(self , *args , **kwargs):
        self.completed = True
        self.completion_timestamp = timezone.now()
        self.save()
        # If the task is being marked as completed and completion_timestamp is not set
        if self.completed and not self.completion_timestamp:
            self.completion_timestamp = timezone.now()
        # Call the original save method
        super().save(*args, **kwargs)