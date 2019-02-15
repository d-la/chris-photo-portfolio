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
            src: '/img/img4.jpg',
            title: 'Mountain in Ireland',
            desc: 'Sunset hitting the mountains in Ireland',
            dateTaken: ''
        },
        {
            id: 2,
            src: '/img/img2.jpg',
            title: 'The Galaxy in Iceland',
            desc: 'At dusk, the milky way and stars of the universe',
            dateTaken: ''
        },
        {
            id: 3,
            src: '/img/img3.jpg',
            title: 'Frozen lake in Iceland',
            desc: 'Taken at lake Something in Iceland',
            dateTaken: ''
        },
        {
            id: 4,
            src: '/img/img4.jpg',
            title: 'Mountain in Ireland',
            desc: 'Sunset hitting the mountains in Ireland',
            dateTaken: ''
        },
        {
            id: 5,
            src: '/img/img2.jpg',
            title: 'The Galaxy in Iceland',
            desc: 'At dusk, the milky way and stars of the universe',
            dateTaken: ''
        },
        {
            id: 6,
            src: '/img/img3.jpg',
            title: 'Frozen lake in Iceland',
            desc: 'Taken at lake Something in Iceland',
            dateTaken: ''
        }
    ];

    res.render('gallery', {galleryImages: galleryImages});
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.listen(4200, 'localhost', () => {
    console.log('Server is running!');
});
