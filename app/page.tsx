"use client";
import { useState, useEffect, useRef } from "react";
import { PRODUCTOS, Producto } from "../src/data";
import { useCart, CartItem } from "../src/useCart";

// ─── CONTACTO ────────────────────────────────────────────────────────────────
const WA1    = "51973979387";
const WA2    = "51928319513";
const EMAIL  = "multiserviciodanitel@gmail.com";
const DIR    = "Jr. Río Buin s/n, Centro de Carhuaz";
const CIUDAD = "Carhuaz · Ancash · Perú";

const CATS_SLIDER  = ["Celulares", "Audífonos", "Cables", "Cables PD", "Cargadores"];
const CATS_SPECIAL = ["Fundas", "Micas"];

// Stock inicial como mapa id→stock (fuente de verdad)
const STOCK_INICIAL: Record<string, number> = Object.fromEntries(
  PRODUCTOS.map((p) => [p.id, p.stock])
);

function formatPrecio(n: number): string {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// ─── BADGE ESTADO DINÁMICO ───────────────────────────────────────────────────
function EstadoBadge({ stockDisp }: { stockDisp: number }) {
  if (stockDisp === 0)
    return <span className="text-[10px] font-bold uppercase text-red-500 bg-red-50 px-2 py-0.5 rounded-full border border-red-200">Agotado</span>;
  if (stockDisp <= 3)
    return <span className="text-[10px] font-bold uppercase text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">Pocas unidades</span>;
  return <span className="text-[10px] font-bold uppercase text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">Disponible</span>;
}

// ─── LIGHTBOX ────────────────────────────────────────────────────────────────
function Lightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4" onClick={onClose}>
      <button onClick={onClose}
        className="absolute top-4 right-4 text-white bg-white/20 hover:bg-white/40 rounded-full w-10 h-10 flex items-center justify-center text-xl font-bold transition-colors z-10">
        ✕
      </button>
      <img src={src} alt={alt}
        className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl"
        onClick={(e) => e.stopPropagation()} />
    </div>
  );
}

// ─── BOTÓN AGREGAR AL CARRITO con control de stock ────────────────────────────
function AddToCartBtn({
  prod,
  stockDisp,
  cantEnCarrito,
  onAdd,
  size = "normal",
}: {
  prod: Producto;
  stockDisp: number;
  cantEnCarrito: number;
  onAdd: (p: Producto) => void;
  size?: "normal" | "small";
}) {
  const agotado = stockDisp === 0;
  const base = size === "small"
    ? "px-3 py-2 text-xs rounded-lg"
    : "px-3 py-2 text-xs rounded-lg";

  return (
    <button
      onClick={() => !agotado && onAdd(prod)}
      disabled={agotado}
      title={agotado ? "Sin stock disponible" : "Agregar al carrito"}
      className={`${base} font-bold transition-all relative ${
        agotado
          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
          : "bg-[#000C45] hover:bg-blue-900 text-white"
      }`}
    >
      {agotado ? "✕" : "🛒"}
      {cantEnCarrito > 0 && !agotado && (
        <span className="absolute -top-1.5 -right-1.5 bg-green-500 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">
          {cantEnCarrito}
        </span>
      )}
    </button>
  );
}

