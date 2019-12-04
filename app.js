
// Imports
const express = require("express");
const app = express();



// Init DB
require("./DB/db_init")();



// Middlewares
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST,PUT,DELETE");
    next();
});
app.use(express.json()); // parsea objetos STRING a JSON 



// Routes
app.use(require("./routes/rt_user"));



// Init srv
app.listen(3000, ( () => {
	console.log( "    ---> Server listening on port 3000" );
}));

