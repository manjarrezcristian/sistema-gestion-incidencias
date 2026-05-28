import { useState } from "react";
import Swal from "sweetalert2";

const ESTADOS = ["Pendiente", "En Progreso", "Resuelto"];
const PRIORIDADES = ["Baja", "Media", "Alta"];

const valoresIniciales = (initialValues) => ({
  titulo: initialValues?.titulo || "",
  descripcion: initialValues?.descripcion || "",
  estado: initialValues?.estado || "Pendiente",
  prioridad: initialValues?.prioridad || "Media",
});

const IncidenceForm = ({ initialValues, onSubmit, isSubmitting }) => {
  const [formData, setFormData] = useState(() => valoresIniciales(initialValues));
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.titulo.trim()) {
      newErrors.titulo = "El título es obligatorio.";
    }
    if (!formData.descripcion.trim()) {
      newErrors.descripcion = "La descripción es obligatoria.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      Swal.fire({
        title: "Campos incompletos",
        text: "Revise los campos obligatorios del formulario.",
        icon: "warning",
        confirmButtonText: "Revisar",
      });
      return;
    }
    onSubmit({ ...formData });
  };

  const inputClass = (field) =>
    `w-full rounded-xl border px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 transition-all ${
      errors[field]
        ? "border-red-300 bg-red-50"
        : "border-slate-300 bg-slate-50 focus:border-slate-500"
    }`;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="titulo" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
          Título <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="titulo"
          name="titulo"
          value={formData.titulo}
          onChange={handleChange}
          placeholder="Ej: Error al guardar formulario"
          className={inputClass("titulo")}
        />
        {errors.titulo && <p className="mt-1.5 text-xs font-medium text-red-600">{errors.titulo}</p>}
      </div>

      <div>
        <label htmlFor="descripcion" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
          Descripción <span className="text-red-500">*</span>
        </label>
        <textarea
          id="descripcion"
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
          rows={4}
          placeholder="Describa el bug o incidencia reportada..."
          className={inputClass("descripcion")}
        />
        {errors.descripcion && (
          <p className="mt-1.5 text-xs font-medium text-red-600">{errors.descripcion}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="estado" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
            Estado
          </label>
          <select
            id="estado"
            name="estado"
            value={formData.estado}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 cursor-pointer"
          >
            {ESTADOS.map((e) => (
              <option key={e} value={e}>
                {e}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="prioridad" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
            Prioridad
          </label>
          <select
            id="prioridad"
            name="prioridad"
            value={formData.prioridad}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 cursor-pointer"
          >
            {PRIORIDADES.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex justify-center items-center gap-2 py-3.5 bg-slate-800 hover:bg-slate-700 text-white text-sm font-bold rounded-xl shadow-md transition-all cursor-pointer disabled:opacity-70"
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
              <span>Guardando...</span>
            </div>
          ) : (
            "Guardar incidencia"
          )}
        </button>
      </div>
    </form>
  );
};

export default IncidenceForm;
