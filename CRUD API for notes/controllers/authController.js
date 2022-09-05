// const {userValidation} = require('../config/modelValidation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

async function registerUser(req, res) {
  const { username, password } = req.body;
  const userExists = await User.findOne({ username });
  if (userExists) {
    return res.status(400).send('User is already exists!');
  }
  const hashedPass = await bcrypt.hash(password, 10);
  const user = new User({
    username,
    password: hashedPass,
  });

  try {
    await user.save();
    return res.status(200).json({ message: 'Success' });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

async function loginUser(req, res) {
  const foundUser = await User.findOne({ username: req.body.username });
  if (!foundUser) {
    return res.status(400).json({ message: 'User doesn`t exists!' });
  }

  const match = await bcrypt.compare(req.body.password, foundUser.password);
  if (!match) {
    return res.status(403).send('Access denied');
  }

  const token = jwt.sign(
    // eslint-disable-next-line no-underscore-dangle
    { _id: foundUser._id },
    process.env.ACCESS_TOKEN_SECRET,
  );
  return res.json({ message: 'success', jwt_token: token });
}

module.exports = {
  registerUser,
  loginUser,
};
