// Importamos los productos desde la carpeta src que creaste
import { PRODUCTOS } from "../src/data";

export default function Home() {
  const WHATSAPP_NUMBER = "51934412076";
  const categorias = ["Celulares", "Audífonos", "Fundas", "Cargadores", "Cables"];

  return (
    <main className="bg-gray-50 min-h-screen">
      {/* HEADER (El que ya teníamos con tu color #000C45) */}
      <header className="bg-[#000C45] text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-24 flex items-center justify-between">
          
          {/* IZQUIERDA: Logo */}
          <div className="flex items-center">
            <img 
              src="/logo.png" 
              alt="Logo Tienda" 
              className="h-20 w-20 object-contain hover:scale-105 transition-transform cursor-pointer" 
            />
          </div>

          {/* CENTRO: Nombre del Catálogo */}
          <div className="hidden lg:block text-center">
            <h1 className="text-xl font-bold tracking-widest uppercase">
              DANITEL MULTISERVICIOS
            </h1>
            <p className="text-[10px] text-blue-300 tracking-[0.2em]">SOMOS TECNOLOGÍA A TU ALCANCE</p>
          </div>

          {/* DERECHA: Buscador y Redes */}
          <div className="flex items-center gap-6">
            
            {/* Buscador Estilizado */}
            <div className="relative hidden sm:block">
              <input 
                type="text" 
                placeholder="Buscar equipo..." 
                className="bg-white/10 border border-white/20 rounded-lg py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm text-white placeholder:text-gray-400 w-64"
              />
              <svg className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>

            {/* Redes Sociales e Email */}
            <div className="flex items-center gap-4">
              {/* Facebook */}
              <a href="https://web.facebook.com/?locale=es_LA&_rdc=1&_rdr#" target="_blank" className="hover:text-blue-400 transition-colors">
                <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              
              {/* Email */}
              <a href="mailto:danitellmultiservicio@gmail.com" className="hover:text-red-400 transition-colors">
                <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* SECCIONES POR CATEGORÍA */}
      <div className="max-w-7xl mx-auto py-10 px-4 space-y-12">
        {categorias.map((cat) => {
          const filtrados = PRODUCTOS.filter(p => p.categoria === cat);
          if (filtrados.length === 0) return null;

          return (
            <section key={cat}>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-slate-800 border-l-4 border-blue-600 pl-3">{cat}</h2>
                <span className="text-sm text-gray-400 italic text-right md:hidden text-xs">Desliza →</span>
              </div>
              
              {/* SLIDER CONTENEDOR */}
              <div className="flex overflow-x-auto gap-6 pb-6 scrollbar-hide snap-x shadow-inner p-2">
                {filtrados.map((prod) => (
                  <div key={prod.id} className="min-w-[280px] md:min-w-[300px] bg-white rounded-xl shadow-md snap-start border border-gray-100">
                    <img src={prod.imagen} alt={prod.nombre} className="w-full h-48 object-cover rounded-t-xl" />
                    <div className="p-4">
                      <h3 className="font-bold text-lg">{prod.nombre}</h3>
                      <p className="text-gray-500 text-sm h-10 line-clamp-2">{prod.desc}</p>
                      <div className="flex justify-between items-center mt-4">
                        <span className="text-xl font-black text-blue-700">{prod.precio}</span>
                        <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=Interés en: ${prod.nombre}`} className="bg-green-500 text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider">Pedir</a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {/* SECCIÓN SERVICIO TÉCNICO (Ancho completo) */}
      <section className="w-full bg-slate-900 text-white mt-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&q=80&w=1000" 
              alt="Servicio Técnico" 
              className="w-full h-[400px] object-cover opacity-80"
            />
          </div>
          <div className="w-full md:w-1/2 p-10 space-y-4 text-center md:text-left">
            <h2 className="text-4xl font-black text-blue-400 uppercase">Servicio Técnico Especializado</h2>
            <p className="text-gray-300 text-lg">
              Reparamos tu equipo en tiempo récord con repuestos de calidad garantizada.
            </p>
            <ul className="grid grid-cols-2 gap-4 py-4 text-sm font-medium">
              <li className="flex items-center gap-2">✅ Cambio de Pantallas</li>
              <li className="flex items-center gap-2">✅ Cambio de Baterías</li>
              <li className="flex items-center gap-2">✅ Microsoldadura</li>
              <li className="flex items-center gap-2">✅ Desbloqueos</li>
            </ul>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-xl">
              Consultar Reparación
            </button>
          </div>
        </div>
      </section>

      {/* Botón Flotante */}
      <a href={`https://wa.me/${WHATSAPP_NUMBER}`} className="fixed bottom-6 right-6 bg-green-500 p-4 rounded-full shadow-2xl z-50">
          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.588-5.946 0-6.556 5.332-11.888 11.888-11.888 3.176 0 6.165 1.236 8.407 3.483 2.245 2.247 3.48 5.234 3.48 8.405 0 6.556-5.332 11.888-11.888 11.888-2.001 0-3.96-.503-5.704-1.458l-6.29 1.679zm6.75-3.057c1.553.923 3.327 1.411 5.137 1.411 5.452 0 9.888-4.435 9.888-9.888 0-2.64-1.027-5.121-2.892-6.989-1.865-1.867-4.347-2.894-6.996-2.894-5.452 0-9.888 4.437-9.888 9.888 0 1.883.528 3.719 1.528 5.323l-.988 3.606 3.711-.951z"/></svg>
      </a>
    </main>
  );
}
