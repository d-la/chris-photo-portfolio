require('dotenv').config();

let express = require('express'),
    bodyParser = require('body-parser'),
    mysql = require('mysql'),
    categoryRoutes = require('./routes/category'),
    subcategoryRoutes = require('./routes/subcategory');
    photoRoutes = require('./routes/photo'),
    contactRoutes = require('./routes/contact'),
    cors = require('cors'),
    path = require('path');

const errorHandler = require('./handlers/error');

const app = express();

app.use(bodyParser.json());

app.use('/api/category', cors(), categoryRoutes);
app.use('/api/subcategory', cors(), subcategoryRoutes);
app.use('/api/photo', cors(), photoRoutes);
app.use('/api/contact', cors(), contactRoutes);

// Serve static files from react app
app.use(express.static(path.join(__dirname, 'client/build')));

app.use( (req, res, next) => {
    let error = new Error('Not Found');
    error.status = 404;
    next(error);
});

// Catch all for requests
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.use(errorHandler);

let port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}!`);
});