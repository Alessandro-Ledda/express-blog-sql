function errorsHandler(err, req, res, next) {
    // forzo lo stato per convenzione al codice che da errore interno del server
    res.status(500)

    // aggiungo info per avere un messaggio di errore piu conprensibile e completo sempre in formato json
    res.json({
        error: err.message,
    })
}

// esportiamo il file 
module.exports = errorsHandler