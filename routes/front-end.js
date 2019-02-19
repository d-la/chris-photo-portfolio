let express = require('express');
let router = express.Router();

let mysql = require('mysql'),
    mysqlDB = require('../models/MysqlDB.js');

const connectionInfo = {
    host:     'localhost',
    user:     'root',
    password: 'root',
    database: 'photo_blog',
    port: 8889
};

// Root (index) page
router.get('/', (req, res) => {
    res.render('index');
});

router.get('/gallery', (req, res) => {
    const selectAllAlbums = `SELECT id, title FROM albums;`;
    const selectAllImages = `SELECT i.id AS image_id, i.src, i.title AS image_title, i.description AS image_description, i.album_id, i.date_added AS image_date_added, a.id, a.title AS image_album, a.location AS album_location FROM images i LEFT JOIN albums a ON i.album_id = a.id;`;

    let albums, images;
    mysqlDB.initializeConnection(connectionInfo);
    mysqlDB.executeQuery(selectAllAlbums).then( (results) => {
        albums = results;

        return mysqlDB.executeQuery(selectAllImages);
    }).then( (results) => {
        images = results;

        return mysqlDB.closeConnection();
    }).then( (results) => {

        res.render('gallery',{
            albums: albums,
            images: images
        })
    }).catch( (error) => {
        console.log(error);
    });
});

router.get('/contact', (req, res) => {
    res.render('contact');
});

router.get('/gallery/:id', (req, res) => {
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

module.exports = router;