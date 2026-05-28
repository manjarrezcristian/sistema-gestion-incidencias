import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { deleteIncidencia } from "../services/incidencias";

const estadoStyles = {
  Pendiente: "bg-amber-100 text-amber-800 border-amber-200",
  "En Progreso": "bg-blue-100 text-blue-800 border-blue-200",
  Resuelto: "bg-emerald-100 text-emerald-800 border-emerald-200",
};

const prioridadStyles = {
  Baja: "bg-slate-100 text-slate-700 border-slate-200",
  Media: "bg-orange-100 text-orange-800 border-orange-200",
  Alta: "bg-red-100 text-red-800 border-red-200",
};

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

const IncidenceCard = ({ incidencia, onDeleteSuccess }) => {
  const { id, titulo, descripcion, estado, prioridad } = incidencia;
  const estadoNormalizado = normalizarEstado(estado);
  const prioridadNormalizada = normalizarPrioridad(prioridad);

  const handleEliminar = () => {
    Swal.fire({
      title: "¿Eliminar incidencia?",
      text: `Se eliminará "${titulo}". Esta acción no se puede deshacer.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          Swal.fire({
            title: "Eliminando...",
            allowOutsideClick: false,
            didOpen: () => Swal.showLoading(),
          });

          await deleteIncidencia(id);

          Swal.fire({
            title: "Eliminada",
            text: "La incidencia fue eliminada correctamente.",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          });

          if (onDeleteSuccess) onDeleteSuccess();
        } catch {
          Swal.fire({
            title: "Error",
            text: "No fue posible eliminar la incidencia. Intente más tarde.",
            icon: "error",
            confirmButtonText: "Aceptar",
          });
        }
      }
    });
  };

  return (
    <article className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-md transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <h3 className="text-base font-bold text-slate-900 line-clamp-2" title={titulo}>
          {titulo}
        </h3>
        <span
          className={`inline-block rounded-lg border px-2 py-0.5 text-[10px] font-bold uppercase ${
            prioridadStyles[prioridadNormalizada] || prioridadStyles.Baja
          }`}
        >
          {prioridadNormalizada}
        </span>
      </div>

      <p className="mt-3 flex-1 text-sm text-slate-600 line-clamp-3">{descripcion}</p>

      <div className="mt-4">
        <span
          className={`inline-block rounded-lg border px-2.5 py-1 text-xs font-semibold ${
            estadoStyles[estadoNormalizado] || estadoStyles.Pendiente
          }`}
        >
          {estadoNormalizado}
        </span>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 border-t border-slate-100 pt-4">
        <Link
          to={`/dashboard/editar/${id}`}
          className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 text-xs font-semibold text-slate-800 hover:bg-slate-100 transition-all"
        >
          Editar
        </Link>
        <button
          onClick={handleEliminar}
          type="button"
          className="flex items-center justify-center gap-1.5 rounded-xl bg-red-600 px-3 py-2.5 text-xs font-semibold text-white hover:bg-red-700 transition-all cursor-pointer"
        >
          Eliminar
        </button>
      </div>
    </article>
  );
};

export default IncidenceCard;
