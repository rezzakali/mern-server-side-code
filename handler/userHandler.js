const express = require('express');
const User = require('../schemas/userSchema');
const bcrypt = require('bcrypt');
const authorization = require('../middleware/authentication');
const Message = require('../schemas/messageSchema');

const router = express.Router();

// Register router
router.post('/register', async (req, res) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const password = req.body.password;

    const newUser = new User({
      name: name,
      email: email,
      phone: phone,
      password: password,
    });
    await newUser.save();
    res.status(200).send('User created successfully!');
  } catch (error) {
    res.status(500).send('There was a server side error!');
  }
});

// Login router
router.post('/login', async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findOne({ email: email });
    if (user) {
      const isMatchPassword = await bcrypt.compare(password, user.password);
      if (isMatchPassword) {
        const token = await user.generateToken();
        res.cookie('jwt', token, {
          expires: new Date(Date.now() + 86400000),
          httpOnly: false, //accessible only by web server
          secure: true, // https
          sameSite: 'None', //cross-site cookie
        });

        res.status(200).send('Logged in successfully!');
      } else {
        res.status(400).send('Invalid user details');
      }
    } else {
      res.status(401).send('Unauthorized user!');
    }
  } catch (error) {
    res.status(500).send('There was a server side error!');
  }
});

// Logout router
router.get('/logout', async (req, res) => {
  try {
    res.clearCookie('jwt', { httpOnly: false, sameSite: 'None', secure: true });
    res.status(200).send('Cleared cookie');
  } catch (error) {
    res.status(500).send('There was a server side error!');
  }
});

router.get('/auth', authorization, (req, res) => {
  res.status(200).send('Success');
});

// message router
router.post('/message', async (req, res) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const message = req.body.message;
    const newMessage = new Message({
      name: name,
      email: email,
      message: message,
    });
    await newMessage.save();
    res.status(200).send('Success');
  } catch (error) {
    res.status(500).send('There was a server side error!');
  }
});

module.exports = router;
