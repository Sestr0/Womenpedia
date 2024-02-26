const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const PORT = process.env.PORT || 3000;

// Configurazione della connessione al database MySQL su XAMPP
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Utente di default di MySQL su XAMPP
  password: '', // Password di default di MySQL su XAMPP (generalmente vuota)
  database: 'test' // Nome del database creato su phpMyAdmin
});

// Connessione al database
connection.connect((err) => {
  if (err) {
    console.error('Errore di connessione al database:', err);
    return;
  }
  console.log('Connessione al database MySQL avvenuta con successo.');
});

// Middleware per il parsing del corpo delle richieste
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Endpoint per ottenere l'evento storico corrispondente alla data odierna
app.get('/api/evento', (req, res) => {
  const dataOdierna = getDataOdierna();

  // Estrai mese e giorno dalla data odierna
  const [meseOdierno, giornoOdierno] = dataOdierna.split('-');

  // Query per ottenere l'evento storico corrispondente al mese e giorno forniti
  const query = `SELECT evento FROM data_storica WHERE SUBSTRING(data, 6, 5) = ?`;
  console.log('Query SQL:', query); // Aggiunto per debug
  console.log('Data odierna:', dataOdierna); // Aggiunto per debug
  connection.query(query, [`${meseOdierno}-${giornoOdierno}`], (error, results, fields) => {
    if (error) {
      console.error('Errore durante l\'esecuzione della query:', error);
      return res.status(500).json({ error: 'Errore durante il recupero dell\'evento storico.' });
    }

    if (results.length === 0) {
      console.log('Nessun evento storico trovato per questa data.');
      return res.status(404).json({ error: 'Nessun evento storico trovato per questa data.' });
    }

    console.log('Evento storico trovato:', results[0].evento);
    res.json({ evento: results[0].evento });
  });
});

// Funzione per ottenere la data odierna nel formato "MM-DD"
function getDataOdierna() {
  const oggi = new Date();
  const mese = String(oggi.getMonth() + 1).padStart(2, '0');
  const giorno = String(oggi.getDate()).padStart(2, '0');
  return `${mese}-${giorno}`;
}

// Avvio del server
app.listen(PORT, () => {
  console.log(`Server in ascolto sulla porta ${PORT}`);
});
