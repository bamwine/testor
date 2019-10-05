const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentSchema = new Schema({
    selcommentmessage: {
    type: String,
    required: true
  },
    selcommenttime: {
    type: String,
    required: true
  },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    productids: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }
});

module.exports = mongoose.model('Comment', commentSchema);
