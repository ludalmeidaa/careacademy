const mysql = require('mysql2/promise');
const client = mysql.createPool(process.env.CONNECTION_STRING);

async function selecionarUsuarios() {
    const res = await client.query('SELECT * FROM usuario');
    return res[0];
}
 
module.exports = { selecionarUsuarios }