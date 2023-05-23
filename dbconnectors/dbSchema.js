const mongoose = require('mongoose');
const Schema= mongoose.Schema;




const userSchema = new mongoose.Schema({
    //"_id" : Schema.Types.ObjectId,
    "username": { "type": "string" },
    "email": { "type": "string" },
    "password": { "type": "string" },
    "media_id": { "type": "string" },
    "name_ar": { "type": "string" },
    "name_en": { "type": "string" },
    "created": { "type": Date },
    "modified": { "type":Date },
    "otp": { "type": "string" },
    "otp_sent": { "type": "boolean" },
    "otp_expires": { "type": Date },
    "is_otp_consumed": { "type": "boolean" },
    "otp_verified_at": { "type": Date },
    "is_active": { "type": "boolean" },
}
,{collation:"users"}
);
const User_model = mongoose.model("user",userSchema);


module.exports = { 
    User_model
}
