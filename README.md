# HR System Backend

Welcome to the HR System Backend! This project follows the MVC (Model-View-Controller) architecture and is designed to serve as the backend for a HR management system.

## Features

- Create employees
- Delete employees
- Login employees
- Add attendance date for employees
- Get a list of all employees
- Get information about a specific employee
- Edit specific employee details
- Delete specific employee
- Implement password hashing for secure password storage in the database

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- Bcrypt

## Project Structure

The project structure follows the MVC architecture:

- `models/`: Contains database models and schemas.
- `routes/`: Defines API routes and controllers.
- `controllers/`: Handles business logic.
- `server.js`: Main server file.

## Getting Started

1. Clone this repository.
2. Install dependencies using `npm install`.
3. Configure your database settings in the appropriate configuration file.
4. Start the server using `npm start`.

## API Endpoints

- `POST /loginpage`: Authenticate users.
- `POST /employees`: Create a new employee.
- `DELETE /employees/:id`: Delete an employee by ID.
- `GET /getAll`: Get a list of all employees.
- `GET /getEmployee/:id`: Get employee details by ID.
- `PATCH /updateEmployee/:id`: Update employee details by ID.
- `POST /addAttendance/:id`: Add attendance date for an employee by ID.
- `DELETE /deleteSpecificDate/:id/:index`: Delete a specific attendance date for an employee by ID and index.

## Security

- Passwords are securely hashed before being stored in the database.

## Developed

BackEnd Developed as part of a requiremnt from the documentaion by Andrew Essaam
