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

exports.insertCategory = async function(req, res, next){
    try {
        // Connect to database
        mysqlDB.initializeConnection(connectionInfo);
        
        // Create query string
        const insertCategoryQuery = `INSERT INTO category (category_title, category_desc) VALUES (${mysql.escape(req.body.title)}, ${mysql.escape(req.body.desc)});`;
        
        // Execute query
        let response = await mysqlDB.executeQuery(insertCategoryQuery);

        // If the insertion was successful, return the data that was inserted
        if (response.insertId){
            res.status(200).json({
                category_id: response.insertId,
                category_title: req.body.title,
                category_desc: req.body.desc,
                status: true
            });
        } else {
            return next({
                status: 400,
                message: 'Unable to insert new category'
            });
        }

    } catch (error) {
        return next({
            status: 400,
            message: 'Unable to insert new category'
        });
    }
}

exports.deleteCategory = async function(req, res, next){
    try {

        // Connect to database
        mysqlDB.initializeConnection(connectionInfo);

        // Create query string to delete category by id
        const deleteCategoryQuery = `DELETE FROM category WHERE category_id = ${req.body.id}`;

        // Execute Query
        let response = await mysqlDB.executeQuery(deleteCategoryQuery);

        // Return data
        if (response.affectedRows === 1){
            res.status(200).json({
                status: true,
                deleted_id: req.body.id
            });
        } else {
            return next({
                status: 400,
                message: 'Unable to delete category'
            });
        }

    } catch (error) {
        return next({
            status: 400,
            message: 'Unable to delete category'
        });
    }
}