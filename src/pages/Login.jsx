import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveLocalStorage } from "../utils/local-storage";
import Swal from "sweetalert2";

const ROLES = ["Administrador", "Soporte Técnico", "Desarrollador"];

const Login = () => {
  const [nombre, setNombre] = useState("");
  const [rol, setRol] = useState("Administrador");
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (!nombre.trim()) {
      Swal.fire({
        title: "Datos incompletos",
        text: "Debe ingresar su nombre para continuar.",
        icon: "warning",
        confirmButtonText: "Entendido",
      });
      return;
    }

    setCargando(true);

    try {
      const datosSesion = {
        nombre: nombre.trim(),
        rol,
        fechaIngreso: new Date().toISOString(),
      };

      saveLocalStorage("sesionUsuario", datosSesion);

      Swal.fire({
        title: "¡Bienvenido!",
        text: `Hola, ${nombre.trim()} (${rol}).`,
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        navigate("/dashboard");
      });
    } catch {
      Swal.fire({
        title: "Error de sesión",
        text: "No se pudo guardar la sesión. Intente de nuevo.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg border border-gray-200">
        <div className="flex flex-col items-center text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-slate-800 text-white font-bold text-xl">
            IT
          </div>
          <h2 className="mt-5 text-2xl font-extrabold tracking-tight text-slate-900">
            Issue Tracker
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Sistema de Gestión de Incidencias
          </p>
        </div>

        <form onSubmit={handleLogin} className="mt-8 space-y-6">
          <div>
            <label
              htmlFor="nombre"
              className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2"
            >
              Nombre
            </label>
            <input
              id="nombre"
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Ej: María García"
              className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-slate-400 transition-all"
              autoFocus
            />
          </div>

          <div>
            <label
              htmlFor="rol"
              className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2"
            >
              Rol
            </label>
            <select
              id="rol"
              value={rol}
              onChange={(e) => setRol(e.target.value)}
              className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 cursor-pointer"
            >
              {ROLES.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={cargando}
            className="w-full flex justify-center items-center gap-2 py-3.5 bg-slate-800 hover:bg-slate-700 text-white text-sm font-bold rounded-xl shadow-md transition-all cursor-pointer disabled:opacity-70"
          >
            {cargando ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                <span>Ingresando...</span>
              </div>
            ) : (
              "Ingresar"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
