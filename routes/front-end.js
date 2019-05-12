let express = require('express');
let router = express.Router();

let mysql = require('mysql'),
    mysqlDB = require('../models/MysqlDB.js');

const connectionInfo = {
    host:     process.env.DB_HOST,
    user:     process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
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

// Route for rendering the contact page
router.get('/contact', (req, res) => {
    res.render('contact');
});

// Route for handling contact form submissions
router.post('/contact', (req, res) => {
    const contactData = req.body;
    // Get MySQL formatted date time
    
    const currentDateTime = new Date().toJSON().slice(0, 19).replace('T', ' ');

    const insertContactSubmissionQuery = `INSERT INTO contact_submissions (first_name, last_name, email, phone_number, message, submission_date) VALUES (${mysql.escape(contactData.firstName)}, ${mysql.escape(contactData.lastName)}, '${contactData.email}', ${mysql.escape(contactData.phoneNumber)}, ${mysql.escape(contactData.message)}, '${currentDateTime}');`;
    
    mysqlDB.initializeConnection(connectionInfo);
    mysqlDB.executeQuery(insertContactSubmissionQuery).then( (results) => {
        return mysqlDB.closeConnection();
    }).then( (results) => {
        // Send a true response to ajax so we can display the correct message to the user
        res.send({response: true});
    }).catch( (error) => {
        // Send a false response to ajax so we can display the correct message to the user
        res.send({response: false});
    });
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