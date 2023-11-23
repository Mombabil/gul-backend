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
app.use((req, res, next) => {
  cors(console.log(cors), {
    origin: "https://gamifyurlife.netlify.app/",
    credentials: true,
    optionsSuccessStatus: 200,
  });
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://gamifyurlife.netlify.app/"
  );
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type",
    "Accept"
  );
  next();
});

// gestion des routes
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(userRoutes);
app.use(budgetRoutes);

app.use((req, res) => res.json({ message: "l'API est en ligne !" }));
app.listen(port, () => {
  console.log("Le serveur est lancé sur le port " + port);
});
