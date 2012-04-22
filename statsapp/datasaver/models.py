from django.db import models

# Create your models here.
class Subject(models.Model):
    guID=models.CharField(max_length=255)
    isRTSPlayer=models.BooleanField()
    isSC2Player=models.BooleanField()
    league=models.CharField(max_length=255)
    
class Trial(models.Model):
    clickAcc=models.FloatField()
    keyAcc=models.FloatField()
    totBox=models.IntegerField()
    totKey=models.IntegerField()
    subject=models.ForeignKey(Subject)
    boxesAtEnd=models.IntegerField()
    keysAtEnd=models.IntegerField()
    totCorrectClicks=models.IntegerField()
    totCorrectPress=models.IntegerField()


    
    
