import express from "express";
import cors from "cors";
import rutasProductos from "./src/routes/products.routes.js";
import rutasLog from "./src/routes/auth.routes.js";
//import bodyParser from "body-parser";
import { authentication } from "./src/middleware/authentication.js";

const app = express();

const PORT = process.env.PORT || 3000;

const corsConfig = {
    origin: ['http://localhost:3000', 'http://midominio.com'],
    methods: ['GET', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Content-Length'],
    credentials: true,
    maxAge: 600,
    optionsSucessStatus: 204
};

app.use(cors(corsConfig));
app.use(express.json());

app.use("/api", rutasLog);
//app.use(authentication);

app.use((req, res, next) => {
    console.log(`Data received at: ${req.method} ${req.url}`);
    next();
});

app.use("/api", rutasProductos);

app.use((req, res, next) => {
    res.status(404).send('Recurso no encontrado o ruta inválida')
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});