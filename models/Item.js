const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  order: {
    type: String,
    required: true,
  },
  serial: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Item = mongoose.model("item", ItemSchema);
module.exports = Item;
