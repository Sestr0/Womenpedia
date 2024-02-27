const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Configurazione della connessione al database MySQL su XAMPP
const connection = mysql.createConnection({
  host: "localhost",
  user: "root", // Utente di default di MySQL su XAMPP
  password: "", // Password di default di MySQL su XAMPP (generalmente vuota)
  database: "test", // Nome del database creato su phpMyAdmin
});

// Connessione al database
connection.connect((err) => {
  if (err) {
    console.error("Errore di connessione al database:", err);
    return;
  }
  console.log("Connessione al database MySQL avvenuta con successo.");
});

// Middleware per il parsing del corpo delle richieste
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.post("/evento", (req, res) => {
  //leggo la data inviata dalla post del client
  const data = req.body;
  //la stampo sul terminale
  console.log(data);

  //query di selezione 
  connection.query(
    "SELECT * FROM data_storica WHERE SUBSTRING (data, 6, 2) = '" +
      data.mese +
      "' AND SUBSTRING(data, 9, 2) = '" +
      data.giorno +
      "'",
    (error, results) => {
      //caso di errore
      if (error) {
        console.error("Errore durante l'esecuzione della query");
        res.status(500).send("Errore durante il carimento dati");
        return;
      }
      //se fosse andata a buon fine...
      //stampo i risultati sul terminale
      console.log(results);
      //se la query restituisce qualcosa...
      if (results.length > 0) {
        //invio la risposta
        res.status(200).send({
          evento: results[0].evento,
          id: results[0].id,
          data: results[0].data
        });        
        return;
      } //se la query non restituisce nulla 
      else {
        res.status(200).send({
          evento: "Non esiste un evento registrato per questa data.",
          id: null,
          data: null
      });
    }
  }
  );
});

// Avvio del server
app.listen(PORT, () => {
  console.log(`Server in ascolto sulla porta ${PORT}`);
});
