const express = require('express');
const path = require('path');
const logger = require('morgan');
require('dotenv').config();
require('./config/database');
const cors = require('cors');
const AWS = require('aws-sdk');
const app = express();
// const stargazingRouter = require('./routes/api/stargazing');

app.use(logger('dev'));

// Enable CORS for specific domains
app.use(cors());

app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));


app.use(require('./config/checkToken'));
const port = process.env.PORT || 3001;



app.use('/api/users', require('./routes/api/users'));


app.use('/api/stargazings', require('./routes/api/stargazings'));


//Catch All
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

//Listener
app.listen(port, function() {
    console.log(`Express app running on port ${port}`)
});