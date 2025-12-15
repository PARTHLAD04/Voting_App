const express = require('express')
const app = express()
const port = 3000
require('dotenv').config();
const db = require('./db');
const bodyParser = require('body-parser');
const userRouter = require('./routers/userRouter');
const candidateRouter = require('./routers/candidateRouter');


app.use(bodyParser.json());
app.use("/user",userRouter);
app.use("/candidate",candidateRouter);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
