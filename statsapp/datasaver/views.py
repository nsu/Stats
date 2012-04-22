from django.http import HttpResponse

# Create your views here.
def submit(request):
    for key in request.GET:
        print key, request.GET[key]
    return HttpResponse()
