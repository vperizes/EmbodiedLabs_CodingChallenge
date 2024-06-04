from django.shortcuts import render
from django.http import HttpResponse
import requests


def userProfileDashboard(request):
    base_url = "https://randomuser.me/api/"
    api_response = requests.get(base_url, params={"results": 5})
    users = api_response.json()

    print(users)

    return render(request, "dashboard/users.html", {"users": users})
