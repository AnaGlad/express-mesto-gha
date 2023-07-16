const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const routes = require("./routes");

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect("mongodb://localhost:27017/mestodb", {
  // useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false,
});

app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.json());

app.use(routes);

app.listen(PORT, () => {
  console.log(`Application is running on port ${PORT}`);
});
