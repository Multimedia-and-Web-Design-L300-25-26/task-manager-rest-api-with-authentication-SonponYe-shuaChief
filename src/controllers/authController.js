import User from '../models/User.js';
import jwt from 'jsonwebtoken';




export const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const user = await User.create({ email, password });

    res.status(201).json({
      _id: user._id,
      email: user.email,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

 
    const user = await User.findOne({ email });

   
    if (user && (await user.matchPassword(password))) {

         const token = jwt.sign(
        { id: user._id },          
        process.env.JWT_SECRET,    
        { expiresIn: '30d' }       
        );

        res.status(200).json({
        _id: user._id,
        email: user.email,
        token: token               
});
      
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error during login' });
  }


 
};