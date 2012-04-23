from django.http import HttpResponse
from models import *
import json

# Create your views here.
def submit(request):
    subj = Subject.objects.get_or_create(guID=request.GET['guid'])
    if subj[1]:
        subj = subj[0]
        subj.isRTSPlayer = request.GET['RTS']
        subj.isSC2Player = request.GET['scTwo']
        subj.league = request.GET['league']
        subj.save()
    else:
        subj = subj[0]
    trial = Trial()
    trial.clickAcc = request.GET['clickAcc']
    trial.keyAcc = request.GET['keyAcc']
    trial.totCorrectClicks = request.GET['correctClick']
    trial.totCorrectPress = request.GET['correctPress']
    trial.subject = subj
    trial.clickAtEnd = request.GET['clickRemaining']
    trial.keysAtEnd = request.GET['keyRemaining']
    trial.save()
    return HttpResponse()