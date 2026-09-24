import { type Request, type Response, type NextFunction } from 'express';

export const validarProducto = (req: Request, res: Response, next: NextFunction): void => {
  const { nombre, precio, categoria, fotoBase64 } = req.body;

  // 1. Validar que el nombre exista y sea texto
  if (!nombre || typeof nombre !== 'string' || nombre.trim() === '') {
    res.status(400).json({ 
      error: 'Validación fallida: El campo "nombre" es obligatorio y debe ser un texto válido.' 
    });
    return;
  }

  // 2. Validar que el precio exista y sea un número válido
  if (precio === undefined || isNaN(Number(precio))) {
    res.status(400).json({ 
      error: 'Validación fallida: El campo "precio" es obligatorio y debe ser un valor numérico.' 
    });
    return;
  }

  // 3. Validar que la categoría exista y sea texto
  if (!categoria || typeof categoria !== 'string' || categoria.trim() === '') {
    res.status(400).json({ 
      error: 'Validación fallida: El campo "categoria" es obligatorio y debe ser un texto válido.' 
    });
    return;
  }

  // 4. Validar que la foto en Base64 exista y sea una cadena de texto
  if (!fotoBase64 || typeof fotoBase64 !== 'string' || fotoBase64.trim() === '') {
    res.status(400).json({ 
      error: 'Validación fallida: El campo "fotoBase64" es obligatorio y debe ser una cadena de texto.' 
    });
    return;
  }

  // Si todo es correcto, pasamos al siguiente eslabón (el controlador)
  next();
};