from django.shortcuts import render
import requests
from django.http import JsonResponse


# performs get request on Random user generator API
def userProfileDashboard(request):
    base_url = "https://randomuser.me/api/"
    api_response = requests.get(base_url, params={"results": 5, "nat": "us"})
    users = api_response.json()

    # simplifying the returned data into a new array. Only displaying pertinent data -> reduced dot notation/chaining on front end
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

    return JsonResponse(simplified_users, safe=False)
