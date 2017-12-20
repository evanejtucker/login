
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile('public/index.html')
});

app.listen(3000, () => {
    console.log('Example app listening on port 3000!')
});