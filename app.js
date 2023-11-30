// npm init
// npm i express mongoose dotenv validator
require("dotenv").config();
const { connectDb } = require("./src/services/mongoose");
const userRoutes = require("./src/routes/user");
const budgetRoutes = require("./src/routes/budget");
const cors = require("cors");

// connexion express
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

// connexion database
connectDb().catch((err) => console.log(err));

// AuthorisationCORS
// middleware sur les routes
// CORS middleware
const allowCrossDomain = function(req, res, next) {
  var allowedOrigins = ['https://gamifyurlife.netlify.app/', 'http://localhost:5000'];
  var origin = req.headers.origin;

  if(allowedOrigins.indexOf(origin) > -1){
      res.header('Access-Control-Allow-Origin', origin);
  }

  res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, POST'); // added OPTIONS as an allowed method
  res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type,x-access-token');
  res.header('access-control-allow-credentials', true);

  return next();
}
app.use(allowCrossDomain);

// gestion des routes
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(userRoutes);
app.use(budgetRoutes);

app.use((req, res) => res.json({ message: "l'API est en ligne !" }));
app.listen(port, () => {
  console.log("Le serveur est lancé sur le port " + port);
});
