const mysql = require('mysql');
const mysqlDB = require('../models/MysqlDB');

const connectionInfo = {
    host:     process.env.DB_HOST,
    user:     process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
}

exports.selectAllPhotos = async function(req, res, next){
    try {

        mysqlDB.initializeConnection(connectionInfo);

        const selectAllPhotos = `SELECT photo_id, photo_title, photo_desc, photo_src, date_added, subcategory_id FROM photo;`;

        let response = await mysqlDB.executeQuery(selectAllPhotos);

        res.status(200).json(response);
        
    } catch (error) {
        return next({
            status: 400,
            message: 'Unable to select photos'
        });
    }
}

exports.insertPhoto = async function(req, res, next){
    try {

        mysqlDB.initializeConnection(connectionInfo);

        const insertPhoto = `INSERT INTO photo (photo_title, photo_desc, photo_src, date_added, subcategory_id) VALUES (${mysql.escape(req.body.title)}, ${mysql.escape(req.body.desc)}, ${mysql.escape(req.body.src)}, NOW(), ${req.body.subcategory_id});`;

        let response = await mysqlDB.executeQuery(insertPhoto);

        res.status(200).json(response);
    } catch (error) {
        return next({
            status: 400,
            message: 'Unable to insert photo'
        });
    }
}

exports.selectSpecificPhoto = async function(req, res, next){
    try {
        mysqlDB.initializeConnection(connectionInfo);

        const selectSpecificPhoto = `SELECT photo_id, photo_title, photo_desc, photo_src, date_added, subcategory_id FROM photo WHERE photo_id = ${req.params.id};`;

        let photoData = await mysqlDB.executeQuery(selectSpecificPhoto);

        res.status(200).json(photoData);
    } catch (error) {
        return next({
            status: 400,
            message: 'Unable to select specific photo'
        });
    }
}

exports.updateSpecificPhoto = async function(req, res, next){
    try {
        mysqlDB.initializeConnection(connectionInfo);

        const updateSpecificPhoto = `UPDATE photo SET photo_title = ${mysql.escape(req.body.title)}, photo_desc = ${mysql.escape(req.body.desc)}, subcategory_id = ${req.body.subcategory_id} WHERE photo_id = ${req.params.id};`;

        let photoData = await mysqlDB.executeQuery(updateSpecificPhoto);

        res.status(200).json(photoData);
    } catch (error) {
        return next({
            status: 400,
            message: 'Unable to select specific photo'
        });
    }
}

exports.deletePhoto = async function(req, res, next){
    try {
        mysqlDB.initializeConnection(connectionInfo);

        const deletePhoto = `DELETE FROM photo WHERE photo_id = ${req.body.photo_id};`;

        let photoData = await mysqlDB.executeQuery(deletePhoto);

        res.status(200).json(photoData);
    } catch (error) {
        return next({
            status: 400,
            message: 'Unable to select specific photo'
        });
    }
}