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
  const data = req.body;

  connection.query(
    "SELECT * FROM data_storica WHERE SUBSTRING (data, 6, 2) = ? AND SUBSTRING(data, 9, 2) = ?",
    [data.mese, data.giorno],
    (error, results) => {
      if (error) {
        console.error("Errore durante l'esecuzione della query");
        res.status(500).send("Errore durante il caricamento dati");
        return;
      }
      
      if (results.length > 0) {
        const num = Math.floor(Math.random() * results.length);
        res.status(200).send({
          evento: results[num].evento,
          id: results[num].id,
          data: results[num].data,
        });
      } else {
        res.status(200).send({
          evento: "Non esiste un evento registrato per questa data.",
          id: null,
          data: null,
        });
      }
    }
  );
});

app.post("/chat", async (req, res) => {
  try {
    const question = req.body.question;

    if (question == "Non esiste un evento registrato per questa data.") {
      res.json({
        response: "Non posso fornire ulteriori informazioni di un evento non fornito",
      });
      return;
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "user", content: `Utente: ${question}` },
      ],
    });

    res.json({
      response: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error("Errore durante l'elaborazione della richiesta:", error);
    res
      .status(500)
      .json({ error: "Errore durante l'elaborazione della richiesta" });
  }
});

app.listen(PORT, () => {
  console.log(`Server in ascolto sulla porta ${PORT}`);
});
