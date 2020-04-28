import express from 'express';
import data from './store';
import cors from 'cors';

const app = express(); // instanciranje aplikacije
const port = 3200; // port na kojem će web server slušati

app.use(cors());
app.use(express.json());

// recepti
app.get('/recepti', (req, res) => res.json(data.recepti));
app.get('/recepti/:id', (req, res) => res.json(data.jedan_recept));
app.post('/recepti', (req, res) => {
    res.statusCode = 201;
    res.setHeader('Location', '/recepti/1234');
    res.send();
});


// pretrazivanje sastojci
app.get('/recepti/:sastojci', (req, res) => res.json(data.pretragaRecepataSastojci));

//pretrazivanje po nazivu
app.get('/recepti/:naziv', (req, res) => res.json(data.pretragaRecepataNaziv));

//dohvat komentara
app.get('/recepti/:id/komentar', (req, res) => res.json(data.komentarRecepta));

//dohvat ocjene
app.get('/recepti/:id/ocjena', (req, res) => res.json(data.ocjenaRecepta));

// unos jednog komentara
app.put('/recepti/:id/komentar', (req, res)  => {
    let data = req.body;

    if (!data.komentar) {
        res.statusCode = 400;
        return res.json({
            error: 'There are parameters missing.',
        });
    }

    res.statusCode = 201;
    res.setHeader('Location', '/recepti/00146299/komentar');
    res.send();
});

// unos jedne ocjene
app.put('/recepti/:id/ocjena', (req, res)  => {
    let data = req.body;

    if (!data.ocjena) {
        res.statusCode = 400;
        return res.json({
            error: 'There are parameters missing.',
        });
    }

    res.statusCode = 201;
    res.setHeader('Location', '/recepti/00146299/ocjena');
    res.send();
});

app.listen(port, () => console.log(`Slušam na portu ${port}!`));
