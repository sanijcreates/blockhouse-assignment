# Web Application with Next.js and Django

## Libraries and Tools Used

### Frontend (Next.js)
- **Next.js**
- **React**
- **Chart.js, react-apexcharts**: Library for creating interactive charts.

### Backend (Django)
- **Django**: 
- **Django REST Framework**: Toolkit for building Web APIs.
- **Django CORS Headers**: Middleware to handle Cross-Origin Resource Sharing (CORS) requests.

## Approach and Thought Process
I started by researching suitable libraries that I can use for this project. First, I built the Django APIs with hardcoded data and set up the API URLs. After testing these APIs with Postman to ensure they were functioning correctly, I moved on to the frontend development.

For the Next.js application, I began by studying the documentation to understand page layout, structure, and routing. I set up Axios for API calls and integrated the data with charts. After addressing a few bugs, I focused on styling the application and conducted a final review to ensure everything was working smoothly.

## Setup and Running the Application

### Prerequisites
- Node.js (for Next.js)
- Python (for Django)
- Pip (Python package installer)
-npm (Node Package Manager)

### Setting Up the Django Backend

1. **Clone the Repository:**
2. **cd to backend repository**
3. **Install Django and Dependencies**
   ```bash
    pip install -r requirements.txt
5. **Run Migrations**
   ```bash
    python manage.py migrate
6. **Django Dev Server**
   ```bash
    python manage.py runserver

### Setting Up the Next.js Frontend

1. **Navigate to Frontend Directory:**
   ```bash
    npm install
    npm run dev

