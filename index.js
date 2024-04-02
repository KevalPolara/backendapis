const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));
const cors = require("cors");
app.use(express.json());

app.use(cors());

const indexRouter = require("./routes/campain");

app.use("/v1", indexRouter);

app.get("/helloworld", (req, res) => {
  res.status(201).json({ message: "api Create Succesfully" });
});

app.listen(3000, () => {
  console.log("Server Started at Port Number 3000");
});
