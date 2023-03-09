const mongoose = require('mongoose');
const person = mongoose.model('Person', {
  name: String,
  salary: Number,
  approved: Boolean,
})

module.exports = person;