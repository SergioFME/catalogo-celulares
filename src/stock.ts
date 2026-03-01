export interface ItemCarrito {
  id: number;
  nombre: string;
  precio: number;
  cantidad: number;
  stock: number;
}

export const actualizarStock = (productos: any[], carrito: ItemCarrito[]) => {

  carrito.forEach(item => {
    const producto = productos.find(p => p.id === item.id);
    if (producto) {
      producto.stock -= item.cantidad;

      if (producto.stock <= 0) {
        producto.estado = "agotado";
      }
    }
  });

  return [...productos];
};

