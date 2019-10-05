const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    selproductname: {
    type: String,
    required: true
  },
    selproductdesc: {
    type: String,
    required: true
  },
  creator: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
    commentids: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment',
            index: true,
        }
    ]

});

module.exports = mongoose.model('Product', productSchema);
