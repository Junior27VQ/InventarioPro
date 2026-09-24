import express from 'express';

const app = express();
const PORT = 3000;

app.use(express.json({limit: '10mb'}));

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto: ${PORT}`);
}) 