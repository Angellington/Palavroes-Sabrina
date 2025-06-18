const { Pool } = require('pg');
// require('dotenv').config();



const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

module.exports = {
    query: (text, params) => pool.query(text, params),
    connect: async () => {
        try {
            const client = await pool.connect();
            console.log('Conexão com o banco de dados bem-sucedida!');
            client.release(); // libera o cliente de volta para o pool
        } catch (err) {
            console.error('Erro ao conectar ao banco de dados:', err.message);
            throw err; // propaga o erro para ser tratado no server.js
        }
    }
};
