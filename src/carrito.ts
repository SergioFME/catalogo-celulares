export interface ItemCarrito {
  id: number;
  nombre: string;
  precio: number;
  cantidad: number;
  stock: number;
}

export const agregarAlCarrito = (
  carrito: ItemCarrito[],
  producto: any
) => {

  const existe = carrito.find(item => item.id === producto.id);

  if (existe) {
    if (existe.cantidad < producto.stock) {
      existe.cantidad += 1;
    }
  } else {
    if (producto.stock > 0) {
      carrito.push({
        id: producto.id,
        nombre: producto.nombre,
        precio: producto.precio,
        cantidad: 1,
        stock: producto.stock
      });
    }
  }

  return [...carrito];
};

export const calcularTotal = (carrito: ItemCarrito[]) => {
  return carrito.reduce((total, item) => {
    return total + item.precio * item.cantidad;
  }, 0);
};

export const getProductosPorCategoria = (
  productos: any[],
  categoria: string
) => {
  return productos.filter(
    producto => producto.categoria.toLowerCase() === categoria.toLowerCase()
  );
};

export const getProductosDisponiblesPorCategoria = (
  productos: any[],
  categoria: string
) => {
  return productos.filter(
    producto =>
      producto.categoria.toLowerCase() === categoria.toLowerCase() &&
      producto.stock > 0 &&
      producto.estado === "disponible"
  );
};