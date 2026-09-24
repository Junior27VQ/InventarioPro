import { type Request, type Response } from 'express';
import prisma from '../database/prisma.js';


// 1. GET: Listar todo el inventario de productos
export const obtenerProductos = async (req: Request, res: Response): Promise<void> => {
  try {
    const productos = await prisma.producto.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos del inventario' });
  }
};

// 2. POST: Crear un nuevo producto con su foto en Base64
export const crearProducto = async (req: Request, res: Response): Promise<void> => {
  try {
    const { nombre, precio, categoria, fotoBase64, codigoBarras } = req.body;

    // Validación básica de campos requeridos
    if (!nombre || precio === undefined || !categoria || !fotoBase64) {
      res.status(400).json({ error: 'Todos los campos son obligatorios' });
      return;
    }

    const nuevoProducto = await prisma.producto.create({
      data: {
        nombre,
        precio: Number(precio),
        categoria,
        fotoBase64,
        codigoBarras,
      },
    });

    res.status(201).json(nuevoProducto);
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar el producto' });
  }
};

// 3. PUT: Editar un producto existente por su ID (precio, foto, etc.)
export const actualizarProducto = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { nombre, precio, categoria, fotoBase64 } = req.body;

    const productoActualizado = await prisma.producto.update({
      where: { id: Number(id) },
      data: {
        ...(nombre && { nombre }),
        ...(precio !== undefined && { precio: Number(precio) }),
        ...(categoria && { categoria }),
        ...(fotoBase64 && { fotoBase64 }),
      },
    });

    res.json(productoActualizado);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el producto o ID no encontrado' });
  }
};

// 4. DELETE: Borrar un producto defectuoso o no deseado por su ID
export const eliminarProducto = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    await prisma.producto.delete({
      where: { id: Number(id) },
    });

    res.json({ mensaje: 'Producto eliminado correctamente del inventario' });
  } catch (error) {
    res.status(500).json({ error: 'No se pudo eliminar el producto o el ID no existe' });
  }
};