let express = require('express');
let router = express.Router();

let mysql = require('mysql'),
    bcrypt = require('bcrypt'),
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

// Show the login view
router.get('/login', (req, res) => {
    res.render('login');
});

// Handle the login page logic
router.post('/login', (req, res) => {

    // TODO: encapsulate this into  class?

    const userData = {
        email: req.body.email,
        password: req.body.password,
        password_hash: ''
    };

    const selectUserInfoQuery = `SELECT id, first_name, last_name, email, password_hash FROM users WHERE email = '${userData.email}';`;

    mysqlDB.initializeConnection(connectionInfo);

    mysqlDB.executeQuery(selectUserInfoQuery).then( (results) => {
        if (results[0].password_hash !== undefined){
            userData.password_hash = results[0].password_hash;
        }
    }).then( (results) => {
        mysqlDB.closeConnection();

        bcrypt.compare(userData.password, userData.password_hash).then( (response) => {
            // Redirect the user to the admin backend
            if (response === true){
                res.redirect('admin/dashboard');
            } else {
                res.redirect('admin/login', {
                    alertBanner: 'error'
                });
            }
        }).catch( (error) => {
            res.redirect('login');
        });
    }).catch( (error) => {
        console.log(error);
    });
});

router.get('/admin/dashboard', (req, res) => {

    mysqlDB.initializeConnection(connectionInfo);

    const selectContactSubmissions = `SELECT id, first_name, last_name, email, phone_number, message, submission_date FROM contact_submissions;`;
    const selectAlbums = `SELECT id, title, description, location, date_added FROM albums;`;
    const selectImages = `SELECT id, src, title, description, album_id FROM images`;

    let allContactSubmissions, allAlbums, allImages;

    mysqlDB.executeQuery(selectContactSubmissions).then( (result) => {
        allContactSubmissions = result;

        return mysqlDB.executeQuery(selectAlbums);
    }).then( (results) => {
        allAlbums = results;

        return mysqlDB.executeQuery(selectImages);
    }).then( (results) => {
        allImages = results;

        return mysqlDB.closeConnection();
    }).then( (results) => {
        // Render the view
        res.render('admin/dashboard', {
            allContactSubmissions: allContactSubmissions,
            allAlbums: allAlbums,
            allImages: allImages
        });
    }).catch( (error) => {
        console.log(error);
    });
});

router.get('/admin/albums', (req, res) => {
    const sqlQuery = `SELECT id, title, description, location, date_added FROM albums;`;
    
    let albums;
    mysqlDB.initializeConnection(connectionInfo);

    mysqlDB.executeQuery(sqlQuery).then( (results) => {
        albums = results;

        // Close the connection
        mysqlDB.closeConnection();

        // Render the page with necessary data
        res.render('admin/albums', {albums: albums});
    }).catch( (error) => {
        // TODO: Implement some logic to handle errors and display a message to the user
        console.log(error);
    });
});

router.post('/admin/albums', (req, res) => {
    // Collect the data from the form
    const album ={
        title: req.body.album.title,
        description: req.body.album.description,
        location: req.body.album.location
    };

    // Get todays date
    currentDate = require('./models/todays-date');

    // Prepare database connection and query
    mysqlDB.initializeConnection(connectionInfo);
    const sqlQuery = `INSERT INTO albums (title, description, location, date_added) VALUES (${mysql.escape(album.title)}, ${mysql.escape(album.description)}, ${mysql.escape(album.location)}, '${currentDate}');`;

    mysqlDB.executeQuery(sqlQuery).then( (results) => {

        if (results.affectedRows == 1){
            // Implement logic that will return a success banner to the front end
            console.log('It worked');
        } else {
            // Logic to return an error banner to front end
            console.log('It didnt work');
        }

        // Close the connection
        mysqlDB.closeConnection();

        // Bring the user back to the same page
        res.redirect('albums');
    }).catch( (error) => {
        // TODO: Implement some logic to handle errors and display a message to the user
        console.log(error);
    });
});

// Route to edit an album
router.get('/admin/albums/:id', (req, res) => {
    const albumId = req.params.id;

    // Variable to hold the data from the requested album and all images associated with the album
    let albumData, albumImages;

    // Prepare database connection and query
    mysqlDB.initializeConnection(connectionInfo);

    // This query just selects the album
    const selectAlbumData = `SELECT id, title, description, location FROM albums WHERE id = ${albumId};`;

    // This query selects all images within the album
    const selectImagesFromAlbum = `SELECT id, src, title, description, date_added FROM images WHERE album_id = ${albumId};`;

    mysqlDB.executeQuery(selectAlbumData).then( (results) => {
        // console.log(results);
        albumData = results;

        return mysqlDB.executeQuery(selectImagesFromAlbum);
    }).then( (results) => {
        albumImages = results;

    }).then( (results) => {
        mysqlDB.closeConnection();

        res.render('admin/editalbum', {
            albumData: albumData,
            albumImages: albumImages
        });
    }).catch( (error) => {
        console.log(error);
    });
});

router.get('/admin/images', (req, res) => {
    const selectAllAlbumsQuery = `SELECT id, title FROM albums;`;
    const selectAllImagesQuery = `SELECT i.id AS image_id, i.title AS image_title, i.description AS image_description, i.album_id, i.date_added AS image_date_added, a.id AS album_id, a.title AS image_album FROM images i LEFT JOIN albums a ON i.album_id = a.id;
    `;

    let allAlbums, allImages;

    mysqlDB.initializeConnection(connectionInfo);
    mysqlDB.executeQuery(selectAllAlbumsQuery).then( (results) => {
        allAlbums = results;

        return mysqlDB.executeQuery(selectAllImagesQuery);
    }).then( (results) => {
        allImages = results;

    }).then( (results) => {
        mysqlDB.closeConnection();

        res.render('admin/images', {
            allAlbums: allAlbums,
            allImages: allImages
        });
    }).catch( (error) => {
        console.log(error);
    });
});

router.get('/admin/images/:id', (req, res) => {

    const imageId = req.params.id;

    const selectImageDataQuery = `SELECT i.id AS image_id, i.src, i.title AS image_title, i.description AS image_desc, i.album_id, a.id AS album_id, a.title AS album_title FROM images i RIGHT JOIN albums a ON i.album_id = a.id WHERE i.id = ${imageId};`;
    const selectAllAlbums = `SELECT id, title FROM albums;`;
    let imageData, albumData;

    mysqlDB.initializeConnection(connectionInfo);
    mysqlDB.executeQuery(selectImageDataQuery).then( (results) => {
        imageData = results;

        return mysqlDB.executeQuery(selectAllAlbums);
    }).then( (results) => {
        albumData = results;

        return mysqlDB.closeConnection();
    }).then( (results) => {

        res.render('admin/editimage', {
            imageData: imageData,
            albumData: albumData
        });
    }).catch( (error) => {
        console.log(error);
    });


});

module.exports = router;