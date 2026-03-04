import mongoose from "mongoose";


// Create User schema
// Fields:
// - name (String, required)
// - email (String, required, unique)
// - password (String, required, minlength 6)
// - createdAt (default Date.now)
import bcrypt from 'bcryptjs';

// 1. Define the Schema
const userSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  }
});



userSchema.pre('save', async function(next) {
  
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }



  }



);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// 3. Export the Model
export default mongoose.model('User', userSchema);
