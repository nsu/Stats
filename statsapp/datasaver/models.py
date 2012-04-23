from django.db import models

# Create your models here.
class Subject(models.Model):
    guID=models.CharField(max_length=255)
    isGamePlayer = models.BooleanField()
    isPuzzlePlayer = models.BooleanField()
    isFPSPlayer = models.BooleanField()
    isRTSPlayer = models.BooleanField()
    isSC2Player = models.BooleanField()
    league=models.CharField(max_length=255, null=True)
    
class Trial(models.Model):
    clickAcc=models.FloatField()
    keyAcc=models.FloatField()
    # totClick=models.IntegerField()
    # totKey=models.IntegerField()
    subject=models.ForeignKey(Subject)
    clickRatio=models.FloatField()
    keyRatio=models.FloatField()
    score = models.FloatField()
    created = models.DateTimeField(auto_now_add=True)

    
    
