import express from 'express';
import { login, verifyToken } from './controllers/auth.js';
import { search } from './controllers/itunes.js';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
const port = 3001;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/api/login', async (req, res) => {
    const {
        body: {
            email,
            password,
        },
    } = req;
    try {
        const token = await login(email, password);
        res.send(token);
    } catch (err) {
        console.log('error  ', err);
        res.status(400);
        res.send({err});
    }
});

app.get('/api/verify-token', async (req, res) => {
    const {
        query: {
            token,
        },
    } = req;
    try {
        const verified = await verifyToken(token);
        res.send({ token, verified });
    } catch (err) {
        res.status(400);
        res.send({err});
    }
});

app.get('/api/itunes', async (req, res) => {
    const {
        query: {
            filter,
            token,
        },
    } = req;
    try {
        const verified = await verifyToken(token);
        const result = await search(filter);
        res.send({ result, verified });
    } catch (err) {
        res.status(400);
        res.send({err});
    }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});