const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/user.js");

const bcrypt = require("bcryptjs");
require("dotenv").config();

// Signup route
router.post("/signup", async (req, res) => {
  try {
    //step-1
    //we got the name, emai, passwords, and mobile information from the body( as we are sending thses informations under body)
    const { name, email, mobile, password } = req.body;
    console.log(name, email, mobile, password);

    //step-2
    //checking if user has provided all the required fields or not
    if (!name || !email || !mobile || !password) {
      res.status(400).json({ error: "All fields are required" });
    }

    //step-3
    // Checking  if email is already registered
    const existingUser = await User.findOne({ email });
    console.log("EXISTING USER----------------------\n", existingUser);
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    //step-4
    // Hash the password when password is sent to database
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    //step-5
    // Creating a new user in the database
    const newUser = new User({ name, email, mobile, password: hashedPassword });
    await newUser.save(); // Save the new user to the database

    //step-6
    // Generate JWT token after successful registration

    // NOTE:

    // Think of the JWT token as a small package that contains information. This package has different sections, and one section is called the "payload." It's like a box inside the package where we can put things.

    // Now, why do we put things in this payload box?

    // Identification: Inside this box, we usually put something unique to identify the person using the token, like an ID number. It's like writing the person's name on the box so that others know who it belongs to.

    // Extra Info: Sometimes, we also put extra useful things in this box, like the person's role or job title. It's like adding more info to the box for special purposes.

    // For the recruiter's name:

    // Imagine if knowing the recruiter's name helps with certain tasks in your app. We put it in this box so that whenever someone uses this token,
    // they have the recruiter's name handy without needing to ask or check elsewhere. It's like having all needed details in one place.

    const payload = { userId: newUser._id }; // Include only necessary data in the JWT payload
    const jwttoken = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "2h",
    });

    //step-7

    // NOTE:After successful registration, it generates a JWT token using jwt.sign() containing the user's ID (newUser._id ).
    // Finally, it sends the token back in the response along with a success message ('User registered successfully').
    // The client receiving this response can then store the token (usually in local storage or a cookie) and use it for subsequent authenticated requests to your server,
    // effectively allowing the user to be automatically logged in after registration.

    //sending success message and token to client after registration
    //am sending jwt token and recruiter's name form server(backend) to client(frontend) so that client couldsave it in local storage
    res.status(201).json({ message: "User created successfully", jwttoken });
  } catch (error) {
    console.error("Error during signup:", error);

    res.status(500).json({ message: "signup route error" });
  }
});

//_________________________________________________________________________________________________________________________//

// Login route
router.post("/login", async (req, res) => {
  try {
    //step-1
    // we got the email and password from body
    console.log(req.body);
    const { email, password } = req.body;

    //step-2
    //if there is no email or password present throw error
    if (!email || !password) {
      return res
        .status(400)
        .json({
          error:
            "email or password is not present! both the fields are required",
        });
    }

    const user = await User.findOne({ email: email });

  
    if (user) {
      const passwordMatch = bcrypt.compareSync(password, user.password);
      if (passwordMatch) {
        const jwttoken = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
          expiresIn: "2h",
        });

        res.cookie(jwttoken);

        res.status(200).json({
          status: "success",
          message: "you have logged in succesfully",
          jwttoken,
          recruiterName: user.name, // Include recruiter's name in the response
          email: user.email,
        });
      
      }else{
        res.status(404).send({
          message : "your password is correct"
        })
      }
    }else{
      res.status(404).send({message : "user not found"});
    }

  } catch (error) {
    console.log(error);
    res.json({
      status: "failed",
      message: "incorrect credentials",
    });
  }
});

module.exports = router;

// export default router
