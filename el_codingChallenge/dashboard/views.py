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
                "first_name": user["name"]["first"],
                "last_name": user["name"]["last"],
                "email": user["email"],
                "cell_phone": user["cell"],
                "profile_pic": user["picture"]["medium"],
                "user_id": user["login"]["uuid"],
            }
            simplified_users.append(simplified_user)
        except Exception as err:
            print(f"Error processing user data: {err}")

    return JsonResponse(simplified_users, safe=False)
