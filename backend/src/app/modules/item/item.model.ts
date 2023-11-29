const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  created_at: {
    type: String,
    default: new Date(),
  },
  created_by: {
    type: String,
  },
});

export const Item = mongoose.model('Item', itemSchema);
