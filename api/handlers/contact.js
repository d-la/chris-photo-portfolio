const mysql = require('mysql');
const mysqlDB = require('../models/MysqlDB');

const connectionInfo = {
    host:     process.env.DB_HOST,
    user:     process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
}

exports.insertContact = async function(req, res, next){
    try {
        // Connect to the database
        mysqlDB.initializeConnection(connectionInfo);
        // Select all sub categories and photos in a category
        const insertContactSubmission = `INSERT INTO 
                                            contact_submission 
                                            (contact_submission_first_name, contact_submission_last_name, contact_submission_email, contact_submission_phone_number, contact_submission_message, date_contacted)
                                            VALUES
                                            (${mysql.escape(req.body.firstName)}, ${mysql.escape(req.body.lastName)}, '${req.body.email}', '${req.body.phoneNumber}', ${mysql.escape(req.body.message)}, NOW());`;
        
        let categoryData = await mysqlDB.executeQuery(insertContactSubmission);
        // Return that data via JSON
        res.status(200).json(categoryData);

        await mysqlDB.closeConnection();
    } catch (error) {
        return next({
            status: 400,
            message: 'Unable to connect to server'
        });
    }
}