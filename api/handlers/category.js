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
        const selectCategoryDataQuery = `SELECT category_id, category_title, category_desc, category_route FROM category;`;
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

exports.getCategoryData = async function(req, res, next){
    try {

        // Connect to database
        mysqlDB.initializeConnection(connectionInfo);

        // Create query to select category data
        // const selectCategoryData = `SELECT c.category_id, c.category_title, c.category_desc, s.subcategory_id, s.subcategory_title, s.subcategory_desc, p.photo_id, p.photo_title, p.photo_desc, p.photo_src FROM category c INNER JOIN subcategory s ON c.category_id = s.subcategory_id RIGHT JOIN photo p ON p.subcategory_id = s.subcategory_id WHERE c.category_id = ${req.body.id};`
        const selectCategoryData = `SELECT category_id, category_title, category_desc FROM category WHERE category_id = ${req.params.id};`;
        
        let response = await mysqlDB.executeQuery(selectCategoryData);
        
        res.status(200).json(response);
    } catch (error) {
        return next({
            status: 400,
            message: 'Unable to retrieve category data'
        });
    }
}

exports.updateCategory = async function(req, res, next){
    try {

        mysqlDB.initializeConnection(connectionInfo);
        const updateCategoryData = `UPDATE category SET category_title = ${mysql.escape(req.body.title)}, category_desc = ${mysql.escape(req.body.desc)} WHERE category_id = ${req.params.id};`;

        let response = await mysqlDB.executeQuery(updateCategoryData);

        if (response.affectedRows === 1){
            res.status(200).json({
                status: true,
                category_id: req.params.id,
                category_title: req.body.title,
                category_desc: req.body.desc
            });
        } else {
            return next({
                status: 400,
                message: 'Unable to update category data'
            });
        }

    } catch (error) {
        return next({
            status: 400,
            message: 'Unable to update category data'
        });
    }
}