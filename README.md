# Embodied Labs coding challenge
The goal was to create a backend with python/django to fetch data from the Random User Generator API and then create a frontend that incorporates three.js to display user data by click on primatives.  

### Quick Start
The following commands will help get you set up after you download or clone the project and navigate to the root folder. 
- Set up a virtual env for your backend after you've done use the command `pip install -r requirements.txt` to install all the necessary packages for the backend.
- cd into the client folder (this is the frontend) and use the command `npm install` to install all necessary packages for the frontend.

To use the app locally, you must run both the frontend and backend servers concurrenty. First, make sure your virutal environemnt is activated then navigate to the folder titled "el_codingChallenge" and use the command `py manage.py runserver`. This will start your backend server.

In a seperate terminal window navigate to the client folder and use the command `npm run dev`. This will start your frontend server. Navigate to the localhost url specified in the terminal where you started your frontend server to play with the protoype. 

### Known issues
Currently there is an issue where a cube is not automatically deselected when a new cube is selected. 

### Resources
This was my first time using three.js. As such, I realied heavily on the three.js documnetation and [these tutorials](https://youtube.com/playlist?list=PLjcjAqAnHd1EIxV4FSZIiJZvsdrBc1Xho&si=ygkpALQUv0GUyb_c)
  
