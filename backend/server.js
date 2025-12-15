const express = require('express')
const app = express()
const port = 3000
require('dotenv').config();
const cors = require('cors');
const db = require('./db');
const bodyParser = require('body-parser');
const userRouter = require('./routers/userRouter');
const candidateRouter = require('./routers/candidateRouter');

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(bodyParser.json());
app.use("/user", userRouter);
app.use("/candidate", candidateRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
