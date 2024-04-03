const express = require("express");
const app = express();
const indexRouter = require("./routes/index");
const cors = require("cors");


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

app.use("/v1", indexRouter);

app.get("/helloworld", (req, res) => {
  res.status(201).json({ message: "api Create Succesfully" });
});

app.listen(3000, () => {
  console.log("Server Started at Port Number 3000");
});
