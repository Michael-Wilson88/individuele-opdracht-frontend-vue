const express = require('express');
const bodyParser = require("body-parser");

const bandRoutes = require('./routes/bands')

const path = require('path')

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/v1', bandRoutes);

app.use('/home', (req, res) => {
    res.sendFile(path.join(__dirname, '../src', 'main.ts'))
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'index.html'));
});

app.listen(3003);