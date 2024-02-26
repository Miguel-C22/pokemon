const User = require('../schema/auth')
const bcrypt = require('bcryptjs')

const register = async (req, res) => {
  const { email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const tempUser = { email, password: hashedPassword };

    try {
      let sameEmail = await User.findOne({ 'email': email });

      if (sameEmail) {
        return res.status(400).json({ msg: "This email id is already in use" });
      }

      const user = await User.create({ ...tempUser });
      res.status(200).json({ user, message: 'Registration successful' });
    } catch (dbError) {
      console.error('Error during user creation:', dbError.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }

};




  const login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Check if the user with the provided email exists
      const user = await User.findOne({ 'email': email });
      if (!user) {
        return res.status(401).json({ msg: "Invalid email or password" });
      }
  
      // Compare the provided password with the stored hashed password
      const isPasswordMatch = await bcrypt.compare(password, user.password);
  
      if (!isPasswordMatch) {
        return res.status(401).json({ msg: "Invalid email or password" });
      }
  
      res.status(200).json({ user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }; 

  const getSingleUser = async (req, res) => {
    try {
      const { userId } = req.params;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json({ user });
    } catch (error) {
      console.error('Error getting user:', error);
      res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
  }

  const updatePassword = async (req, res) => {
    try {
      const { userId } = req.params; // Extract userId from URL params
      const { newPassword } = req.body;
  
      if (!newPassword) {
        return res.status(400).json({ error: 'New password is required' });
      }
  
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      const user = await User.findByIdAndUpdate(userId, { password: hashedPassword }, { new: true });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.status(200).json({ user });
    } catch (error) {
      console.error('Error updating user password:', error);
      res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
  };

module.exports = {
    register,
    login,
    getSingleUser,
    updatePassword
}
 