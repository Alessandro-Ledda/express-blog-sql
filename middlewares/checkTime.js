function checkTime(req, res, next) {

    // verica che risponde(ci ricaviamo una stringa della data corrente che corrisponde a quando viene effuattata la chiamata)
    const now = new Date();
    const currentTime = now.toLocaleString();

    // rispettivo output di conferma
    console.log("hai appena effettuato una chiamata da postman", currentTime);

    next()
}

// esportiamo il file
module.exports = checkTime