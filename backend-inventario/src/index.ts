import express from 'express';
import productoRoutes from './routes/producto.routes.js';

const app = express();
const PORT = 3000;

// Configuración importante para aceptar imágenes pesadas en Base64
app.use(express.json({ limit: '10mb' }));

// Registrar las rutas de la API
app.use('/api', productoRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto: ${PORT}`);
});