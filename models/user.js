const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createdCompany: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Company'
    }
  ],
    createdProduct: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        }
    ],

    commentids: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]


});

module.exports = mongoose.model('User', userSchema);
