let express = require('express');
let router = express.Router();

let mysql = require('mysql'),
    mysqlDB = require('../models/MysqlDB.js');

// const connectionInfo = {
//     host:     'localhost',
//     user:     'root',
//     password: 'root',
//     database: 'photo_blog',
//     port: 8889
// };

const connectionInfo = {
    host:     'den1.mysql1.gear.host',
    user:     'chrisphotoblog',
    password: 'Ff7J0?XJj45~',
    database: 'chrisphotoblog',
    port: 3306
}

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

router.get('/gallery/image/:id', (req, res) => {
    const galleryImageId = req.params.id;
    const selectAlbumImages = `SELECT i.id AS image_id, i.src, i.title AS image_title, i.description AS image_description, i.album_id, i.date_added AS image_date_added, a.id AS album_id, a.title AS album_title, a.location AS album_location FROM images i LEFT JOIN albums a ON i.album_id = a.id ORDER BY image_id = ${galleryImageId} DESC;`;
    
    // Placeholder for returned data
    let allImageData;

    mysqlDB.initializeConnection(connectionInfo);
    mysqlDB.executeQuery(selectAlbumImages).then( (results) => {
        allImageData = results;

        return mysqlDB.closeConnection();
    }).then( (results) => {
        res.render('view', {
            allImageData: allImageData
        });
    }).catch( (error) => {
        console.log(error);
    });
});

module.exports = router;