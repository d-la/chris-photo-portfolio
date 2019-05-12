let mysql = require('mysql');

class MysqlDB {
    // constructor( config ){
    //     this.connection = mysql.createConnection(config);
    // }

    initializeConnection( config ){
        // this.connection = mysql.createConnection( config );
        this.connection = mysql.createPool( config );
    }

    // Return a promise when executing a query
    executeQuery( sqlQuery, args ){
        return new Promise ( (resolve, reject) => {
            this.connection.query( sqlQuery, args, (error, results) => {
                if ( error ){
                    return reject( error );
                } else {
                    resolve( results );
                }
            })
        });
    }

    // Return a promise when closing the connection
    closeConnection(){
        return new Promise( (resolve, reject) => {
            this.connection.end( error => {
                if ( error ){
                    return reject( error );
                } else {
                    resolve();
                }
            })
        });
    }
}

module.exports = new MysqlDB();