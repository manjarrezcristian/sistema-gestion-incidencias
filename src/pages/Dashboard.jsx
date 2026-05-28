import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getIncidencias } from "../services/incidencias";
import Navbar from "../components/Navbar";
import IncidenceCard from "../components/IncidenceCard";
import Swal from "sweetalert2";

const normalizarEstado = (estado) => {
  const valor = String(estado || "").trim().toLowerCase();
  if (valor === "estado 1" || valor === "1") return "Pendiente";
  if (valor === "estado 2" || valor === "2") return "En Progreso";
  if (valor === "estado 3" || valor === "3") return "Resuelto";
  if (valor === "pendiente") return "Pendiente";
  if (valor === "en progreso") return "En Progreso";
  if (valor === "resuelto") return "Resuelto";
  return "Pendiente";
};

const normalizarPrioridad = (prioridad) => {
  const valor = String(prioridad || "").trim().toLowerCase();
  if (valor === "prioridad 1" || valor === "1") return "Baja";
  if (valor === "prioridad 2" || valor === "2") return "Media";
  if (valor === "prioridad 3" || valor === "3") return "Alta";
  if (valor === "prioridad 4" || valor === "4") return "Alta";
  if (valor === "baja") return "Baja";
  if (valor === "media") return "Media";
  if (valor === "alta") return "Alta";
  return "Media";
};

const Dashboard = () => {
  const [incidencias, setIncidencias] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [errorApi, setErrorApi] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("");
  const [filtroPrioridad, setFiltroPrioridad] = useState("");

  const cargarIncidencias = async () => {
    setCargando(true);
    setErrorApi(false);
    try {
      const data = await getIncidencias();
      setIncidencias(Array.isArray(data) ? data : []);
    } catch {
      setErrorApi(true);
      Swal.fire({
        title: "Error de conexión",
        text: "No se pudo conectar con la API. Verifique su conexión e intente de nuevo.",
        icon: "error",
        confirmButtonText: "Reintentar",
      }).then((result) => {
        if (result.isConfirmed) cargarIncidencias();
      });
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarIncidencias();
  }, []);

  const incidenciasFiltradas = incidencias.filter((i) => {
    const texto = busqueda.toLowerCase();
    const estadoNormalizado = normalizarEstado(i.estado);
    const prioridadNormalizada = normalizarPrioridad(i.prioridad);
    const cumpleBusqueda =
      (i.titulo && i.titulo.toLowerCase().includes(texto)) ||
      (i.descripcion && i.descripcion.toLowerCase().includes(texto));
    const cumpleEstado = filtroEstado === "" || estadoNormalizado === filtroEstado;
    const cumplePrioridad =
      filtroPrioridad === "" || prioridadNormalizada === filtroPrioridad;
    return cumpleBusqueda && cumpleEstado && cumplePrioridad;
  });

  const contarPorEstado = (estado) =>
    incidencias.filter((i) => normalizarEstado(i.estado) === estado).length;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-1 mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <section className="mb-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                Gestión de Incidencias
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Panel de soporte técnico para reportes de errores y bugs.
              </p>
            </div>
            <Link
              to="/dashboard/nueva"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-800 px-5 py-3 text-sm font-bold text-white shadow-md hover:bg-slate-700 transition-all"
            >
              + Nueva incidencia
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Pendientes</p>
              <p className="mt-1 text-2xl font-extrabold text-amber-700">{contarPorEstado("Pendiente")}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">En progreso</p>
              <p className="mt-1 text-2xl font-extrabold text-blue-700">{contarPorEstado("En Progreso")}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Resueltas</p>
              <p className="mt-1 text-2xl font-extrabold text-emerald-700">{contarPorEstado("Resuelto")}</p>
            </div>
          </div>
        </section>

        <section className="mb-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm flex flex-col md:flex-row gap-4">
          <input
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar por título o descripción..."
            className="flex-1 rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
          />
          <select
            value={filtroEstado}
            onChange={(e) => setFiltroEstado(e.target.value)}
            className="w-full md:w-48 rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-slate-400"
          >
            <option value="">Todos los estados</option>
            <option value="Pendiente">Pendiente</option>
            <option value="En Progreso">En Progreso</option>
            <option value="Resuelto">Resuelto</option>
          </select>
          <select
            value={filtroPrioridad}
            onChange={(e) => setFiltroPrioridad(e.target.value)}
            className="w-full md:w-44 rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-slate-400"
          >
            <option value="">Todas las prioridades</option>
            <option value="Baja">Baja</option>
            <option value="Media">Media</option>
            <option value="Alta">Alta</option>
          </select>
        </section>

        {cargando ? (
          <section className="flex flex-col items-center justify-center py-16">
            <div className="flex items-center gap-3 text-slate-700 mb-8 font-semibold text-sm">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-slate-600 border-t-transparent"></div>
              <span>Cargando incidencias...</span>
            </div>
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((n) => (
                <div key={n} className="rounded-2xl border border-slate-200 bg-white p-5 space-y-4 animate-pulse">
                  <div className="h-4 bg-slate-200 rounded w-2/3"></div>
                  <div className="h-16 bg-slate-100 rounded w-full"></div>
                  <div className="h-8 bg-slate-200 rounded w-full"></div>
                </div>
              ))}
            </div>
          </section>
        ) : errorApi ? (
          <section className="text-center py-16 rounded-2xl border-2 border-dashed border-slate-300 bg-white p-8">
            <h3 className="text-lg font-bold text-slate-900">Error de conexión</h3>
            <p className="mt-2 text-sm text-slate-600 max-w-md mx-auto">
              No se pudo conectar con MockAPI. Verifique que el recurso /incidencias esté configurado.
            </p>
            <button
              onClick={cargarIncidencias}
              className="mt-6 inline-flex rounded-xl bg-slate-800 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-700"
            >
              Reintentar
            </button>
          </section>
        ) : incidenciasFiltradas.length === 0 ? (
          <section className="text-center py-16 rounded-2xl border-2 border-dashed border-slate-300 bg-white p-8">
            <h3 className="text-lg font-bold text-slate-900">Sin incidencias</h3>
            <p className="mt-2 text-sm text-slate-600">
              {incidencias.length === 0
                ? "Aún no hay reportes registrados."
                : "Ninguna incidencia coincide con los filtros."}
            </p>
          </section>
        ) : (
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {incidenciasFiltradas.map((incidencia) => (
              <IncidenceCard
                key={incidencia.id}
                incidencia={incidencia}
                onDeleteSuccess={cargarIncidencias}
              />
            ))}
          </section>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
