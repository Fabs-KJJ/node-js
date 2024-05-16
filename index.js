const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const routes = require('./routes/api');
const route = require('./routes/Userroute');

require('dotenv').config();
require('./helpers/init_mongodb');

const app = express();

app.use(cors({
  origin: "http://localhost:3000",
}));

app.use(express.json());
app.use(routes);
app.use(route);

// Connect to MongoDB
// mongoose.connect('mongodb://localhost/studentAPI', { useNewUrlParser: true, useUnifiedTopology: true });
// mongoose.Promise = global.Promise;

app.use(bodyParser.json());

// Handling 404 error
app.use((req, res, next) => {
  const err = new Error("Not found");
  err.status = 404;
  next(err);
});

// Error Handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).send({
    error: {
      status: err.status || 500,
      message: err.message
    }
  });
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is now listening for requests on: http://localhost:${port}`);
});
