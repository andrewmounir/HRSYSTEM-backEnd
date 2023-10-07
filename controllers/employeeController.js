// Importing DB Schema
const employee = require('../models/employee');
const Employee = require('../models/employee');
//Used to Hash Password
const bcrypt = require('bcrypt');

//Creating Employee
const createEmployee = async (req, res) => {
  try {
    const { firstName, lastName, password, email, employeeType, group } =
      req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newEmployee = new Employee({
      firstName,
      lastName,
      email,
      employeeType,
      group,
      password: hashedPassword,
      date: []
    });
    await newEmployee.save();
    res.status(201).json({
      message: 'Employee created succesfully ',
      employee: newEmployee
    });
  } catch {
    res.status(500), json({ error: 'Internal Server Error', employee });
  }
};
//Deleting Employee
const deleteEmployee = (req, res) => {
  const employeeId = req.params.id;

  Employee.findById(employeeId)
    .then((employee) => {
      if (!employee) {
        console.log(employeeId);
        return res.status(404).json({ error: 'Employee not found' });
      }

      return employee.deleteOne();
    })
    .then(() => {
      res.status(204).send();
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    });
};
//Logging Employee
const loginEmployee = async (req, res) => {
  const { email, password } = req.body;
  try {
    const employee = await Employee.findOne({ email });
    if (!employee) {
      return res.status(404).json({ error: 'invalid email' });
    }

    if (employee.employeeType != 'HR') {
      return res.status(404).json({ error: 'Member Not in HR ' });
    }

    const PasswordValidator = await bcrypt.compare(password, employee.password);

    if (!PasswordValidator) {
      return res.status(401).json({ error: 'invalid Password' });
    }
    console.log('hello Hr User');
    res.status(201).json({ success: 'authenticated' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'internal server error' });
  }
};
//Adding Date
const addDate = (req, res) => {
  const employeeID = req.params.id;

  Employee.findById(employeeID)
    .then((employee) => {
      if (!employee) {
        return res.status(404).json({ error: 'No user with this ID' });
      }

      const date = req.body.date;

      employee.date.push(date);

      return employee.save();
    })
    .then(() => {
      res
        .status(200)
        .send({ success: true, message: 'Done added successfully' });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    });
};
// Getting Employee To be renderd in a table
const getEmployees = async (req, res) => {
  Employee.find()
    .then((employees) => {
      res.status(200).json(employees);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: `internal server error` });
    });
};

const getEmployeeByID = (req, res) => {
  const employeeID = req.params.id;
  console.log(employeeID);
  console.log(req.params.id);
  Employee.findById(employeeID)
    .then((employee) => {
      res.status(200).json(employee);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'internal Server Error' });
    });
};

const updateEmployeeDetails = (req, res) => {
  const updatedData = req.body;
  const employeeID = req.params.id;
  Employee.findByIdAndUpdate(employeeID, updatedData)
    .then((employee) => {
      if (!employee) {
        res.status(404).json({ error: 'cannot find employee' });
      }
      res.status(200).json(employee);
      console.log(employee);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'internal Server Error' });
    });
};

const deleteSpecificDate = (req, res) => {
  const employeeID = req.params.id;
  const dateIndex = req.params.index;

  Employee.findById(employeeID)
    .then((employee) => {
      console.log(employeeID);
      if (!employee) {
        res.status(404).json({ error: 'no user found with this id' });
      }
      console.log(`hi`);
      employee.date.splice(dateIndex, 1);
      return employee.save();
    })
    .then(() => {
      return res.status(204).json({ message: 'Date Deleted Successfully' });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
};

module.exports = {
  createEmployee,
  deleteEmployee,
  loginEmployee,
  addDate,
  getEmployees,
  getEmployeeByID,
  updateEmployeeDetails,
  deleteSpecificDate
};
