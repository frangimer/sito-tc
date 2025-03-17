const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

// Middleware per analizzare i dati JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Servire i file statici dalla cartella corrente
app.use(express.static(__dirname));

// Rotta per la pagina principale
app.get('/', (req, res) => {
    const filePath = path.join(__dirname, 'index.html');
    res.sendFile(filePath, (err) => {
        if (err) {
            res.status(500).send('Errore interno del server');
        }
    });
});

// Rotta per inviare i dati del modulo e inviare l'email
app.post('/send-email', (req, res) => {
    const { firstName, lastName, email, message } = req.body;

    // Configurazione del trasportatore di Nodemailer (usiamo Gmail come esempio)
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'tuoindirizzo@gmail.com',  // Sostituisci con il tuo indirizzo email
            pass: 'tuaPassword'  // Sostituisci con la tua password
        }
    });

    // Configurazione dell'email
    const mailOptions = {
        from: email, // Da dove arriva l'email
        to: 'francesco.laus97@gmail.com', // L'indirizzo email a cui inviare
        subject: 'Nuovo messaggio da contatto',
        text: `Nome: ${firstName} ${lastName}\nEmail: ${email}\n\nMessaggio:\n${message}`
    };

    // Invio dell'email
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.error('Errore nell\'invio dell\'email:', err);
            return res.status(500).send('Errore nell\'invio del messaggio');
        }
        console.log('Email inviata:', info.response);
        return res.status(200).send('Messaggio inviato con successo!');
    });
});

// Avvio del server
app.listen(port, () => {
    console.log(`Server in esecuzione sulla porta ${port}`);
});
