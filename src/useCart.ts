/**
 * useCart — Hook de carrito con:
 *  - Persistencia en localStorage (funciona en Vercel gratis, sin backend)
 *  - Sin duplicados: maneja cantidades
 *  - Control de stock dinámico
 *  - Estructura lista para reemplazar con llamadas a API en el futuro
 *
 * Para migrar a backend: reemplaza las funciones loadCart/saveCart
 * con fetch() a tu API (e.g. /api/cart) y elimina el localStorage.
 */

import { useState, useEffect } from "react";
import { Producto } from "./data";

// ── Tipos ──────────────────────────────────────────────────────────────────
export interface CartItem {
  id: string;          // id del producto
  nombre: string;
  imagen: string;
  precio: number;
  cantidad: number;
  stockMax: number;    // stock original del producto (límite de cantidad)
}

const CART_KEY = "danitel_cart";

// ── Helpers de persistencia (swappable por API en el futuro) ───────────────
function loadCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}

function saveCart(items: CartItem[]): void {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  } catch {
    // localStorage lleno o bloqueado — falla silenciosamente
  }
}

// ── Hook principal ─────────────────────────────────────────────────────────
export function useCart(stockMap: Record<string, number>) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Cargar del localStorage solo en cliente (evita hydration mismatch)
  useEffect(() => {
    setItems(loadCart());
    setHydrated(true);
  }, []);

  // Persistir cada vez que cambia el carrito
  useEffect(() => {
    if (hydrated) saveCart(items);
  }, [items, hydrated]);

  /** Unidades ya en el carrito para un producto */
  const cantidadEnCarrito = (id: string): number =>
    items.find((i) => i.id === id)?.cantidad ?? 0;

  /** Stock disponible real = stock original − unidades en carrito */
  const stockDisponible = (id: string): number =>
    Math.max(0, (stockMap[id] ?? 0) - cantidadEnCarrito(id));

  /** Agregar 1 unidad — no supera el stock */
  const addToCart = (prod: Producto): boolean => {
    const disp = stockDisponible(prod.id);
    if (disp <= 0) return false; // stock agotado

    setItems((prev) => {
      const existe = prev.find((i) => i.id === prod.id);
      if (existe) {
        return prev.map((i) =>
          i.id === prod.id ? { ...i, cantidad: i.cantidad + 1 } : i
        );
      }
      return [
        ...prev,
        {
          id: prod.id,
          nombre: prod.nombre,
          imagen: prod.imagen,
          precio: prod.precio,
          cantidad: 1,
          stockMax: prod.stock,
        },
      ];
    });
    return true;
  };

  /** Restar 1 unidad — elimina si llega a 0 */
  const decreaseQty = (id: string) => {
    setItems((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, cantidad: i.cantidad - 1 } : i))
        .filter((i) => i.cantidad > 0)
    );
  };

  /** Eliminar producto completo del carrito */
  const removeFromCart = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  /** Vaciar carrito */
  const clearCart = () => setItems([]);

  const totalItems   = items.reduce((s, i) => s + i.cantidad, 0);
  const totalPrecio  = items.reduce((s, i) => s + i.precio * i.cantidad, 0);

  return {
    items,
    hydrated,
    addToCart,
    decreaseQty,
    removeFromCart,
    clearCart,
    cantidadEnCarrito,
    stockDisponible,
    totalItems,
    totalPrecio,
  };
}