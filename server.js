const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const bodyParser = require("body-parser");
const postsRoute = require("./routes/posts");

const app = express();
app.use(bodyParser.json());
app.use("/posts", postsRoute);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  err => {
    if (err) {
      console.log(err);
    }
    console.log("connected");
  }
);

app.listen(process.env.PORT, () =>
  console.log(`Server started on port ${process.env.PORT}`)
);
