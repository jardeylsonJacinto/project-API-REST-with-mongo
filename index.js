const express = require('express');
const mongoose = require('mongoose');
const app = express();

require('dotenv').config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@db.xygwh5u.mongodb.net/?retryWrites=true&w=majority`)
.then(
  console.log("backend conectado!"),
  app.listen(3000)
)
.catch((e) => console.log(e))

const personRoutes = require('./routes/personRoutes');
app.use('/person', personRoutes)