let express = require('express'),
bodyParser = require('body-parser')
path = require('path');

const app = express();
const http = require('http');

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

let mysql = require('mysql');

const connection = mysql.createConnection({
    host:     'localhost',
    user:     'root',
    password: 'root',
    database: 'photo_blog'
});


// Root (index) page
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/gallery', (req, res) => {
    // Should be fetched frm mysql database later
    const galleryImages = [
        {
            id: 1,
            src: '/img/img1.jpg',
            title: '',
            desc: '',
            dateTaken: ''
        },
        {
            id: 2,
            src: '/img/img2.jpg',
            title: '',
            desc: '',
            dateTaken: ''
        },
        {
            id: 3,
            src: '/img/img3.jpg',
            title: '',
            desc: '',
            dateTaken: ''
        }
    ];

    res.render('gallery', {galleryImages: galleryImages});
});

app.listen(4200, 'localhost', () => {
    console.log('Server is running!');
});
