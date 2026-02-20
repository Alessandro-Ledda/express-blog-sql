
// import dei data della risorsa
const menuPizze = require('./../data/posts');
// importiamo il file di connessione del db
const connection = require('./../data/db');

// iniziliziamo le funzioni contenenti la logica delle rotte

// index
function index(req, res) {
    // preparazione query
    const sql = 'SELECT * FROM posts';

    // esecuzione query
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: 'database query failed' });
        // risposta in formato json
        res.json(results);
    });
}


// show
function show(req, res) {

    const { id } = req.params;

    const sql = 'SELECT * FROM posts WHERE id = ?';


    // preparazione query
    const tagsSql = `
    SELECT  tags.*
    FROM tags
    JOIN post_tag ON tags.id = post_tag.tag_id
    WHERE post_tag.post_id = ?;
    `;

    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ error: 'database query failed' });
        if (results.length === 0) return res.status(404).json({ error: 'post not found' });

        // recupero post
        const post = results[0];

        // facciamo partire la seconda query di join se la prima ha avuto successo
        connection.query(tagsSql, [id], (err, tagsResults) => {
            if (err) return res.status(500).json({ error: 'database query failed' });

            // agganciamola ai tag dei posts
            post.tags = tagsResults;
            res.json(post);
        });
    });
}

// store
function store(req, res) {

    // recuperiamo i dati del corpo della richiesta
    const { title, image } = req.body;

    // prepariamo la query
    const sql = 'INSERT INTO posts (title, image) VALUES(?, ?)'

    // eseguiamo la query
    connection.query(
        sql,
        [title, image],
        (err, results) => {
            if (err) return res.status(500).json({ error: 'failed to insert post' });
            // res.status(201); staus corretto
            res.status(201);
            console.log(results)
            res.json({ id: results.insertId }); //restituiamo l'id assegnato al db

        }
    );
}

// update  "aggiornamento totale"
function update(req, res) {
    // recupero id dall'url 
    const { id } = req.params;

    // recuperiamo i dati dal body della richiesta
    const { title, image } = req.body;

    // Prepariamo la query per aggiornare il post
    connection.query(
        'UPDATE posts SET title = ?, image = ? WHERE id = ?',
        [title, image, id],
        (err) => {
            if (err) return res.status(500).json({ error: 'failed to update post' });
            res.json({ message: 'post update successfully' });
        }
    );
}


// modify "modifiche parziali"
function modify(req, res) {
    const { id } = req.params;
    const { title, image } = req.body;

    const sql = `
        UPDATE posts
        SET title = COALESCE(?, title),
            image = COALESCE(?, image)
        WHERE id = ?
    `;

    connection.query(sql, [title, image, id], (err) => {
        if (err) return res.status(500).json({ error: 'failed to modify post' });

        res.json({ message: 'post modified successfully' });
    });
}

// destroy
function destroy(req, res) {

    // recupero id dall'url del blog corrente e trasformarlo in un numero
    const id = parseInt(req.params.id)

    const sql = 'DELETE FROM posts WHERE id = ?';

    // eliminiamo post dal db 
    connection.query(sql, [id], (err) => {
        if (err) return res.status(500).json({ error: 'failed to delete post' });
        // forzo status del successo della cancellazione (204)
        res.sendStatus(204)
    });


}

// esportimo tutte le funzione per le rotte di ref
module.exports = { index, show, store, update, modify, destroy }