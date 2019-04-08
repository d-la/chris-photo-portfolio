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