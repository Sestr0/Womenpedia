const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require("cors");
const OpenAI = require("openai");

const app = express();
const PORT = process.env.PORT || 3000;

// Inizializza un'istanza di OpenAI specificando la chiave API
const openai = new OpenAI({
  apiKey: "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",
});

// Middleware per il parsing del corpo delle richieste
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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
        const num = Math.floor(Math.random() * results.length); // Genera un numero casuale compreso tra 0 e la lunghezza dell'array dei risultati
        //invio la risposta
        res.status(200).send({
          evento: results[num].evento,
          id: results[num].id,
          data: results[num].data,
        });
        return;
      } //se la query non restituisce nulla
      else {
        res.status(200).send({
          evento: "Non esiste un evento registrato per questa data.",
          id: null,
          data: null,
        });
      }
    }
  );
});

// Endpoint per gestire la richiesta POST della domanda al chatbot
app.post("/chat", async (req, res) => {
  try {
    const question = req.body.question; // Legge la domanda dal corpo della richiesta
    if (question == "Non esiste un evento registrato per questa data.") {
      res.json({
        response: "Non posso fornire ulteriori informazioni di un evento non fornito", // Risposta del chatbot
      });
      return;
    }
    // Invia una richiesta al servizio di completamento della chat di OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Specifica il modello da utilizzare
      messages: [
        { role: "user", content: `Utente: ${question}` }, // Aggiunge il messaggio dell'utente al contesto della chat
      ],
    });

    // Restituisci la risposta come JSON con maggiore dettaglio sull'input dell'utente
    res.json({
      response: completion.choices[0].message.content, // Risposta del chatbot
    });
  } catch (error) {
    // Gestisce eventuali errori durante l'elaborazione della richiesta
    console.error("Errore durante l'elaborazione della richiesta:", error);
    res
      .status(500)
      .json({ error: "Errore durante l'elaborazione della richiesta" });
  }
});

// Avvia il server sulla porta specificata
app.listen(PORT, () => {
  console.log(`Server in ascolto sulla porta ${PORT}`);
});
