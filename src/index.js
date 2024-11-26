const express = require('express');
const app = express();
const router = express.Router();
const cors = require('cors');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const dbMiddleware = require('./middleware/dbMiddleware');
const userRoutes = require('./routes/users');


app.use(cors());
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true }));
app.use(dbMiddleware);

app.use('/api/user',userRoutes);



const port = process.env.PORT || 8000;

app.listen(port, function () {
    console.log(`Server is running on ${port}`);
});