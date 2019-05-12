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

exports.allSubCategories = async function(req, res, next){
    try {
        // Connect to the database
        mysqlDB.initializeConnection(connectionInfo);
        // Select all sub categories and photos in a category
        const selectSubCategoryData = `SELECT subcategory_id, subcategory_title, subcategory_desc, category_id FROM subcategory;`;

        let categoryData = await mysqlDB.executeQuery(selectSubCategoryData);
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

exports.insertNewSubCategory = async function(req, res, next){
    try {
        // Connect to the database
        mysqlDB.initializeConnection(connectionInfo);
        
        // Select all sub categories and photos in a category
        const insertSubCategory = `INSERT INTO subcategory (subcategory_title, subcategory_desc, category_id) VALUES (${mysql.escape(req.body.title)}, ${mysql.escape(req.body.desc)}, ${mysql.escape(req.body.category_id)});`;
        
        let response = await mysqlDB.executeQuery(insertSubCategory);
        
        // Return that data via JSON
        res.status(200).json(response);

        await mysqlDB.closeConnection();
    } catch (error) {
        return next({
            status: 400,
            message: 'Unable to connect to server'
        });
    }
}

exports.selectSpecificSubCategory = async function(req, res, next){
    try {
        // Connect to the database
        mysqlDB.initializeConnection(connectionInfo);

        const selectSpecificSubCategory = `SELECT s.subcategory_id, s.subcategory_title, s.subcategory_desc, s.category_id, c.category_title FROM subcategory s RIGHT JOIN category c ON s.category_id = c.category_id WHERE subcategory_id = ${req.params.id};`

        let response = await mysqlDB.executeQuery(selectSpecificSubCategory);

        res.status(200).json(response);

        await mysqlDB.closeConnection();
    } catch (error) {
        return next({
            status: 400,
            message: 'Unable to select subcategory data'
        });
    }
}

exports.updateSpecificSubCategory = async function(req, res, next){
    try {

        // Connect to the database
        mysqlDB.initializeConnection(connectionInfo);

        const updateSpecificSubCategory = `UPDATE subcategory SET subcategory_title = ${mysql.escape(req.body.title)}, subcategory_desc = ${mysql.escape(req.body.desc)}, category_id = ${req.body.category_id} WHERE subcategory_id = ${req.params.id};`

        let response = await mysqlDB.executeQuery(updateSpecificSubCategory);

        if (response.affectedRows === 1){
            res.status(200).json({
                status: true,
                subcateogry_id: req.params.id,
                subcategory_title: req.body.title,
                subcategory_desc: req.body.desc,
                category_id: req.body.category_id
            });
        } else {
            return next({
                status: 400,
                message: 'Unable to update subcategory data'
            });
        }

        await mysqlDB.closeConnection();

    } catch (error) {
        return next({
            status: 400,
            message: 'Unable to update subcategory data'
        });
    }
}

exports.deleteSubCategory = async function(req, res, next){
    try {
         // Connect to the database
        mysqlDB.initializeConnection(connectionInfo);

        const deleteSubCategory = `DELETE FROM subcategory WHERE subcategory_id = ${req.body.id};`

        let response = await mysqlDB.executeQuery(deleteSubCategory);

        if (response.affectedRows === 1){
            res.status(200).json({
                status: true,
                deleted_id: req.body.id
            });
        } else {
            return next({
                status: 400,
                message: 'Unable to delete subcategory'
            });
        }

        await mysqlDB.closeConnection();
    } catch (error) {
        return next({
            status: 400,
            message: 'Unable to delete subcategory'
        });
    }
}

exports.selectSubCategoriesFromCategory = async function(req, res, next){
    try {
        // Connect to the database
        mysqlDB.initializeConnection(connectionInfo);

        const selectSubCategoriesFromCategory = `SELECT subcategory_id, subcategory_title, subcategory_desc, category_id FROM subcategory WHERE category_id = ${req.params.id};`

        let response = await mysqlDB.executeQuery(selectSubCategoriesFromCategory);

        await mysqlDB.closeConnection();

        res.status(200).json(response);
   } catch (error) {
       return next({
           status: 400,
           message: `Unable to select all subcategories that belong to category ${req.params.id}.`
       });
   }
}