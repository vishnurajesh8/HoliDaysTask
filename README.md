# Project Title

## Overview
This project allows users to fetch and display holiday data for various countries and years using the Calendarific API. The application includes a backend implemented with Django REST framework and a frontend built with your preferred technology stack.

## Table of Contents
1. [Setup Instructions](#setup-instructions)
2. [Running the Application](#running-the-application)
3. [API Key Setup](#api-key-setup)
4. [Additional Notes and Challenges](#additional-notes-and-challenges)

## Setup Instructions

### Backend
1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd <repository_directory>
   ```

2. Create a virtual environment and activate it:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Apply database migrations:
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

5. Create a superuser (optional, for admin access):
   ```bash
   python manage.py createsuperuser
   ```

### Frontend
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables (if applicable).

## Running the Application

### Backend
Start the Django development server:
```bash
python manage.py runserver
```
The backend will be accessible at `http://127.0.0.1:8000/`.

### Frontend
Start the frontend development server:
```bash
npm start
```
The frontend will be accessible at `http://localhost:3000/` (default).

## API Key Setup
1. Obtain an API key from [Calendarific](https://calendarific.com/).
2. Add the API key to your Django settings file. Open `settings.py` and set the following:
   ```python
   CALENDARIFIC_API_KEY = "your_api_key_here"
   ```
3. Restart the backend server to apply changes.

## Additional Notes and Challenges
- **Caching:** Implemented caching to reduce redundant API calls and improve performance. Cached data expires after 24 hours.
- **Error Handling:** Comprehensive error handling for API responses and date format validation.
- **Challenges Faced:**
  - Managing date parsing and validation with different formats.
  - Ensuring proper database relationships and indexing for optimal query performance.
  - Synchronizing frontend and backend error reporting for a seamless user experience.

For further details, refer to the project documentation or contact the development team.

