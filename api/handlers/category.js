// Handles getting the data for certain routes in the api that use category
const mysql = require('mysql');
const mysqlDB = require('../models/MysqlDB');

const connectionInfo = {
    host:     process.env.DB_HOST,
    user:     process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
}

exports.allCategoryData = async function(req, res, next){
    try {
        // Connect to the database
        mysqlDB.initializeConnection(connectionInfo);
        // Select all sub categories and photos in a category
        const selectCategoryDataQuery = `SELECT category_id, category_title, category_desc FROM category;`;
        let categoryData = await mysqlDB.executeQuery(selectCategoryDataQuery);
        // Return that data via JSON
        res.status(200).json(categoryData);
    } catch (error) {
        return next({
            status: 400,
            message: 'Unable to connect to server'
        });
    }
}