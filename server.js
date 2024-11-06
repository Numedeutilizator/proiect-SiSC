const express = require("express");
const utils = require("./utils");
const app = express();
app.use(express.json());


// Start server
const port = 1234;
app.listen(port, () => console.log(`Serverul merge pe portul ${port}`));


app.get('/', function(req, res) {
    res.send("index");
});

app.get('/reset', async(req,res) =>{
    await utils.resetDatabase();
    console.log("Baza de date a fost resetata");
    res.status(200).send("baza de date a fost resetata");
});
app.post("/addUser" , async(req,res) =>{
    const {nume, dataNasterii, email, numarTelefon} = req.bodyl
    const Persoana = {
        numePersoana:nume,
        dataNasterii:dataNasterii,
        emailPersoana:email,
        numarTelefon:numarTelefon
    };
    await utils.insertUser(Persoana);
    res.status(201).send("persoana a fost adaugata");
});