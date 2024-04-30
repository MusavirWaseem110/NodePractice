const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const corsOptions = require("./MiddlewareSettings/CorsSettings");

const studentRoutes = require("./src/student/routes");
const app = express();

const port = 3000;

// Middlewares
app.use(express.json());
app.use(morgan("common"));
app.use(helmet());
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

app.use("/api/v1/students", studentRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
