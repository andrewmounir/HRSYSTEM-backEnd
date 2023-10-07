// Requiring All our dependancies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const employeeController = require('./controllers/employeeController');
// DotEnv for storing our variables
dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Connecting our DB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('connected to DB');
  })
  .catch((err) => {
    console.error('error connecting to mongoDB', err);
  });
//Setting our local Port Number
const port = process.env.PORT || 3000;
// Statring the server
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
// Creating Employees Post Route
app.use('/employees', employeeController.createEmployee);
// Deleting Employees Route
app.delete('/employeesdelete/:id', employeeController.deleteEmployee);
// logging Route Only As HR
app.post('/loginPage', employeeController.loginEmployee);
//  Attendace Date Route
app.post('/addAttendance/:id', employeeController.addDate);

//Get All Employees
app.get('/getAll', employeeController.getEmployees);

//Get Specific Employee BY ID
app.get('/getEmployee/:id', employeeController.getEmployeeByID);

//Edit Employee Details by ID
app.patch('/updateEmployee/:id', employeeController.updateEmployeeDetails);

//Delete Employee Date BY ID and Index
app.delete(
  '/deleteSpecificDate/:id/:index',
  employeeController.deleteSpecificDate
);
