import User from '../models/user.model.js';
export const login = async (req, res, next) => {
    const { username, password } = req.body;
  try {
    if(!username || !password){
        return res.status(400).json({message : 'please fill all the fields'})
    }
    const validUser = await User.findOne({ f_userName : username});
    console.log(validUser);
    if (!validUser){
        return res.status(400).json({message : 'User not found'})
    }
    if(password === validUser.f_Pwd){
        return res.status(200).json({username})
    }
    res.status(400).json({message : 'wrong details'})
  } catch (error) {
    console.log(error.message);
    res.status(500).json({message : 'error occured'});
  }
}