const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const db = require('./config/db');

const app = express();
app.use(cors());
app.use(bodyParser.json());

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL');
});

app.use('/', authRoutes);

app.listen(3000, () => {
    console.log('Server running on <http://localhost:3000>');
});
