let express = require('express');
let router = express.Router();

let mysql = require('mysql'),
    bcrypt = require('bcrypt'),
    mysqlDB = require('../models/MysqlDB.js');

// const connection = mysql.createConnection({
//     host:     'localhost',
//     user:     'root',
//     password: 'root',
//     database: 'photo_blog',
//     port: 8889
// });

const connectionInfo = {
    host:     'localhost',
    user:     'root',
    password: 'root',
    database: 'photo_blog',
    port: 8889
};

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

    // Logic to get password_hash from database
    // const connection = mysql.createConnection(connectionInfo);
    // connection.connect();
    // connection.query(`SELECT id, first_name, last_name, email, password_hash FROM users WHERE email = '${userData.email}';`, (error, results, fields) => {
    //     if (error){
    //         console.log(error);
    //         throw error;
    //     } else {
    //         // No errors found from executing query, find the password_hash for the user and assign that value to userData object
    //         if (results[0].password_hash !== undefined){
    //             userData.password_hash = results[0].password_hash;
                
    //             // Use bcrypt library to compare the entered password to the users password_hash
    //             bcrypt.compare(userData.password, userData.password_hash).then( (response) => {

    //                 // Redirect the user to the admin backend
    //                 if (response === true){
    //                     res.redirect('admin/dashboard');
    //                 }
    //             }).catch( (error) => {
    //                 console.log(error);

    //                 res.redirect('login');
    //             });
    //         }
    //     }
    // });
    // connection.end();

    const selectUserInfoQuery = `SELECT id, first_name, last_name, email, password_hash FROM users WHERE email = '${userData.email}';`;

    mysqlDB.initializeConnection(connectionInfo);

    mysqlDB.executeQuery(selectUserInfoQuery).then( (results) => {
        if (results[0].password_hash !== undefined){
            userData.password_hash = results[0].password_hash;

            bcrypt.compare(userData.password, userData.password_hash).then( (response) => {
                // Redirect the user to the admin backend
                if (response === true){
                    res.redirect('admin/dashboard');
                }
            }).catch( (error) => {
                res.redirect('login');
            });
        }
    }).then( (results) => {
        mysqlDB.closeConnection()
    }).catch( (error) => {
        console.log(error);
    });
});

router.get('/admin/dashboard', (req, res) => {
    res.render('admin/dashboard');
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

    // Get the current date
    const currentTime = new Date();

    // Extract the month and correct the value since months from the Date object start at 0
    let currentMonth = currentTime.getMonth() + 1;
    if (currentMonth < 10){
        currentMonth = '0' + currentMonth;
    }
    // Final value of the current date in MySQL Format
    const currentDate = `${currentTime.getFullYear()}-${currentMonth}-${currentTime.getDate()}`;

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

router.get('/admin/images', (req, res) => {
    const connection = mysql.createConnection(connectionInfo);
    connection.connect();

    const sqlQuery = `SELECT id, title FROM albums;`;

    connection.query(sqlQuery, (error, results, fields) => {
        if (error){
            throw error;
        } else {
            const allAlbums = results;

            res.render('admin/images', {
                allAlbums: allAlbums
            });
        }
    });

    // res.render('admin/images');
});

module.exports = router;