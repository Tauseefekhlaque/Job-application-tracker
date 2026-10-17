# Job Application Tracker

A full stack web app to track job applications through each stage: Applied, Interview, Offer, and Rejected.

## Screenshots

### Login
![Login page](screenshots/login.png)

### Dashboard
![Dashboard](screenshots/dashboard.png)

## Tech Stack

- **Backend:** Python, Django, Django REST Framework
- **Authentication:** JWT (SimpleJWT) with automatic token refresh
- **Database:** SQL (SQLite)
- **Frontend:** React (Vite), React Router, Axios, Bootstrap

## Features

- Secure login with JWT tokens
- Add job applications from a form
- Change the status of an application (Applied, Interview, Offer, Rejected)
- Delete applications
- Each user only sees their own applications
- Access token refreshes automatically when it expires
- Django admin panel to manage data

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/token/` | Log in and get tokens |
| POST | `/api/token/refresh/` | Get a new access token |
| GET | `/api/applications/` | List your applications |
| POST | `/api/applications/` | Add an application |
| PUT/PATCH | `/api/applications/<id>/` | Update an application |
| DELETE | `/api/applications/<id>/` | Delete an application |

## Project Structure

```
JobTracker/
├── backend/      Django REST API
├── frontend/     React app
└── screenshots/  Images for this README
```

## How to Run

You need two terminals, one for the backend and one for the frontend.

### 1. Backend (Terminal 1)

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install django djangorestframework django-cors-headers djangorestframework-simplejwt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

### 2. Frontend (Terminal 2)

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:5173 and log in with the superuser you created.

## Author

Tauseef Ekhlaque