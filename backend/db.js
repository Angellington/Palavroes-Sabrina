const { Pool } = require('pg');
// require('dotenv').config();



const pool = new Pool({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: '2005',
    database: 'palavroes-sabrina'
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
