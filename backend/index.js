import express from 'express';
import connectDB from './connectDB.js';
import Item from './db.js';
import cors from 'cors'                              // cors to link backend to frontend on same url (localhost:3000)          
import argon2 from 'argon2'                          // argon2 used for hashing and to verify/comparing                        
import userZodSchema from './zod.js'

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
// Middleware to parse JSON
app.use(express.json());
// Connect to the database
connectDB();

app.get('/api/items', async (req, res) => {
  try {
    const items = await Item.find();
    // const object = items.map((value, index, array) => (value.username))
    res.json({ items });                              // res.json({items})  data.map is not a function break it with response.data.items(in-frontend) to break {object/items-inside} which ia an array
  } catch (err) {
    res.status(500).send(err);
  }
});

// Register endpoint to hash password and save a new user
app.post('/api/signup', async (req, res) => {
  try {
    const { email, password, username } = userZodSchema.parse(req.body);
    console.log('Raw password:', password);                                           // Log to verify raw password
    const hashedPassword = await argon2.hash(password);                               // it is used for hashing  
    console.log('Hashed password:', hashedPassword);                                  // Log to verify hashed password


    const user1 = await Item.findOne({ email });
    if (user1) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    else {
      const newUser = new Item({ username, email, password: hashedPassword });
      await newUser.save();
      res.status(201).json({ message: 'User registered successfully' });
    }
  } catch (err) {
    console.error('Signup error:', err);                                              // Log the error
    res.status(500).send(err);
  }
});


// Signin endpoint to verify password
app.post('/api/signin', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Item.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    if (await argon2.verify(user.password, password)) {
      res.json({ message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Error during signin:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// default way of req.body
// app.post('/api/Signup', async (req, res) => {
//   const newItem = new Item(req.body);

//   try {
//     const savedItem = await newItem.save();
//     res.status(201).json(savedItem);
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });


// simple password check/comparision not hashing way
//   if (user && bcrypt.compareSync(password, user.password)) {
//     res.json({ message: 'Login successful' });
//   } else {
//     res.status(401).json({ message: 'Invalid email or password' });
//   }
// });


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
