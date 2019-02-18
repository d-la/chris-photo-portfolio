let express = require('express'),
    bodyParser = require('body-parser')
    path = require('path'),
    expressSanitizer = require('express-sanitizer'),
    session = require('express-session'),
    mysql = require('mysql')
    bcrypt = require('bcrypt');

let frontEndRoutes = require('./routes/front-end'),
    backEndRoutes = require('./routes/back-end');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());

// Application routes
app.use(frontEndRoutes);
app.use(backEndRoutes);


app.listen(4200, 'localhost', () => {
    console.log('Server is running!');
});
