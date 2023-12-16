const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Importing the User model

// Signup route
router.post('/signup', async (req, res) => {
  try {
    const { fullname, email, password, age, gender, mobile } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password when password is sent to database
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    // Create a new user document in the database
    const newUser = new User({
      fullname,
      email,
      password: hashedPassword,
      age,
      gender,
      mobile,
    });

    await newUser.save(); // Save the new user to the database
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error during signup:', error);

    res.status(500).json({ message: 'signup route error' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (user) {

      //bcrypt the password is retrieved from the database
      const passwordMatch = await bcrypt.compare(password, user.password);
          if(passwordMatch)
          {

            //here jwt token is generate when user logs in so that is could contain the information related to user-> IT NEED THREE PARAMETERS ie, user, secret_key, exprire time
            const jwttoken = jwt.sign(user.toJSON(), process.env.JWT_SECRET, {expiresIn:'2h'});
            res.json({
              status: "success",
              message:"you have logged in succesfully",
              jwttoken
            })

          }

          else
          {
            res.json({
              status:"failed", 
              message:"incorrect credentials"
            })
          }
      
    }

    else
    {
      res.json({
        status:"faild", 
        message:"incorrect credentials"
      })
    }

  }
catch(error)
{
  console.log(error)
  res.json({
    status :"failed", 
    message:"incorrect credentials"
  })
}
})


module.exports = router;
