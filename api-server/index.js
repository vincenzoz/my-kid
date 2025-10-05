import express from 'express';
import handler from "../api/school/communications.js";
import cors from 'cors';
import handlerGetById from "../api/school/communications/[id].js";


const app = express();
app.use(cors());
app.use(express.json());

app.all("/api/school/communications", async (req, res) => {
    try {
        await handler(req, res);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' })
    }
});

app.all("/api/school/communications/:id", async (req, res) => {
    try {
        await handlerGetById(req, res);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' })
    }
});

app.listen(3001, () => {
    console.log('API server running on http://localhost:3001');
});