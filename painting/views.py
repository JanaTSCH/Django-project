from django.shortcuts import render

# Create your views here.
def painting(request):
    return render(request, 'painting/index.html')