import mysql from 'mysql';

const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Bhuvi@123",
    database:"social"
})

export default db;