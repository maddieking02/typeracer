const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/fetch');

const schema = mongoose.Schema({
  word: {type: String, unique: true},
  definition: String
})

const Terms = mongoose.model('Terms', schema);
