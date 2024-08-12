const express = require('express');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cors = require('cors');

const port = 8000;

const app = express();
app.use(express.json({limit: '10mb'}));
app.use(cors());

dotenv.config();

app.post('/api/getJWT', (req, res) => {
  console.log('gwtJWT', req.body, req.user);
  const token = jwt.sign({
      ...req.body,
      id: process.env.TRANSITIVE_USER, // Transitive portal user id
      userId: req.user,  // user name on dashboard
      validity: 86400,   // number of seconds
    }, process.env.JWT_SECRET);
  res.json({token});
});

app.listen(port, '0.0.0.0', () =>
  console.log(`Server is listening. Open: http://localhost:${port}`));