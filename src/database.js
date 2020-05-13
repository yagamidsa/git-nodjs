const mysql = require('mysql');
const { promisify } = require('util');
const { database } = require('./keys');



const pool = mysql.createPool(database);

pool.getConnection((err, connection) =>  {

  if(err){

      if(err.code === 'PROTOCOL_CONNECTION_LOST'){


                console.error('Base datos Cerrada');

        }

        if(err.code === 'ER_CON_COUNT_ERROR'){

            console.error('mas deuna coneccion a la base');
        }

        if(err.code === 'ECONNREFUSED'){


            console.error('Coneccion rechazada');



        }

}

if(connection) connection.release();

        console.log('DB esta conectada');

        return;


} );


//promisify pool querys realizar consultas por promesas
pool.query = promisify(pool.query);

module.exports = pool;
