# Gym Management System

## Overview
The Gym Management System is a full-stack web application designed to manage various aspects of a gym, including members, trainers, fitness classes, schedules, attendance, and payments. The application is built using Flask for the backend and React for the frontend.

## Features
- Member Management: Add, update, delete, and list gym members.
- Trainer Management: Add, update, delete, and list trainers.
- Fitness Class Management: Add, update, delete, and list fitness classes.
- Schedule Management: Manage the schedules for fitness classes.
- Attendance Tracking: Track attendance for fitness classes.
- Payment Management: Record and manage payments made by members.

## Technologies Used
### Backend
- Flask
- Flask-CORS
- Flask-RESTful
- Flask-SQLAlchemy
- Flask-Migrate

### Frontend
- React
- Axios
- React Router DOM

## Setup Instructions

### Backend Setup

1. **Clone the repository**:
    ```bash
    git clone <repository_url>
    cd gym-management-system/server
    ```

2. **Install dependencies**:
    ```bash
    pipenv install
    ```

3. **Activate the virtual environment**:
    ```bash
    pipenv shell
    ```

4. **Initialize the database**:
    ```bash
    flask db init
    flask db migrate -m "Initial migration"
    flask db upgrade
    ```

5. **Seed the database**:
    ```bash
    python seed.py
    ```

6. **Run the Flask server**:
    ```bash
    python app.py
    ```
    The server will run on `http://localhost:5555`.

### Frontend Setup

1. **Navigate to the client directory**:
    ```bash
    cd ../client
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Start the React application**:
    ```bash
    npm start
    ```
    The client will run on `http://localhost:3000`.

## Directory Structure
.
└── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── MemberList.js
│   │   │   ├── TrainerList.js
│   │   │   ├── FitnessClassList.js
│   │   │   ├── ScheduleList.js
│   │   │   ├── AttendanceList.js
│   │   │   ├── PaymentList.js
│   │   ├── App.js
│   │   ├── index.js
│   ├── package.json
├── server/
│   ├── app.py
│   ├── config.py
│   ├── models.py
│   ├── resources/
│   │   ├── __init__.py
│   │   ├── member.py
│   │   ├── trainer.py
│   │   ├── fitness_class.py
│   │   ├── schedule.py
│   │   ├── attendance.py
│   │   ├── payment.py
│   ├── seed.py
│   ├── migrations/
│   └── instance/
│       └── app.db
├── Pipfile
├── Pipfile.lock
├── README.md



## API Endpoints

### Member Endpoints
- `GET /members` - Retrieve a list of all members.
- `GET /members/:id` - Retrieve a single member by its ID.
- `POST /members` - Create a new member.
- `PUT /members/:id` - Update an existing member by its ID.
- `DELETE /members/:id` - Delete a member by its ID.

### Trainer Endpoints
- `GET /trainers` - Retrieve a list of all trainers.
- `GET /trainers/:id` - Retrieve a single trainer by its ID.
- `POST /trainers` - Create a new trainer.
- `PUT /trainers/:id` - Update an existing trainer by its ID.
- `DELETE /trainers/:id` - Delete a trainer by its ID.

### Fitness Class Endpoints
- `GET /fitness_classes` - Retrieve a list of all fitness classes.
- `GET /fitness_classes/:id` - Retrieve a single fitness class by its ID.
- `POST /fitness_classes` - Create a new fitness class.
- `PUT /fitness_classes/:id` - Update an existing fitness class by its ID.
- `DELETE /fitness_classes/:id` - Delete a fitness class by its ID.

### Schedule Endpoints
- `GET /schedules` - Retrieve a list of all schedules.
- `GET /schedules/:id` - Retrieve a single schedule by its ID.
- `POST /schedules` - Create a new schedule.
- `PUT /schedules/:id` - Update an existing schedule by its ID.
- `DELETE /schedules/:id` - Delete a schedule by its ID.

### Attendance Endpoints
- `GET /attendances` - Retrieve a list of all attendances.
- `GET /attendances/:id` - Retrieve a single attendance by its ID.
- `POST /attendances` - Create a new attendance.
- `PUT /attendances/:id` - Update an existing attendance by its ID.
- `DELETE /attendances/:id` - Delete an attendance by its ID.

### Payment Endpoints
- `GET /payments` - Retrieve a list of all payments.
- `GET /payments/:id` - Retrieve a single payment by its ID.
- `POST /payments` - Create a new payment.
- `PUT /payments/:id` - Update an existing payment by its ID.
- `DELETE /payments/:id` - Delete a payment by its ID.

## Components

### Backend
- **app.py**: Initializes the Flask application and sets up the API routes.
- **config.py**: Configuration for the Flask application, including the database setup.
- **models.py**: Defines the database models.
- **resources/**: Contains the API resources for managing members, trainers, fitness classes, schedules, attendance, and payments (CRUD operations).
- **seed.py**: Seeds the database with initial data.

### Frontend
- **src/App.js**: Defines the main routes of the React application.
- **src/components/**: Contains components for listing and managing members, trainers, fitness classes, schedules, attendance, and payments.

## Usage
1. Start the backend server.
2. Start the frontend client.
3. Navigate to `http://localhost:3000` to use the application.

## Contributing
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes and commit them (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
