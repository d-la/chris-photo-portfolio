let express = require('express'),
    bodyParser = require('body-parser')
    path = require('path'),
    expressSanitizer = require('express-sanitizer'),
    session = require('express-session'),
    mysql = require('mysql')
    bcrypt = require('bcrypt')
    fileUpload = require('express-fileupload'),
    fs = require('fs'),
    multer = require('multer');

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

// Handle the file upload in this file since it wont work inside back-end.js?
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/img');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});

const upload = multer({storage: storage});
app.post('/admin/images', upload.single('albumImage'), (req, res) => {

    // Todays date
    todaysDate = require('./models/todays-date');

    let uploadedFileName = req.file.filename;
    let fileDestination = `/img/${uploadedFileName}`;

    const imageData = {
        title: req.body.image.title,
        description: req.body.image.description,
        albumId: req.body.albumId
    };

    const insertImageDataQuery = `INSERT INTO images (src, title, description, album_id, date_added) VALUES ('${fileDestination}', ${mysql.escape(imageData.title)}, ${mysql.escape(imageData.description)}, ${imageData.albumId}, '${todaysDate}');`;
    
    mysqlDB = require('./models/MysqlDB.js');

    mysqlDB.initializeConnection({
        host:     'localhost',
        user:     'root',
        password: 'root',
        database: 'photo_blog',
        port: 8889
    });

    mysqlDB.executeQuery(insertImageDataQuery).then( (result) => {

        if (result === true){
            // Success logic
        } else {
            // Error logic
        }
        mysqlDB.closeConnection();

        res.redirect('/admin/images');
    }).catch( (error) => {
        console.log(error);
    });
});


app.listen(4200, 'localhost', () => {
    console.log('Server is running!');
});
