const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const companySchema = new Schema({
    selbusinessname: {
        type: String,
        required: true
    },
    busineslogo: {
        type: String,
        required: true
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }



});

module.exports = mongoose.model('Company', companySchema);