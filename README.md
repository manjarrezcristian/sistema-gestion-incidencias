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
   git clone https://github.com/TU_USUARIO/TU_REPO.git
   ```
2. Entrar a la carpeta del proyecto:
   ```bash
   cd TU_REPO
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
