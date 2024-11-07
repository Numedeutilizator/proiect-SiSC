const express = require("express");
const utils = require("./utils");
const path = require('path');
const app = express();
app.use(express.json());


app.use(express.static(path.join(__dirname, 'public')));

// Start server
const port = 1234;
app.listen(port, () => console.log(`Serverul merge pe portul ${port}`));


app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/reset', async(req,res) =>{
    await utils.resetDatabase();
    console.log("Baza de date a fost resetata");
    res.status(200).send("baza de date a fost resetata");
});
app.post("/addUser" , async(req,res) =>{
    const {nume, dataNasterii, email, numarTelefon} = req.body;
    const Persoana = {
        numePersoana:nume,
        dataNasterii:dataNasterii,
        emailPersoana:email,
        numarTelefon:numarTelefon
    };
    await utils.insertUser(Persoana);
    res.status(201).send("persoana a fost adaugata");
});