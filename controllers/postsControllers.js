// importazione dei data della risorsa
const blogList = require('./../data/posts');

// iniziliziamo le funzioni contenenti la logica delle rotte

// index
function index(req, res) {

    // risposta in formato json di  tutto l'arrey 
    // res.json(blogList)

    // inizialmente, il menu filtrato corrisponde a quello originale
    let filteredList = blogList;

    // se la richiesta contiene un filtro, allora filtriamo
    if (req.query.tags) {
        filteredList = blogList.filter(
            post => post.tags.includes(req.query.tags)
        );
    }

    // creo oggetto menu con le prop che servono
    const objList = {
        numeroBlog: filteredList.length,
        listaBlog: filteredList
    }

    // risposta in formato json
    res.json(objList);
}



// show
function show(req, res) {

    // recupero id dall'url del blog corrente e trasformarlo in un numero
    const idNum = parseInt(req.params.id)

    // introduciamo un errore a caso per test middelware err 500
    // throw new Error("Errore di test middleware");    

    // cerchiamo la pizza in base al suo id di ref
    const post = blogList.find(post => post.id === idNum);

    // condione di check se trovato item
    if (!post) {

        // forziamo il messaggio d'errore a 404
        res.status(404);

        // res con oggetto di errore
        return res.json({
            error: "not found",
            messagge: "blog non trovato"

        })
    }

    // restituiamo il tutto in formato json
    res.json(post);
}

// store
function store(req, res) {
    // soluzione per creazione id univoco(mansione db)
    const newId = Date.now();

    // costruiamo il nuovo oggetto post che verra aggiunto
    const newPost = {
        id: newId,
        title: req.body.title,
        content: req.body.content,
        image: req.body.image,
        tags: req.body.tags
    }

    // aggiungiamo il post alla lista dei post
    blogList.push(newPost);

    // verifica 
    console.log(blogList);

    // restituiamo lo stato corretto per l'operazone(creazione di un nuovo post).
    res.status(201);
    res.json(blogList);
}

// update  "aggiornamento totale"
function update(req, res) {
    // recupero id dall'url e trasformarlo in un numero
    const id = parseInt(req.params.id);

    // cerchaimo il post corrente attrarverso l'id
    const post = blogList.find(post => post.id === id);

    // controllo
    if (!post) {
        res.status(404);

        return res.json({
            error: "Not Found",
            messagge: "post non trovato"
        })
    }

    // proprieta' da aggiornare del post
    post.title = req.body.title;
    post.content = req.body.content;
    post.image = req.body.image;
    post.tags = req.body.tags

    // verifica lista
    console.log(blogList);

    // ritorno il post appena aggiornato
    res.json(post);

}

// modify "modifiche parziali"
function modify(req, res) {

    // trasformiamo l'id dall'url in un numero
    const id = parseInt(req.params.id);

    // cerchiamo il post attraverso il corrispettivo id
    const post = blogList.find(post => post.id === id);

    // controllo
    if (!post) {
        res.status(404);

        return res.json({
            error: "Not Found",
            messagge: "post non trovato"
        })
    }

    // aggiornamneto post preso in esame (is true allora e' uguale altrimenti e uguale a prima )
    req.body.title ? post.title = req.body.title : post.title = post.title;
    req.body.content ? post.content = req.body.content : post.content = post.content;
    req.body.image ? post.image = req.body.image : post.image = post.image;
    req.body.tags ? post.tags = req.body.tags : post.tags = post.tags

    // verifica
    console.log(blogList)

    // restituiamo tutto in json
    res.json(post);
}

// destroy
function destroy(req, res) {

    // recupero id dall'url del blog corrente e trasformarlo in un numero
    const id = parseInt(req.params.id)

    // cerchaimo il blog da eliminare per id
    const post = blogList.find(post => post.id === id);

    // controllo per eventuali errori
    if (!post) {
        res.status(404);

        return res.json({
            status: 404,
            error: "not found",
            message: "blog non trovato"
        })
    }

    // rimuoviamo la pizza dal menu
    blogList.splice(blogList.indexOf(post), 1);

    // forzo status del successo della cancellazione (204)
    res.sendStatus(204)
}

// esportimo tutte le funzione per le rotte di ref
module.exports = { index, show, store, update, modify, destroy }