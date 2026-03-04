import User from '../models/User.js';

export const register = async (req, res) => {
  try {
    const { email, password } = req.body;


    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).json({ 
        message: 'chale the user laready exists'
     });
    }

   // this is to create a new user in the database if user does not exist 
    const user = await User.create({
      email,
      password,
    });

 
    if (user) {
      res.status(201).json({
        _id: user._id,
        email: user.email,
      });
    }
  } catch (error) {
    res.status(500).json({
         message: 'Server error during registration'
        
        });
  }
};


export const login = async (req, res) => {
    try {
      const{email, password} = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

            
        }
        catch (error) {
            res.status(500).json({ message: 'Server error during login' });
        }
    };