# MiningPapal

MiningPapal was built with the following technologies: Python3, Django, JavaScript(ES6), and React.js

In order to run the project's two development servers (client and server-side) you must have Python3, and Node.js installed on your machine.

Node - [https://nodejs.org/en/download/]
Python3 - [https://www.python.org/downloads/]

## Launch Development Server 

In the project's root directory within Terminal(Bash) run the following commands:

* `virtualenv -p python3 {envname}` (First time only! This will create a Python3 virtual environment with the name of the environment being whatever is placed in the {envname}(omit the curly braces) - [https://stackoverflow.com/questions/23842713/using-python-3-in-virtualenv])

* `source {envname}/bin/activate` (This activates the virtual environment)

* `pip3 install -r requirements.txt` (This will install the project's Python dependecies from requirements.txt)

* `cd api/ && python3 manage.py runserver` (This will run the python Django API at [http://127.0.0.1:8000/])

* `Open a new terminal tab or window`

* `cd /papal/api/papel_frontend && npm i` (This will install the project's JavaScript dependecies from package.json)

* `npm run start` (This will run the JavaScript React frontend at [http://127.0.0.1:3000/]. NOTE: React may prompt you to change ports if you currently have something running on port 3000) 

You're all set now! Happy Hacking!

