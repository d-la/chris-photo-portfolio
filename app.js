let express = require('express'),
bodyParser = require('body-parser')
path = require('path'),
expressSanitizer = require('express-sanitizer');

const app = express();
const http = require('http');

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());

let mysql = require('mysql');

const connection = mysql.createConnection({
    host:     'localhost',
    user:     'root',
    password: 'root',
    database: 'photo_blog'
});


/**
 * Front end routes
 */

// Root (index) page
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/login', (req, res) => {
    res.render('login');
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

app.get('/gallery/:id', (req, res) => {
    const galleryImageId = req.params.id;

    // TODO: Implement logic to fetch data for the gallery image and it's album, if any,
    // and return it to the page. This way we can display the gallery image and any other 
    // images within the album

    const galleryData = {
        galleryImageId: galleryImageId,
        galleryImageSrc: '/img/img4.jpg',
        albumId: -1,
        associatedGalleryImages: [2, 3, 4, 5, 6]
    };

    res.render('view', {galleryData: galleryData});
});

/**
 * Back end routes
 */

app.get('/admin/dashboard', (req, res) => {
    res.render('admin/dashboard');
});

app.get('/admin/albums', (req, res) => {
    res.render('admin/albums');
});

app.get('/admin/images', (req, res) => {
    res.render('admin/images');
});

app.listen(4200, 'localhost', () => {
    console.log('Server is running!');
});
