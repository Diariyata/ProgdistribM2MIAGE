import express from 'express';
import { login, register } from '../controllers/auth.controller';
const app = express()
app.use(express.json());

app.post('/auth/register', (req, res) => { 
    register(req, res)
});

app.post('/auth/login', (req, res) => { 
    login(req, res)
});

export default app; 