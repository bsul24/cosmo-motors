import mysql, { ResultSetHeader, RowDataPacket } from 'mysql2/promise';


export async function callCosmo(query: string) {

  try {

    const db = await mysql.createConnection({

      host: process.env.MYSQL_HOST,

      port: parseInt(process.env.MYSQL_PORT || '3306'),

      database: process.env.MYSQL_DATABASE,

      user: process.env.MYSQL_USER,

      password: process.env.MYSQL_PASSWORD

    })

    const result = await db.execute(query);

    await db.end();

    return result;

  } catch (error) {

    console.log(error);

    return error;

  }

}