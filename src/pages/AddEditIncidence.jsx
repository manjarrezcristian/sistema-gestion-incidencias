import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  createIncidencia,
  updateIncidencia,
  getIncidenciaById,
} from "../services/incidencias";
import Navbar from "../components/Navbar";
import IncidenceForm from "../components/IncidenceForm";
import Swal from "sweetalert2";

const AddEditIncidence = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const esEdicion = !!id;

  const [incidenciaAEditar, setIncidenciaAEditar] = useState(null);
  const [cargandoDatos, setCargandoDatos] = useState(esEdicion);
  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    if (esEdicion) {
      const obtenerIncidencia = async () => {
        try {
          const data = await getIncidenciaById(id);
          setIncidenciaAEditar(data);
        } catch {
          Swal.fire({
            title: "Incidencia no encontrada",
            text: "El registro solicitado no existe o no se pudo cargar.",
            icon: "error",
            confirmButtonText: "Volver al dashboard",
          }).then(() => navigate("/dashboard"));
        } finally {
          setCargandoDatos(false);
        }
      };
      obtenerIncidencia();
    }
  }, [id, esEdicion, navigate]);

  const handleSubmit = async (datos) => {
    setGuardando(true);
    try {
      if (esEdicion) {
        await updateIncidencia(id, datos);
        Swal.fire({
          title: "Incidencia actualizada",
          text: "Los cambios se guardaron correctamente.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        }).then(() => navigate("/dashboard"));
      } else {
        await createIncidencia(datos);
        Swal.fire({
          title: "Incidencia creada",
          text: "El reporte se registró en el sistema.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        }).then(() => navigate("/dashboard"));
      }
    } catch {
      Swal.fire({
        title: "Error al guardar",
        text: "Ocurrió un problema al comunicarse con la API.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    } finally {
      setGuardando(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-1 mx-auto w-full max-w-2xl px-4 py-10 sm:px-6">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-1 text-sm font-semibold text-slate-600 hover:text-slate-900 mb-6"
        >
          ⬅️ Volver al dashboard
        </Link>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-md">
          <div className="mb-8 border-b border-slate-100 pb-5">
            <h2 className="text-xl font-extrabold text-slate-900 sm:text-2xl">
              {esEdicion ? "Editar incidencia" : "Nueva incidencia"}
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              {esEdicion
                ? "Actualice el estado, prioridad o descripción del reporte."
                : "Registre un nuevo bug o incidencia del software."}
            </p>
          </div>

          {cargandoDatos ? (
            <div className="flex flex-col items-center justify-center py-12 text-slate-700 gap-3">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-600 border-t-transparent"></div>
              <p className="text-sm font-semibold">Cargando datos...</p>
            </div>
          ) : (
            <IncidenceForm
              key={esEdicion ? id : "nueva"}
              initialValues={incidenciaAEditar}
              onSubmit={handleSubmit}
              isSubmitting={guardando}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default AddEditIncidence;