// ─── TARJETA SLIDER ──────────────────────────────────────────────────────────
function SliderCard({ prod, stockDisp, cantEnCarrito, onAddCart, onZoom }: {
  prod: Producto;
  stockDisp: number;
  cantEnCarrito: number;
  onAddCart: (p: Producto) => void;
  onZoom: (p: Producto) => void;
}) {
  const agotado = stockDisp === 0;
  return (
    <div className={`min-w-[260px] md:min-w-[285px] bg-white rounded-2xl shadow-md snap-start border flex flex-col overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ${agotado ? "border-red-100 opacity-75" : "border-gray-100"}`}>
      <div className="relative overflow-hidden h-44 group">
        <img src={prod.imagen} alt={prod.nombre}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-125 cursor-zoom-in"
          onClick={() => onZoom(prod)} />
        <div className="absolute top-2 left-2"><EstadoBadge stockDisp={stockDisp} /></div>
        {!agotado && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <span className="bg-black/50 text-white text-xs px-3 py-1.5 rounded-full font-semibold backdrop-blur-sm">🔍 Clic para ampliar</span>
          </div>
        )}
        {agotado && (
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <span className="bg-red-600 text-white text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider">Sin stock</span>
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-bold text-[14px] text-slate-800 leading-tight">{prod.nombre}</h3>
        <p className="text-gray-400 text-xs mt-1 mb-3 line-clamp-2 flex-1">{prod.desc}</p>
        <div className="flex justify-between items-center mt-auto">
          <span className={`text-xl font-black ${agotado ? "text-gray-400" : "text-[#000C45]"}`}>
            S/ {formatPrecio(prod.precio)}
          </span>
          <div className="flex gap-2">
            <AddToCartBtn prod={prod} stockDisp={stockDisp} cantEnCarrito={cantEnCarrito} onAdd={onAddCart} />
            <a href={`https://wa.me/${WA1}?text=Hola, me interesa: ${prod.nombre} (S/ ${prod.precio})`}
              target="_blank" rel="noreferrer"
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors ${agotado ? "bg-gray-300 text-gray-500 pointer-events-none" : "bg-green-500 hover:bg-green-600 text-white"}`}>
              Pedir
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── SECCIÓN ESPECIAL: Lista + Slider imágenes ────────────────────────────────
function SpecialSection({ cat, stockDisponible, cantidadEnCarrito, onAddCart, onZoom }: {
  cat: string;
  stockDisponible: (id: string) => number;
  cantidadEnCarrito: (id: string) => number;
  onAddCart: (p: Producto) => void;
  onZoom: (p: Producto) => void;
}) {
  const items = PRODUCTOS.filter((p) => p.categoria === cat);
  const [selected, setSelected] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sliderRef.current) return;
    const container = sliderRef.current;
    const activeCard = container.children[selected] as HTMLElement;
    if (!activeCard) return;
    const containerCenter = container.offsetWidth / 2;
    const cardCenter = activeCard.offsetLeft + activeCard.offsetWidth / 2;
    container.scrollTo({ left: cardCenter - containerCenter, behavior: "smooth" });
  }, [selected]);

  const prod = items[selected];
  const stockDisp = stockDisponible(prod.id);
  const cantEnC   = cantidadEnCarrito(prod.id);
  const agotado   = stockDisp === 0;

  return (
    <section>
      <div className="mb-5">
        <h2 className="text-2xl font-black text-slate-800 border-l-4 border-[#000C45] pl-3">{cat}</h2>
        <p className="text-xs text-gray-400 pl-3 mt-0.5">{items.length} modelos · <span className="italic">Selecciona para ver detalles</span></p>
      </div>

      <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden flex flex-col md:flex-row">
        {/* Lista */}
        <div className="w-full md:w-[35%] flex flex-col border-b md:border-b-0 md:border-r border-gray-100" style={{ maxHeight: "370px" }}>
          <div className="px-4 py-2.5 bg-gray-50 border-b border-gray-100 flex-shrink-0">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Modelos</p>
          </div>
          <div className="overflow-y-auto flex-1 divide-y divide-gray-50">
            {items.map((item, idx) => {
              const sd = stockDisponible(item.id);
              return (
                <button key={item.id} onClick={() => setSelected(idx)}
                  className={`w-full text-left px-4 py-3 transition-all duration-200 flex items-center justify-between gap-3 ${
                    selected === idx ? "bg-[#000C45]" : "hover:bg-blue-50"
                  }`}>
                  <div className="flex-1 min-w-0">
                    <p className={`font-bold text-sm truncate ${selected === idx ? "text-white" : "text-slate-800"}`}>{item.nombre}</p>
                    <p className={`text-xs truncate mt-0.5 ${selected === idx ? "text-blue-200" : "text-gray-400"}`}>{item.desc}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1 flex-shrink-0">
                    <span className={`text-sm font-black ${selected === idx ? "text-white" : sd === 0 ? "text-gray-400" : "text-[#000C45]"}`}>
                      S/ {item.precio}
                    </span>
                    {selected !== idx && <EstadoBadge stockDisp={sd} />}
                    {selected === idx && <span className="text-[9px] text-blue-200">✓ seleccionado</span>}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Slider */}
        <div className="w-full md:w-[65%] flex flex-col">
          <div ref={sliderRef}
            className="flex overflow-x-auto gap-4 px-4 py-4 scrollbar-hide snap-x snap-mandatory"
            style={{ minHeight: "200px" }}>
            {items.map((item, idx) => {
              const sd = stockDisponible(item.id);
              return (
                <div key={item.id} onClick={() => setSelected(idx)}
                  className={`flex-shrink-0 snap-center cursor-pointer rounded-xl overflow-hidden transition-all duration-300 ${
                    selected === idx
                      ? "ring-4 ring-[#000C45] ring-offset-2 scale-100 shadow-xl"
                      : "ring-2 ring-gray-200 scale-95 opacity-60 hover:opacity-85 hover:scale-[0.97]"
                  }`}
                  style={{ width: "160px", height: "180px" }}>
                  <div className="relative w-full h-full group">
                    <img src={item.imagen} alt={item.nombre}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    {sd === 0 && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <span className="bg-red-600 text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase">Sin stock</span>
                      </div>
                    )}
                    <div className={`absolute inset-0 flex flex-col justify-end p-2 ${
                      selected === idx ? "bg-gradient-to-t from-[#000C45]/80 to-transparent" : "bg-gradient-to-t from-black/50 to-transparent"
                    }`}>
                      <p className="text-white text-[10px] font-bold leading-tight line-clamp-2">{item.nombre}</p>
                      <p className={`text-xs font-black mt-0.5 ${selected === idx ? "text-blue-200" : "text-white"}`}>S/ {item.precio}</p>
                    </div>
                    <button onClick={(e) => { e.stopPropagation(); onZoom(item); }}
                      className="absolute top-2 right-2 bg-black/40 hover:bg-black/70 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                      🔍
                    </button>
                    {selected === idx && (
                      <div className="absolute top-2 left-2">
                        <span className="text-[9px] font-black uppercase bg-[#000C45] text-white px-1.5 py-0.5 rounded-full">✓ Selec.</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Info + botones */}
          <div className="px-4 pb-4 pt-2 border-t border-gray-100 bg-gray-50 flex-shrink-0">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <h3 className="font-black text-base text-slate-800 leading-tight">{prod.nombre}</h3>
                  <EstadoBadge stockDisp={stockDisp} />
                </div>
                <p className="text-gray-500 text-xs">{prod.desc}</p>
              </div>
              <span className={`text-2xl font-black flex-shrink-0 ${agotado ? "text-gray-400" : "text-[#000C45]"}`}>
                S/ {prod.precio}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              <AddToCartBtn prod={prod} stockDisp={stockDisp} cantEnCarrito={cantEnC} onAdd={onAddCart} />
              <a href={`https://wa.me/${WA1}?text=Hola, me interesa: ${prod.nombre} (S/ ${prod.precio})`}
                target="_blank" rel="noreferrer"
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-colors ${agotado ? "bg-gray-300 text-gray-500 pointer-events-none" : "bg-green-500 hover:bg-green-600 text-white"}`}>
                Pedir por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── COMPONENTE PRINCIPAL ─────────────────────────────────────────────────────
export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showCart, setShowCart]       = useState(false);
  const [showLogin, setShowLogin]     = useState(false);
  const [isRegistro, setIsRegistro]   = useState(false);
  const [lightbox, setLightbox]       = useState<Producto | null>(null);
  const [year, setYear]               = useState("2025");

  // ── Sesión simulada ────────────────────────────────────────────────────────
  const [usuario, setUsuario]           = useState<string | null>(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [loginUser, setLoginUser]       = useState("");
  const [loginPass, setLoginPass]       = useState("");
  const [regUser, setRegUser]           = useState("");
  const [regEmail, setRegEmail]         = useState("");
  const [regPass, setRegPass]           = useState("");
  const [loginError, setLoginError]     = useState("");

  // ── Carrito ────────────────────────────────────────────────────────────────
  const cart = useCart(STOCK_INICIAL);

  useEffect(() => { setYear(String(new Date().getFullYear())); }, []);

  const handleLogin = () => {
    if (!loginUser.trim() || !loginPass.trim()) { setLoginError("Completa todos los campos."); return; }
    setUsuario(loginUser.trim());
    setShowLogin(false); setLoginUser(""); setLoginPass(""); setLoginError("");
  };
  const handleRegistro = () => {
    if (!regUser.trim() || !regEmail.trim() || !regPass.trim()) { setLoginError("Completa todos los campos."); return; }
    setUsuario(regUser.trim());
    setShowLogin(false); setRegUser(""); setRegEmail(""); setRegPass(""); setLoginError("");
  };
  const handleLogout = () => { setUsuario(null); setUserMenuOpen(false); };

  const initials = usuario ? usuario.slice(0, 2).toUpperCase() : "";

  const filteredProducts = searchQuery.trim()
    ? PRODUCTOS.filter((p) =>
        p.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.categoria.toLowerCase().includes(searchQuery.toLowerCase()))
    : null;

  return (
    <main className="bg-gray-50 min-h-screen">
      {lightbox && <Lightbox src={lightbox.imagen} alt={lightbox.nombre} onClose={() => setLightbox(null)} />}

      {/* ══ HEADER ══ */}
      <header className="bg-[#000C45] text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between gap-4">
          <img src="/logo.png" alt="Danitel" className="h-14 w-14 object-contain hover:scale-105 transition-transform cursor-pointer flex-shrink-0" />
          <div className="hidden lg:block text-center flex-shrink-0">
            <h1 className="text-lg font-black tracking-widest uppercase">DANITEL MULTISERVICIO</h1>
            <p className="text-[10px] text-blue-300 tracking-[0.2em]">SOMOS TECNOLOGÍA A TU ALCANCE</p>
          </div>
          <div className="relative flex-1 max-w-xs hidden sm:block">
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar producto..."
              className="bg-white/10 border border-white/20 rounded-xl py-2 px-4 pl-9 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm text-white placeholder:text-gray-400 w-full" />
            <svg className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <a href="https://web.facebook.com/" target="_blank" rel="noreferrer" className="hover:text-blue-400 transition-colors hidden sm:block">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a href={`mailto:${EMAIL}`} className="hover:text-red-400 transition-colors hidden sm:block">
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>

            {/* Usuario */}
            {usuario ? (
              <div className="relative">
                <button onClick={() => setUserMenuOpen((v) => !v)}
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/20 rounded-full px-3 py-1.5 transition-colors">
                  <span className="w-7 h-7 rounded-full bg-blue-400 flex items-center justify-center text-xs font-black text-[#000C45]">{initials}</span>
                  <span className="text-sm font-semibold hidden sm:block">{usuario}</span>
                  <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 top-12 bg-white text-slate-800 rounded-xl shadow-2xl w-44 overflow-hidden z-50 border border-gray-100">
                    <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
                      <p className="text-xs text-gray-500">Conectado como</p>
                      <p className="font-black text-sm text-[#000C45] truncate">{usuario}</p>
                    </div>
                    <button onClick={handleLogout}
                      className="w-full text-left px-4 py-3 text-sm hover:bg-red-50 hover:text-red-600 transition-colors flex items-center gap-2">
                      <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Cerrar sesión
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button onClick={() => { setIsRegistro(false); setShowLogin(true); setLoginError(""); }}
                className="hover:text-blue-300 transition-colors" title="Iniciar sesión">
                <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
            )}

            {/* Carrito */}
            <button onClick={() => setShowCart(true)} className="relative hover:text-blue-300 transition-colors">
              <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.6 8h13.2M10 21a1 1 0 100-2 1 1 0 000 2zm7 0a1 1 0 100-2 1 1 0 000 2z" />
              </svg>
              {cart.hydrated && cart.totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center">
                  {cart.totalItems}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Buscador mobile */}
        <div className="sm:hidden px-4 pb-3">
          <div className="relative">
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar producto..."
              className="bg-white/10 border border-white/20 rounded-xl py-2 px-4 pl-9 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm text-white placeholder:text-gray-400 w-full" />
            <svg className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </header>

      {/* ══ BÚSQUEDA ══ */}
      {filteredProducts && (
        <div className="max-w-7xl mx-auto px-4 pt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-slate-700">
              {filteredProducts.length > 0 ? `${filteredProducts.length} resultado(s) para "${searchQuery}"` : `Sin resultados para "${searchQuery}"`}
            </h2>
            <button onClick={() => setSearchQuery("")} className="text-sm text-blue-600 hover:underline">Limpiar</button>
          </div>
          <div className="flex flex-wrap gap-5 pb-8">
            {filteredProducts.map((prod) => (
              <SliderCard key={prod.id} prod={prod}
                stockDisp={cart.stockDisponible(prod.id)}
                cantEnCarrito={cart.cantidadEnCarrito(prod.id)}
                onAddCart={cart.addToCart} onZoom={setLightbox} />
            ))}
          </div>
          <hr className="my-4 border-gray-200" />
        </div>
      )}

      {/* ══ CATEGORÍAS ══ */}
      <div className="max-w-7xl mx-auto py-10 px-4 space-y-14">
        {CATS_SLIDER.map((cat) => {
          const items = PRODUCTOS.filter((p) => p.categoria === cat);
          if (!items.length) return null;
          return (
            <section key={cat}>
              <div className="flex justify-between items-end mb-5">
                <div>
                  <h2 className="text-2xl font-black text-slate-800 border-l-4 border-[#000C45] pl-3">{cat}</h2>
                  <p className="text-xs text-gray-400 pl-3 mt-0.5">{items.length} productos</p>
                </div>
                <span className="text-xs text-gray-400 italic md:hidden">Desliza →</span>
              </div>
              <div className="flex overflow-x-auto gap-5 pb-4 scrollbar-hide snap-x">
                {items.map((prod) => (
                  <SliderCard key={prod.id} prod={prod}
                    stockDisp={cart.stockDisponible(prod.id)}
                    cantEnCarrito={cart.cantidadEnCarrito(prod.id)}
                    onAddCart={cart.addToCart} onZoom={setLightbox} />
                ))}
              </div>
            </section>
          );
        })}

        {CATS_SPECIAL.map((cat) => (
          <SpecialSection key={cat} cat={cat}
            stockDisponible={cart.stockDisponible}
            cantidadEnCarrito={cart.cantidadEnCarrito}
            onAddCart={cart.addToCart} onZoom={setLightbox} />
        ))}
      </div>

      {/* ══ SERVICIO TÉCNICO ══ */}
      <section className="w-full bg-[#000C45] text-white mt-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-stretch">
          <div className="w-full md:w-1/2">
            <img src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&q=80&w=1000"
              alt="Servicio Técnico" className="w-full h-[360px] object-cover opacity-70" />
          </div>
          <div className="w-full md:w-1/2 p-10 flex flex-col justify-center space-y-5 text-center md:text-left">
            <p className="text-blue-400 text-xs font-bold uppercase tracking-[0.3em]">Especialistas certificados</p>
            <h2 className="text-3xl md:text-4xl font-black uppercase leading-tight">
              Servicio Técnico<br /><span className="text-blue-400">Especializado</span>
            </h2>
            <p className="text-gray-300 text-base">Reparamos tu equipo en tiempo récord con repuestos de calidad garantizada. Diagnóstico gratuito en tienda.</p>
            <ul className="grid grid-cols-2 gap-3 py-2 text-sm font-medium text-gray-200">
              <li>✅ Cambio de Pantallas</li><li>✅ Cambio de Baterías</li>
              <li>✅ Microsoldadura</li><li>✅ Desbloqueos</li>
            </ul>
            <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
              <a href={`https://wa.me/${WA1}?text=Hola, quiero consultar por una reparación`} target="_blank" rel="noreferrer"
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-bold text-sm text-center transition-all">WhatsApp</a>
              <a href={`mailto:${EMAIL}?subject=Consulta%20Servicio%20T%C3%A9cnico`}
                className="border border-white/30 hover:bg-white/10 text-white px-6 py-3 rounded-full font-bold text-sm text-center transition-all">Email</a>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer className="bg-slate-900 text-gray-400 py-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-center md:items-start">
            <div className="flex items-center justify-center md:justify-start">
              <img src="/logo.png" alt="Danitel" className="object-contain w-full" style={{ maxWidth: "200px", maxHeight: "140px" }} />
            </div>
            <div className="flex flex-col justify-center text-center md:text-left">
              <p className="font-black text-white text-xl leading-snug">DANITEL<br />MULTISERVICIO</p>
              <p className="text-xs mt-2 text-gray-500 leading-relaxed">Somos tecnología<br />a tu alcance</p>
            </div>
            <div>
              <p className="font-bold text-white uppercase tracking-wider text-xs mb-4">Contacto</p>
              <div className="space-y-3">
                {[{ num: WA1, label: "973 979 387" }, { num: WA2, label: "928 319 513" }].map(({ num, label }) => (
                  <a key={num} href={`https://wa.me/${num}`} target="_blank" rel="noreferrer"
                    className="flex items-center gap-3 hover:text-white transition-colors group">
                    <span className="w-8 h-8 rounded-full bg-green-500/20 group-hover:bg-green-500/40 flex items-center justify-center flex-shrink-0 transition-colors">
                      <svg width="15" height="15" fill="#22c55e" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.588-5.946 0-6.556 5.332-11.888 11.888-11.888 3.176 0 6.165 1.236 8.407 3.483 2.245 2.247 3.48 5.234 3.48 8.405 0 6.556-5.332 11.888-11.888 11.888-2.001 0-3.96-.503-5.704-1.458l-6.29 1.679zm6.75-3.057c1.553.923 3.327 1.411 5.137 1.411 5.452 0 9.888-4.435 9.888-9.888 0-2.64-1.027-5.121-2.892-6.989-1.865-1.867-4.347-2.894-6.996-2.894-5.452 0-9.888 4.437-9.888 9.888 0 1.883.528 3.719 1.528 5.323l-.988 3.606 3.711-.951z"/>
                      </svg>
                    </span>
                    <span className="text-sm">{label}</span>
                  </a>
                ))}
                <a href={`mailto:${EMAIL}`} className="flex items-center gap-3 hover:text-white transition-colors group">
                  <span className="w-8 h-8 rounded-full bg-red-500/20 group-hover:bg-red-500/40 flex items-center justify-center flex-shrink-0 transition-colors">
                    <svg width="15" height="13" viewBox="0 0 20 16" fill="none">
                      <rect x="0.5" y="0.5" width="19" height="15" rx="2" fill="#7f1d1d" stroke="#f87171" strokeWidth="1"/>
                      <path d="M1 1.5l9 6 9-6" stroke="#f87171" strokeWidth="1.2" strokeLinecap="round"/>
                    </svg>
                  </span>
                  <span className="text-sm break-all">{EMAIL}</span>
                </a>
              </div>
            </div>
            <div>
              <p className="font-bold text-white uppercase tracking-wider text-xs mb-4">Ubicación y Horario</p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg width="15" height="15" fill="none" stroke="#60a5fa" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                  </span>
                  <div className="text-sm"><p>{DIR}</p><p className="text-gray-500 mt-0.5">{CIUDAD}</p></div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center flex-shrink-0">
                    <svg width="15" height="15" fill="none" stroke="#fbbf24" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </span>
                  <div className="text-sm">
                    <p className="text-white font-semibold">Lunes a Domingo</p>
                    <p className="text-gray-400">8:00 am – 8:00 pm</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center text-xs text-gray-600 mt-8 border-t border-slate-800 pt-5">
            © {year} Danitel Multiservicio · Todos los derechos reservados
          </div>
        </div>
      </footer>

      {/* ══ WHATSAPP FLOTANTE ══ */}
      <a href={`https://wa.me/${WA1}`} target="_blank" rel="noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 p-4 rounded-full shadow-2xl z-50 transition-transform hover:scale-110">
        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.588-5.946 0-6.556 5.332-11.888 11.888-11.888 3.176 0 6.165 1.236 8.407 3.483 2.245 2.247 3.48 5.234 3.48 8.405 0 6.556-5.332 11.888-11.888 11.888-2.001 0-3.96-.503-5.704-1.458l-6.29 1.679zm6.75-3.057c1.553.923 3.327 1.411 5.137 1.411 5.452 0 9.888-4.435 9.888-9.888 0-2.64-1.027-5.121-2.892-6.989-1.865-1.867-4.347-2.894-6.996-2.894-5.452 0-9.888 4.437-9.888 9.888 0 1.883.528 3.719 1.528 5.323l-.988 3.606 3.711-.951z"/>
        </svg>
      </a>

      {/* ══ MODAL CARRITO ══ */}
      {showCart && (
        <div className="fixed inset-0 z-[60] flex justify-end">
          <div className="flex-1 bg-black/50 backdrop-blur-sm" onClick={() => setShowCart(false)} />
          <div className="bg-white w-full max-w-sm h-full flex flex-col shadow-2xl">
            {/* Header carrito */}
            <div className="bg-[#000C45] text-white px-6 py-4 flex justify-between items-center flex-shrink-0">
              <div>
                <h2 className="font-black text-lg">Mi Carrito</h2>
                <p className="text-blue-300 text-xs">
                  {cart.totalItems} producto(s) · {cart.items.length} tipo(s)
                </p>
              </div>
              <div className="flex items-center gap-3">
                {cart.items.length > 0 && (
                  <button onClick={cart.clearCart}
                    className="text-xs text-red-300 hover:text-red-200 transition-colors underline">
                    Vaciar
                  </button>
                )}
                <button onClick={() => setShowCart(false)} className="text-xl font-bold hover:text-gray-300">✕</button>
              </div>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {cart.items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-3 text-center">
                  <svg width="48" height="48" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="opacity-30">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.6 8h13.2M10 21a1 1 0 100-2 1 1 0 000 2zm7 0a1 1 0 100-2 1 1 0 000 2z" />
                  </svg>
                  <p className="text-sm">Tu carrito está vacío.<br />Agrega productos para armar tu pedido.</p>
                </div>
              ) : (
                cart.items.map((item: CartItem) => (
                  <div key={item.id} className="flex items-center gap-3 bg-gray-50 rounded-xl p-3">
                    <img src={item.imagen} alt={item.nombre} className="w-14 h-14 object-cover rounded-lg flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-slate-800 truncate">{item.nombre}</p>
                      <p className="text-[#000C45] font-black text-sm">
                        S/ {formatPrecio(item.precio * item.cantidad)}
                      </p>
                      <p className="text-gray-400 text-xs">S/ {item.precio} c/u</p>
                    </div>

                    {/* Controles de cantidad */}
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <button onClick={() => cart.decreaseQty(item.id)}
                        className="w-7 h-7 rounded-lg bg-gray-200 hover:bg-red-100 hover:text-red-600 font-black text-sm flex items-center justify-center transition-colors">
                        −
                      </button>
                      <span className="w-7 text-center font-black text-sm text-slate-800">{item.cantidad}</span>
                      <button
                        onClick={() => cart.addToCart(PRODUCTOS.find((p) => p.id === item.id)!)}
                        disabled={cart.stockDisponible(item.id) === 0}
                        className="w-7 h-7 rounded-lg bg-gray-200 hover:bg-green-100 hover:text-green-700 font-black text-sm flex items-center justify-center transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
                        +
                      </button>
                    </div>

                    <button onClick={() => cart.removeFromCart(item.id)}
                      className="text-red-400 hover:text-red-600 ml-1 text-lg flex-shrink-0">✕</button>
                  </div>
                ))
              )}
            </div>

            {/* Footer carrito */}
            {cart.items.length > 0 && (
              <div className="border-t border-gray-200 px-5 py-5 flex-shrink-0 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">Total:</span>
                  <span className="text-2xl font-black text-[#000C45]">S/ {formatPrecio(cart.totalPrecio)}</span>
                </div>
                <p className="text-xs text-gray-400 text-center">El pedido se confirma vía WhatsApp o Email</p>
                <a href={`https://wa.me/${WA1}?text=Hola! Quiero pedir:%0A${cart.items.map((i: CartItem) => `- ${i.nombre} x${i.cantidad} = S/ ${i.precio * i.cantidad}`).join("%0A")}%0A%0ATotal: S/ ${cart.totalPrecio}`}
                  target="_blank" rel="noreferrer"
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center transition-colors">
                  Enviar pedido por WhatsApp
                </a>
                <a href={`mailto:${EMAIL}?subject=Pedido%20Danitel&body=${cart.items.map((i: CartItem) => `- ${i.nombre} x${i.cantidad} = S/ ${i.precio * i.cantidad}`).join("%0A")}%0A%0ATotal: S/ ${cart.totalPrecio}`}
                  className="w-full border border-[#000C45] text-[#000C45] hover:bg-blue-50 py-3 rounded-xl font-bold text-sm flex items-center justify-center transition-colors">
                  Enviar pedido por Email
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ══ MODAL LOGIN / REGISTRO ══ */}
      {showLogin && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
          onClick={(e) => { if (e.target === e.currentTarget) { setShowLogin(false); setLoginError(""); } }}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden">
            <div className="bg-[#000C45] text-white px-6 py-5 text-center">
              <img src="/logo.png" alt="Logo" className="h-14 w-14 object-contain mx-auto mb-2" />
              <h2 className="font-black text-lg tracking-wide">DANITEL MULTISERVICIO</h2>
              <div className="flex mt-4 bg-white/10 rounded-xl p-1">
                <button onClick={() => { setIsRegistro(false); setLoginError(""); }}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-colors ${!isRegistro ? "bg-white text-[#000C45]" : "text-blue-200 hover:text-white"}`}>
                  Iniciar Sesión
                </button>
                <button onClick={() => { setIsRegistro(true); setLoginError(""); }}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-colors ${isRegistro ? "bg-white text-[#000C45]" : "text-blue-200 hover:text-white"}`}>
                  Registrarse
                </button>
              </div>
            </div>
            <div className="px-6 py-6 space-y-4">
              {isRegistro ? (
                <>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">Nombre de usuario</label>
                    <input type="text" value={regUser} onChange={(e) => setRegUser(e.target.value)} placeholder="ej. juan_perez"
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#000C45] text-slate-800" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">Correo electrónico</label>
                    <input type="email" value={regEmail} onChange={(e) => setRegEmail(e.target.value)} placeholder="tucorreo@email.com"
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#000C45] text-slate-800" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">Contraseña</label>
                    <input type="password" value={regPass} onChange={(e) => setRegPass(e.target.value)} placeholder="••••••••"
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#000C45] text-slate-800" />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">Nombre de usuario</label>
                    <input type="text" value={loginUser} onChange={(e) => setLoginUser(e.target.value)} placeholder="ej. juan_perez"
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#000C45] text-slate-800" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">Contraseña</label>
                    <input type="password" value={loginPass} onChange={(e) => setLoginPass(e.target.value)} placeholder="••••••••"
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#000C45] text-slate-800" />
                  </div>
                </>
              )}
              {loginError && <p className="text-red-500 text-xs font-medium">{loginError}</p>}
              <button onClick={isRegistro ? handleRegistro : handleLogin}
                className="w-full bg-[#000C45] hover:bg-blue-900 text-white py-3 rounded-xl font-bold text-sm transition-colors">
                {isRegistro ? "Crear cuenta" : "Iniciar Sesión"}
              </button>
            </div>
            <div className="px-6 pb-5">
              <button onClick={() => { setShowLogin(false); setLoginError(""); }}
                className="w-full text-center text-xs text-gray-400 hover:text-gray-600 transition-colors">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
