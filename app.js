// importazione express
const express = require('express');
const app = express();
const port = 3000

//  import del middleware checkTime
const checkTime = require('./middlewares/checkTime');

// import del middelware di gestione errore interno 500
const errorsHandler = require("./middlewares/errorsHandler");

// import del middelware di gestione di rotta inesistente
const notFound = require("./middlewares/notFound");

// importazione router dei blog
const postsRouter = require('./routers/posts');

// attivazione cartelle public
app.use(express.static('public'));

// registro body-parser per application/json
app.use(express.json());

// registro middleware checkTime
app.use(checkTime);

// rotta per la home app
app.get('/', (req, res) => {
    res.send("rotta di home della nostra app di blog")
})

// registrazione middleware su router specifico
app.use("/posts", checkTime)

// registriamo middelware di gestione err 500
app.use(errorsHandler);

// registriamo middelware di gestione rotta inesistente
app.use(notFound);

// istanza delle rotte per risorsa blog
app.use("/posts", postsRouter)

// ascolto della port
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})