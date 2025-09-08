from django.db import models
from django.contrib.auth import get_user_model
User = get_user_model()
# Create your models here.


class UserProfile(models.Model):
    user = models.OneToOneField(get_user_model(), on_delete=models.CASCADE)
    income = models.DecimalField(max_digits=10, null=True, blank=True, decimal_places=2)
    savings = models.DecimalField(max_digits=10, null = True, blank=True, decimal_places=2)
    def __str__(self):
        return f"{self.user.username} Profile"
        

class Expense(models.Model):
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, null = True, blank=True, decimal_places=2)
    date = models.DateField()
    description = models.TextField(blank=True, null=True)
    def __str__(self):
        return f"{self.user.user.username} Expenses"
    
