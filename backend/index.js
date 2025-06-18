const express = require('express');
const cors = require('cors');
// const db = require('./db');
const db = require('./db');
const app = express();
app.use(cors());
app.use(express.json());

require('dotenv').config();


app.get('/pessoas', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM pessoas');
        res.json(result.rows); 
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.post('/pessoas', async (req, res) => {
    const { nome, palavrao, quantidade } = req.body;
    const horario = new Date();

    try {
        const result = await db.query(
            'INSERT INTO pessoas (nome, palavrao, quantidade, horario) VALUES ($1, $2, $3, $4) RETURNING *',
            [nome, palavrao, quantidade, horario]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
})

app.post('/pessoas/acrescentar', async (req, res) => {
    const { id } = req.body;

    try {
        const result = await db.query(
            'UPDATE pessoas SET quantidade = quantidade + 1 WHERE id = $1 RETURNING *',
            [id]
        );
        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).send('Pessoa not found');
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.post('/pessoas/diminuir', async (req, res) => {
    const { id } = req.body;

    try {
        const result = await db.query(
            'UPDATE pessoas SET quantidade = quantidade - 1 WHERE id = $1 RETURNING *',
            [id]
        );
        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).send('Pessoa not found');
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.post('/pessoas/reset', async (req, res) => {
    const { id } = req.body;

    try {
        const result = await db.query(
            'UPDATE pessoas SET quantidade = 0 WHERE id = $1 RETURNING *',
            [id]
        );
        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).send('Pessoa not found');
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.delete('/pessoas/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await db.query(
            'DELETE FROM pessoas WHERE id = $1 RETURNING *',
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).send("Pessoa não encontrada");
        }

        res.status(200).json({
            message: 'Pessoa deletada com sucesso',
            pessoa: result.rows[0]
        });
        
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.post('/pessoas/aplicar', async (req, res) => {
    const { nome } = req.body;
    const horario = new Date();
    const quantidade = 0; // Assuming you want to set quantidade to 1 when applying
    const palavrao = '-'

    try {
        const result = await db.query(
            'INSERT INTO pessoas (nome, palavrao, quantidade, horario) VALUES ($1, $2, $3, $4) RETURNING *',
            [nome, palavrao, quantidade, horario]
        )

        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).send('Pessoa not found');
        }

    } catch (err) {
        res.status(500).send(err.message);
    }
})


const PORT = process.env.PORT


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

