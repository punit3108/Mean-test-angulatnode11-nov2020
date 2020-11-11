var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ObjectId = Schema.Types.ObjectId;
var requiredMessage = '{PATH} is required.';

var user = new Schema({   
    FirstName:{ type: String, default: null },   
    LastName:{ type: String, default: null },  
    Email_id: { type: String, default: null },  
    ContactNumber: { type: Number, default: null },  
    is_deleted: { type: Boolean, default: false },   
  
}, { collection: 'user' });


var userMasterModel = mongoose.model('user', user);
module.exports = userMasterModel;