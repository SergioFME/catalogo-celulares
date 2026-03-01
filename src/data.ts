export type EstadoProducto = "disponible" | "pocas unidades" | "agotado" | "reservado" | "pedido";

export interface Producto {
  id: string;
  nombre: string;
  categoria: string;
  precio: number;
  imagen: string;
  desc: string;
  stock: number;
  estado: EstadoProducto;
}
 


export const PRODUCTOS: Producto[] = [
  // ================= CELULARES =================
  { id: "cel001", nombre: "Galaxy A16 128GB 4 RAM",              categoria: "Celulares",  precio: 689,  imagen: "/a16.jpg",                desc: "Pantalla AMOLED",            stock: 5,  estado: "disponible"     },
  { id: "cel002", nombre: "Honor X5C 128GB",                     categoria: "Celulares",  precio: 499,  imagen: "/honor-x5c.jpg",          desc: "128GB almacenamiento",       stock: 4,  estado: "disponible"     },
  { id: "cel003", nombre: "HONOR X6C",                           categoria: "Celulares",  precio: 659,  imagen: "/honor-x6c.jpg",          desc: "Rendimiento equilibrado",    stock: 6,  estado: "disponible"     },
  { id: "cel004", nombre: "HONOR X7C",                           categoria: "Celulares",  precio: 899,  imagen: "/honor-x7c.jpg",          desc: "Gran batería",               stock: 3,  estado: "pocas unidades" },
  { id: "cel005", nombre: "HONOR X8C",                           categoria: "Celulares",  precio: 989,  imagen: "/honor-x8c.jpg",          desc: "Diseño premium",             stock: 4,  estado: "disponible"     },
  { id: "cel006", nombre: "HONOR 400 LITE 5G",                   categoria: "Celulares",  precio: 1189, imagen: "/honor-400lite.jpg",      desc: "Conectividad 5G",            stock: 2,  estado: "pocas unidades" },
  { id: "cel007", nombre: "Sam A36 5G",                          categoria: "Celulares",  precio: 1299, imagen: "/sam-a36.jpg",            desc: "Velocidad 5G",               stock: 5,  estado: "disponible"     },
  { id: "cel008", nombre: "Redmi 9A",                            categoria: "Celulares",  precio: 459,  imagen: "/redmi-9a.jpg",           desc: "Económico y funcional",      stock: 8,  estado: "disponible"     },
  { id: "cel009", nombre: "REDMI A5",                            categoria: "Celulares",  precio: 499,  imagen: "/redmi-a5.jpg",           desc: "Buen rendimiento",           stock: 6,  estado: "disponible"     },
  { id: "cel010", nombre: "REDMI NOTE 14",                       categoria: "Celulares",  precio: 859,  imagen: "/redmi-note14.jpg",       desc: "Cámara potente",             stock: 4,  estado: "disponible"     },
  { id: "cel011", nombre: "ZTE BLADE A35e",                      categoria: "Celulares",  precio: 359,  imagen: "/zte-a35e.jpg",           desc: "Accesible y práctico",       stock: 7,  estado: "disponible"     },
  { id: "cel012", nombre: "Moto e14",                            categoria: "Celulares",  precio: 459,  imagen: "/moto-e14.jpg",           desc: "Motorola confiable",         stock: 5,  estado: "disponible"     },
  { id: "cel013", nombre: "TOROX RAYO movil",                    categoria: "Celulares",  precio: 99,   imagen: "/torox-rayo.jpg",         desc: "Básico económico",           stock: 10, estado: "disponible"     },
  { id: "cel014", nombre: "Neo 3G prolink",                      categoria: "Celulares",  precio: 99,   imagen: "/neo-3g.jpg",             desc: "Equipo básico 3G",           stock: 3,  estado: "pocas unidades" },
  { id: "cel015", nombre: "unonu volt flip phone",               categoria: "Celulares",  precio: 159,  imagen: "/unonu-flip.jpg",         desc: "Teléfono plegable clásico",  stock: 2,  estado: "pocas unidades" },
  { id: "cel016", nombre: "LESIA L256",                          categoria: "Celulares",  precio: 99,   imagen: "/lesia-l256.jpg",         desc: "Básico funcional",           stock: 6,  estado: "disponible"     },
  { id: "cel017", nombre: "NOKIA 105 HMD",                       categoria: "Celulares",  precio: 109,  imagen: "/nokia-105.jpg",          desc: "Clásico resistente",         stock: 8,  estado: "disponible"     },
  { id: "cel018", nombre: "Logic B7",                            categoria: "Celulares",  precio: 69,   imagen: "/logic-b7.jpg",           desc: "Teléfono simple",            stock: 5,  estado: "disponible"     },
  { id: "cel019", nombre: "Verykool i129a",                      categoria: "Celulares",  precio: 79,   imagen: "/verykool.jpg",           desc: "Compacto básico",            stock: 4,  estado: "disponible"     },

  // ================= AUDÍFONOS =================
  { id: "aud001", nombre: "Earbox Buds8 MOVISUN ANC",            categoria: "Audífonos",  precio: 100,  imagen: "/buds8.jpg",              desc: "Cancelación de ruido",       stock: 5,  estado: "disponible"     },
  { id: "aud002", nombre: "1HORA inalámbrico",                    categoria: "Audífonos",  precio: 60,   imagen: "/1hora.jpg",              desc: "Bluetooth resistente",       stock: 8,  estado: "disponible"     },
  { id: "aud003", nombre: "Remi Buds 4 Active",                   categoria: "Audífonos",  precio: 129,  imagen: "/remi-buds4.jpg",         desc: "Diseño deportivo",           stock: 4,  estado: "disponible"     },
  { id: "aud004", nombre: "Romax inalámbrico deportivo",          categoria: "Audífonos",  precio: 70,   imagen: "/romax-deportivo.jpg",    desc: "Ideal para deporte",         stock: 6,  estado: "disponible"     },
  { id: "aud005", nombre: "EW47",                                 categoria: "Audífonos",  precio: 89,   imagen: "/ew47.jpg",               desc: "Bluetooth calidad media",    stock: 7,  estado: "disponible"     },
  { id: "aud006", nombre: "WIRELESS CAT EAR CXT-B39",            categoria: "Audífonos",  precio: 69,   imagen: "/cat-ear.jpg",            desc: "Con luces LED",              stock: 3,  estado: "pocas unidades" },
  { id: "aud007", nombre: "Bass+ AIN-860L",                       categoria: "Audífonos",  precio: 79,   imagen: "/bass-860l.jpg",          desc: "Sonido potente",             stock: 5,  estado: "disponible"     },
  { id: "aud008", nombre: "Huawei con cable",                     categoria: "Audífonos",  precio: 15,   imagen: "/huawei-cable.jpg",       desc: "Original 3.5mm",             stock: 10, estado: "disponible"     },
  { id: "aud009", nombre: "Samsung con cable",                    categoria: "Audífonos",  precio: 20,   imagen: "/samsung-cable.jpg",      desc: "Original AKG",               stock: 10, estado: "disponible"     },

  // ================= FUNDAS =================
  { id: "fun001", nombre: "Funda Estándar",                       categoria: "Fundas",     precio: 25,   imagen: "/funda-normal.jpg",       desc: "Transparente básica",        stock: 15, estado: "disponible"     },
  { id: "fun002", nombre: "Funda Robotizada",                     categoria: "Fundas",     precio: 25,   imagen: "/funda-robot.jpg",        desc: "Antigolpes",                 stock: 12, estado: "disponible"     },
  { id: "fun003", nombre: "Funda Flipcover",                      categoria: "Fundas",     precio: 25,   imagen: "/funda-flip.jpg",         desc: "Tipo billetera",             stock: 10, estado: "disponible"     },
  { id: "fun004", nombre: "Funda 360",                            categoria: "Fundas",     precio: 30,   imagen: "/funda-360.jpg",          desc: "Protección completa",        stock: 8,  estado: "disponible"     },

  // ================= CABLES =================
  { id: "cab001", nombre: "Cable vex Q7 5A",                     categoria: "Cables",     precio: 25,   imagen: "/vex-q7.jpg",             desc: "Carga rápida 5A",            stock: 10, estado: "disponible"     },
  { id: "cab002", nombre: "Cable Honor Huawei",                   categoria: "Cables",     precio: 30,   imagen: "/cable-honor.jpg",        desc: "Original",                   stock: 8,  estado: "disponible"     },
  { id: "cab003", nombre: "Cable Huawei Super Charge",            categoria: "Cables",     precio: 25,   imagen: "/cable-huawei-sc.jpg",    desc: "Super carga",                stock: 9,  estado: "disponible"     },
  { id: "cab004", nombre: "Cable Super 3 en 1 B32 GORO",         categoria: "Cables",     precio: 30,   imagen: "/cable-3en1.jpg",         desc: "Enmallado resistente",       stock: 6,  estado: "disponible"     },
  { id: "cab005", nombre: "X-Cable Metal Magnetic",               categoria: "Cables",     precio: 20,   imagen: "/cable-magnetico.jpg",    desc: "Magnético metal",            stock: 5,  estado: "disponible"     },
  { id: "cab006", nombre: "Cable Redd Micro",                     categoria: "Cables",     precio: 15,   imagen: "/cable-redd.jpg",         desc: "Micro USB",                  stock: 12, estado: "disponible"     },
  { id: "cab007", nombre: "Cable Samsung S10",                    categoria: "Cables",     precio: 25,   imagen: "/cable-s10.jpg",          desc: "Compatible S10",             stock: 7,  estado: "disponible"     },
  { id: "cab008", nombre: "Cable Lightning iPhone 1m",            categoria: "Cables",     precio: 30,   imagen: "/cable-lightning.jpg",    desc: "1 metro",                    stock: 8,  estado: "disponible"     },
  { id: "cab009", nombre: "Cable Lightning 1HORA 2.1A",           categoria: "Cables",     precio: 25,   imagen: "/cable-1hora.jpg",        desc: "2.1A resistente",            stock: 6,  estado: "disponible"     },
  { id: "cab010", nombre: "Cable ROMAX 66W",                      categoria: "Cables",     precio: 25,   imagen: "/romax-66w.jpg",          desc: "Carga rápida 66W",           stock: 10, estado: "disponible"     },
  { id: "cab011", nombre: "Cable de datos ROMAX Lightning 66W",   categoria: "Cables",     precio: 25,   imagen: "/romax-lightning-66w.jpg", desc: "Lightning 66W",             stock: 6,  estado: "disponible"     },

  // ================= CABLES PD =================
  { id: "cpd001", nombre: "Cable VEX PD",                         categoria: "Cables PD", precio: 20,   imagen: "/vex-pd.jpg",             desc: "Power Delivery",             stock: 8,  estado: "disponible"     },
  { id: "cpd002", nombre: "Cable KAPERH PD",                      categoria: "Cables PD", precio: 35,   imagen: "/kaperh-pd.jpg",          desc: "Carga rápida PD",            stock: 5,  estado: "disponible"     },
  { id: "cpd003", nombre: "Cable Super PD",                       categoria: "Cables PD", precio: 30,   imagen: "/super-pd.jpg",           desc: "Alta velocidad",             stock: 6,  estado: "disponible"     },
  { id: "cpd004", nombre: "Cable Motorola PD",                     categoria: "Cables PD", precio: 35,   imagen: "/motorola-pd.jpg",        desc: "Compatible Motorola",        stock: 4,  estado: "disponible"     },
  { id: "cpd005", nombre: "Cable Type-C to Lightning iPhone",      categoria: "Cables PD", precio: 35,   imagen: "/typec-lightning.jpg",    desc: "Carga rápida Apple",         stock: 5,  estado: "disponible"     },

  // ================= CARGADORES =================
  { id: "car001", nombre: "REDD Power Charger 5.8A",              categoria: "Cargadores", precio: 30,  imagen: "/redd-charger.jpg",       desc: "5.8A potente",               stock: 8,  estado: "disponible"     },
  { id: "car002", nombre: "Xiaomi Micro",                          categoria: "Cargadores", precio: 35,  imagen: "/xiaomi-micro.jpg",       desc: "Original Xiaomi",            stock: 6,  estado: "disponible"     },
  { id: "car003", nombre: "Xiaomi 67W",                            categoria: "Cargadores", precio: 65,  imagen: "/xiaomi-67w.jpg",         desc: "Carga ultra rápida",         stock: 4,  estado: "disponible"     },
  { id: "car004", nombre: "Xiaomi 120W",                           categoria: "Cargadores", precio: 85,  imagen: "/xiaomi-120w.jpg",        desc: "Carga extrema",              stock: 3,  estado: "pocas unidades" },
  { id: "car005", nombre: "Honor 66W",                             categoria: "Cargadores", precio: 80,  imagen: "/honor-66w.jpg",          desc: "Carga rápida Honor",         stock: 4,  estado: "disponible"     },
  { id: "car006", nombre: "Samsung S10",                           categoria: "Cargadores", precio: 45,  imagen: "/samsung-s10.jpg",        desc: "Original Samsung",           stock: 6,  estado: "disponible"     },
  { id: "car007", nombre: "LG 4A",                                 categoria: "Cargadores", precio: 35,  imagen: "/lg-4a.jpg",              desc: "Carga estable",              stock: 5,  estado: "disponible"     },
  { id: "car008", nombre: "iPhone 14 Pro Max Type-C to Lightning", categoria: "Cargadores", precio: 60, imagen: "/iphone14-charger.jpg",   desc: "Compatible 14 Pro Max",      stock: 4,  estado: "disponible"     },
  { id: "car009", nombre: "iPhone 15 Pro Max Type-C to Type-C",   categoria: "Cargadores", precio: 55,  imagen: "/iphone15-charger.jpg",   desc: "Compatible 15 Pro Max",      stock: 4,  estado: "disponible"     },
  { id: "car010", nombre: "ROMAX TURBO POWER 66W",                 categoria: "Cargadores", precio: 35,  imagen: "/romax-turbo-66w.jpg",    desc: "Turbo Power 66W",            stock: 15, estado: "disponible"     },

  // ================= MICAS =================
  { id: "mic001", nombre: "Mica de vidrio",                       categoria: "Micas",      precio: 10,  imagen: "/mica-vidrio.jpg",        desc: "Protección estándar",        stock: 20, estado: "disponible"     },
  { id: "mic002", nombre: "Mica de cerámica",                     categoria: "Micas",      precio: 25,  imagen: "/mica-ceramica.jpg",      desc: "Alta resistencia",           stock: 10, estado: "disponible"     },
  { id: "mic003", nombre: "Mica hidrogel HD premium",             categoria: "Micas",      precio: 20,  imagen: "/mica-hidrogel.jpg",   desc: "Flexible y duradera",        stock: 12, estado: "disponible"     },
  { id: "mic004", nombre: "Mica hidrogel Mate",                   categoria: "Micas",      precio: 35,  imagen: "/mica-hidrogel.jpg", desc: "Antirreflejo y ayuda al descanso visual",   stock: 8,  estado: "disponible"     },
  { id: "mic005", nombre: "Mica hidrogel Anti-espía",             categoria: "Micas",      precio: 40,  imagen: "/mica-hidrogel.jpg",          desc: "Privacidad visual",          stock: 6,  estado: "disponible"     },
];

