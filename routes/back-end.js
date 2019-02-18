let express = require('express');
let router = express.Router();

let mysql = require('mysql'),
    bcrypt = require('bcrypt');

const connection = mysql.createConnection({
    host:     'localhost',
    user:     'root',
    password: 'root',
    database: 'photo_blog',
    port: 8889
});

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
    connection.connect();
    connection.query(`SELECT id, first_name, last_name, email, password_hash FROM users WHERE email = '${userData.email}';`, (error, results, fields) => {
        if (error){
            console.log(error);
            throw error;
        } else {
            // No errors found from executing query, find the password_hash for the user and assign that value to userData object
            if (results[0].password_hash !== undefined){
                userData.password_hash = results[0].password_hash;
                
                // Use bcrypt library to compare the entered password to the users password_hash
                bcrypt.compare(userData.password, userData.password_hash).then( (response) => {

                    // Redirect the user to the admin backend
                    if (response === true){
                        res.redirect('admin/dashboard');
                    }
                }).catch( (error) => {
                    console.log(error);

                    res.redirect('login');
                });
            }
        }
    });
    connection.end();
});

router.get('/admin/dashboard', (req, res) => {
    res.render('admin/dashboard');
});

router.get('/admin/albums', (req, res) => {
    res.render('admin/albums');
});

router.get('/admin/images', (req, res) => {
    res.render('admin/images');
});

module.exports = router;