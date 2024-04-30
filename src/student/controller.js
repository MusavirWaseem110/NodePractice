const pool = require("../../db");
const queries = require("./queries");

const getStudents = (req, res) => {
  pool.query(queries.getStudents, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const getStudentsById = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getStudentsById, [id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const addStudent = (req, res) => {
  const { name, email, age, dob } = req.body;

  pool.query(queries.checkEmailExists, [email], (error, results) => {
    if (error) throw error;
    if (results.rows.length) {
      res.send("Email already exists");
    }

    pool.query(
      queries.addStudent,
      [name, email, age, dob],
      (error, results) => {
        if (error) throw error;
        res.status(201).send("Student added successfully");
        console.log("Student created successfully");
      }
    );
  });
};

const deleteStudent = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query(queries.getStudentsById, [id], (error, results) => {
    if (!results.rows.length) {
      res.send("Student not found");
    }
  });

  pool.query(queries.deleteStudent, [id], (error, results) => {
    if (error) throw error;
    res.status(200).send("Student deleted successfully");
  });
};

const updateStudent = (req, res) => {
  const { name, email, age, dob } = req.body;

  pool.query(
    queries.getStudentsById,
    [parseInt(req.params.id)],
    (error, results) => {
      if (!results.rows.length) {
        res.send("Student not found");
      }
    }
  );

  pool.query(
    queries.updateStudent,
    [name, email, age, dob, parseInt(req.params.id)],
    (error, results) => {
      if (error) throw error;
      res.status(200).send("Student updated successfully");
    }
  );
};

module.exports = {
  getStudents,
  getStudentsById,
  addStudent,
  deleteStudent,
  updateStudent,
};
