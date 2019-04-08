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

        const selectAllPhotos = `SELECT photo_id, photo_title, photo_desc FROM photo;`;

        let response = await mysqlDB.executeQuery(selectAllPhotos);

        res.status(200).json(response);
        
    } catch (error) {
        return next({
            status: 400,
            message: 'Unable to select photos'
        });
    }
}