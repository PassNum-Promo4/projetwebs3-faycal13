const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Post_eventSchema = new Schema({
  category: { type: Schema.Types.ObjectId, ref: 'Category'},
  owner: { type: Schema.Types.ObjectId, ref: 'User'},
  title: String,
  description: String,
  created: { type: Date, default: Date.now}
});

module.exports = mongoose.model('Post_event', Post_eventSchema);
