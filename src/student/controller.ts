const db = require("../../db");
const queries = require("./queries");

const getStudentsList = (req, res) => {
  db.query(queries.getStudents, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const getStudentsUsingId = (req, res) => {
  const id = parseInt(req.params.id);
  db.query(queries.getStudentsById, [id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const CreateStudent = (req, res) => {
  const { name, email, age, dob } = req.body;

  db.query(queries.checkEmailExists, [email], (error, results) => {
    if (error) throw error;
    if (results.rows.length) {
      res.send("Email already exists");
    }

    db.query(queries.addStudent, [name, email, age, dob], (error, results) => {
      if (error) throw error;
      res.status(201).send("Student added successfully");
      console.log("Student created successfully");
    });
  });
};

const RemoveStudent = (req, res) => {
  const id = parseInt(req.params.id);

  db.query(queries.getStudentsById, [id], (error, results) => {
    if (!results.rows.length) {
      res.send("Student not found");
    }
  });

  db.query(queries.deleteStudent, [id], (error, results) => {
    if (error) throw error;
    res.status(200).send("Student deleted successfully");
  });
};

const UpdateStudent = (req, res) => {
  const { name, email, age, dob } = req.body;

  db.query(
    queries.getStudentsById,
    [parseInt(req.params.id)],
    (error, results) => {
      if (!results.rows.length) {
        res.send("Student not found");
      }
    }
  );

  db.query(
    queries.updateStudent,
    [name, email, age, dob, parseInt(req.params.id)],
    (error, results) => {
      if (error) throw error;
      res.status(200).send("Student updated successfully");
    }
  );
};

module.exports = {
  getStudentsList,
  getStudentsUsingId,
  CreateStudent,
  RemoveStudent,
  UpdateStudent,
};
