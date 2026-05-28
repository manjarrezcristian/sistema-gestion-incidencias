# 📋 sistema-gestion-incidencias - Sistema de Gestión de Incidencias
> Prueba técnica para el cargo de Desarrollador Frontend Junior (React)

## 🚀 Tecnologías utilizadas
- React.js + Vite
- React Router DOM
- Tailwind CSS
- SweetAlert2
- Axios
- LocalStorage (simulación de autentication)
- MockAPI (API REST de pruebas)
- Git / GitHub (Metodología GitFlow)

## ✅ Requisitos cumplidos (Factor 1 - Aprobado)
- [x] Ruta de Login: nombre + rol, guardado en LocalStorage
- [x] Rutas protegidas: redirección automática si no hay sesión
- [x] Cerrar sesión: limpieza de almacenamiento
- [x] Estructura del objeto: `id`, `titulo`, `descripcion`, `estado`, `prioridad`
- [x] CRUD completo: GET, POST, PUT, DELETE
- [x] Confirmación antes de eliminar (SweetAlert2 obligatorio)
- [x] Manejo de errores y alertas informativas

## 🌟 Criterios de excelencia aplicados (Factor 2 - Nivel Superior)
- ✅ Arquitectura modular: components / pages / services / utils / routes
- ✅ Código limpio: nombres descriptivos, sin console.log en producción
- ✅ Interfaz responsiva: adaptada a móvil, tablet y escritorio
- ✅ Estados visuales: contadores dinámicos, colores por estado y prioridad
- ✅ Filtros funcionales: por estado y por prioridad
- ✅ Buenas prácticas de asincronía: try/catch y manejo de carga

## 📌 Enlaces del Proyecto

🔗 **Repositorio GitHub:**
https://github.com/manjarrezcristian/sistema-gestion-incidencias

🔗 **Aplicación en producción:**
https://sistema-gestion-incidencias.vercel.app

🔗 **API (MockAPI):**
https://6a1799251878294b597ba692.mockapi.io/incidencias

## ⚙️ Instalación y ejecución local
1. Clonar repositorio:
   ```bash
   git clone https://github.com/manjarrezcristian/sistema-gestion-incidencias
   ```
2. Entrar a la carpeta del proyecto:
   ```bash
   cd sistema-gestion-incidencias
   ```
3. Instalar dependencias:
   ```bash
   npm install
   ```
4. Crear archivo `.env` con la variable:
   ```env
   VITE_API_URL=https://6a1799251878294b597ba692.mockapi.io
   ```
5. Ejecutar en desarrollo:
   ```bash
   npm run dev
```
6. Compilar para producción:
   ```bash
   npm run build
   ```

## 📂 Estructura del proyecto
sistema-gestion-incidencias/
├── public/ # Archivos estáticos
├── src/
│ ├──components/ # Componentes reutilizables
│ ├──pages/ # Vistas completas de la aplicación
│ ├── services/ # Conexión y configuración de la API
│ ├── utils/ # Funciones auxiliares y lógica reutilizable
│ ├── routes/ # Configuración y protección de rutas
│ ├── App.jsx│
│ ├── main.jsx
├── .env.example # Ejemplo de configuración (seguridad)
├── vercel.json # Configuración de despliegue
├── tailwind.config.js
├── package.json└── README.md


