var express = require('express');
var logger = require('morgan');
var cors = require('cors');
var controller = require('./controllers/controller');

var app = express();

app.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true,
    })
);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

controller(app);

var PORT = process.env.PORT || 8000;
app.listen(PORT);