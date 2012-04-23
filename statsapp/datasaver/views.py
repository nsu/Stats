from django.shortcuts import render
import urllib
from django.http import HttpResponse
from models import *
import json

# Create your views here.
def submit(request):
    if not request.is_ajax:
        return HttpResponse()
    subj = Subject.objects.get_or_create(guID=request.GET['guid'])
    if subj[1]:
        subj = subj[0]
        subj.isGamePlayer = json.loads(request.GET['vgames'])
        subj.isFPSPlayer = json.loads(request.GET['FPS'])
        subj.isPuzzlePlayer = json.loads(request.GET['puzzle'])
        subj.isRTSPlayer = json.loads(request.GET['RTS'])
        subj.isSC2Player = json.loads(request.GET['scTwo'])
        subj.league = request.GET['league']
        subj.save()
    else:
        subj = subj[0]
    trial = Trial()
    trial.clickAcc = request.GET['clickAcc']
    trial.keyAcc = request.GET['keyAcc']
    trial.clickRatio = request.GET['clickRatio']
    trial.keyRatio = request.GET['keyRatio']
    trial.subject = subj
    trial.score = round(((float(trial.clickRatio)+float(trial.keyRatio))/2)*((float(trial.clickAcc)+float(trial.keyAcc))/2)*10000)
    trial.save()
    return HttpResponse()

def leaderboard(request, guid=None):
    highScore=None
    if guid:
        subj = Subject.objects.get(guID=guid)
        highScore = Trial.objects.filter(subject=subj).order_by("-score")[0].score
    trials = Trial.objects.all().order_by("-score")[:10]
    return render(request, 'leaderboard.html', {"trials": trials, "guid": guid, "highScore": highScore})