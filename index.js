const express = require('express');
require('dotenv').config();
require('./db/dbConnection');
const userHandler = require('./handler/userHandler');
const cors = require('cors');
const port = process.env.PORT || 5000;
const cookieParser = require('cookie-parser');
const hostname = process.env.HOST_NAME;

const app = express();
app.use(cookieParser());
app.use(express.json());

const corsOptions = {
  origin: 'https://mstackfull.herokuapp.com', //included origin as true
  credentials: true, //included credentials as true
};

app.use(cors(corsOptions));
// app.use(
//   cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST'],
//     credentials: true,
//   })
// );

app.use(express.urlencoded({ extended: false }));

app.use('/user', userHandler);

app.get('/', (req, res) => {
  res.json({ result: 'Success' });
});

// error handler
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next();
  }
  res.status(500).json({ error: 'There was a server side error!' });
});

// listening server

app.listen(port, hostname, () => {
  console.log(
    `Your server is running successfully at http://${hostname}:${port}`
  );
});
