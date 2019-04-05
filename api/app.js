require('dotenv').config();

let express = require('express'),
    bodyParser = require('body-parser'),
    mysql = require('mysql'),
    categoryRoutes = require('./routes/category'),
    subcategoryRoutes = require('./routes/subcategory');
    photoRoutes = require('./routes/photo');

const errorHandler = require('./handlers/error');

const app = express();

app.use(bodyParser.json());

app.use('/api/category', categoryRoutes);
app.use('/api/subcategory', subcategoryRoutes);
app.use('/api/photo', photoRoutes);

app.use( (req, res, next) => {
    let error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use(errorHandler);

let port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}!`);
});