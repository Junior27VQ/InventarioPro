import { Router } from 'express';
import { obtenerProductos, crearProducto, actualizarProducto, eliminarProducto } from '../controllers/producto.controller.js';
import { validarProducto } from '../middlewares/producto.middleware.js';

const router = Router();

// GET: Obtener todos los productos del inventario
router.get('/productos', obtenerProductos);

// POST: Crear un producto (Pasa primero por el middleware de validación)
router.post('/productos', validarProducto, crearProducto);

// PUT: Actualizar un producto por ID
router.put('/productos/:id', actualizarProducto);

// DELETE: Eliminar un producto por ID
router.delete('/productos/:id', eliminarProducto);

export default router;