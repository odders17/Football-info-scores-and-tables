const express = require('express');
const connectDB = require('./config/db');

const app = express();

// connect to the DB
connectDB();

// init Middleware
app.use(express.json());

app.get('/', (req, res) => res.send('API running'));

// Define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/leagues', require('./routes/api/leagues'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));