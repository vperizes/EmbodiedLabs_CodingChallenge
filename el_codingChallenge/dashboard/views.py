from django.shortcuts import render
from django.http import HttpResponse
import requests


def userProfileDashboard(request):
    base_url = "https://randomuser.me/api/"
    api_response = requests.get(base_url, params={"results": 5, "nat": "us"})
    users = api_response.json()

    simplified_users = []
    for user in users["results"]:
        try:
            simplified_user = {
                "gender": user["gender"],
                "first_name": user["name"]["first"],
                "last_name": user["name"]["last"],
                "email": user["email"],
                "cell_phone": user["cell"],
                "profile_pic": user["picture"]["medium"],
            }
            simplified_users.append(simplified_user)
        except:
            print("invalid data")

    return render(request, "dashboard/users.html", {"users": simplified_users})
