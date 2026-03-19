// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   password: String
// });

// module.exports = mongoose.model("User", userSchema);




import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
name: { 
    type: String, 
    required: true 
},
email: { 
    type: String, 
    required: true, 
    unique: true 
},
password: { 
    type: String, 
    required: true 
},
  mobile: { 
    type: String, 
    required: true 
},
  address: { 
    type: String 
},
  
});

const User = mongoose.model("users", UserSchema);

export default User
