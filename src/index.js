const express = require('express');
const app = express();
const router = express.Router();
const cors = require('cors');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const dbMiddleware = require('./middleware/dbMiddleware');
const userRoutes = require('./routes/users');
const organizationRoutes = require('./routes/organizations');
const projectRoutes = require('./routes/projects');
const taskRoutes = require('./routes/tasks');


app.use(cors());
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true }));
app.use(dbMiddleware);

// user routes
app.use('/api/user', userRoutes);

// organization routes
app.use('/api/organization', organizationRoutes);

// project routes
app.use('/api/project', projectRoutes);

// task routes
app.use('/api/task', taskRoutes);

const port = process.env.PORT || 8000;

app.listen(port, function () {
    console.log(`Server is running on ${port}`);
});