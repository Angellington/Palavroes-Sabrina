import { Client } from 'pg';

const client = new Client({
    host: 'localhost',
    user: 'postgres',
    port: 5432,
    database: 'palavroes-sabrina',
    password: '2005'
})

client
    .connect()
    .then(() => console.log('Conectado ao banco de dados PostgreSQL'))
    .catch((err) => console.error('Erro ao conectar ao banco de dados PostgreSQL', err));

client.query('SELECT * FROM pessoas', (err, res) => {
    if (err) {
        console.error('Erro ao executar a consulta', err);
    } else {
        console.log('Resultado da consulta:', res.rows);
    }
    client.end();
});