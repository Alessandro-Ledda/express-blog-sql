function notFound(res, req, next) {
    // forziomo il codice di risposta corretta 
    res.status(404)

    // gestiamo l'errore con res piu completa in formato json
    res.json({
        error: "Not Found",
        message: "Page Not Found"
    });
};

// export del file 
module.exports = notFound;