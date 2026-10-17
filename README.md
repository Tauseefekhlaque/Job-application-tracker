# Job Application Tracker

A full stack web app to track job applications through each stage: Applied, Interview, Offer, and Rejected.

## Tech Stack

- **Backend:** Python, Django, Django REST Framework
- **Authentication:** JWT (SimpleJWT)
- **Database:** SQL (SQLite)
- **Frontend:** React, Bootstrap (in progress)

## Features

- User login with JWT tokens
- Add, view, edit, and delete job applications
- Each user only sees their own applications
- Admin panel to manage data

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/token/` | Log in and get tokens |
| POST | `/api/token/refresh/` | Get a new access token |
| GET | `/api/applications/` | List your applications |
| POST | `/api/applications/` | Add an application |
| PUT/PATCH | `/api/applications/<id>/` | Update an application |
| DELETE | `/api/applications/<id>/` | Delete an application |

## How to Run the Backend

1. Clone the repo and open the `backend` folder
2. Create and activate a virtual environment
3. Install the packages
4. Run the migrations and start the server

cd backend
python -m venv venv
venv\Scripts\activate
pip install django djangorestframework django-cors-headers djangorestframework-simplejwt pymongo
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver

## Author

Tauseef Ekhlaque