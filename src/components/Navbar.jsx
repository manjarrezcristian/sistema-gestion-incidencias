import { useNavigate, Link, useLocation } from "react-router-dom";
import { getLocalStorage, removeLocalStorage } from "../utils/local-storage";
import Swal from "sweetalert2";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const sesionRaw = getLocalStorage("sesionUsuario");

  let nombreUsuario = "Usuario";
  let rolUsuario = "";

  if (sesionRaw) {
    try {
      const sesion = JSON.parse(sesionRaw);
      nombreUsuario = sesion.nombre || sesion.username || "Usuario";
      rolUsuario = sesion.rol || "";
    } catch {
      nombreUsuario = sesionRaw;
    }
  }

  const handleLogout = () => {
    Swal.fire({
      title: "¿Cerrar sesión?",
      text: "Se cerrará su sesión en el sistema.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Cerrar sesión",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        removeLocalStorage("sesionUsuario");
        navigate("/login");
      }
    });
  };

  const inicial = nombreUsuario.charAt(0).toUpperCase();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/dashboard" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800 text-white font-bold text-sm">
            IT
          </div>
          <div className="leading-tight">
            <h1 className="text-sm font-extrabold text-slate-900 sm:text-base">
              Sistema de Gestión de Incidencias | Issue Tracker
            </h1>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
              Gestión de incidencias
            </p>
          </div>
        </Link>

        <div className="flex items-center gap-4 sm:gap-6">
          <nav className="hidden sm:flex items-center gap-2 text-sm font-semibold">
            <Link
              to="/dashboard"
              className={`rounded-xl px-3.5 py-1.5 transition-all ${
                location.pathname === "/dashboard"
                  ? "bg-slate-800 text-white"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              Dashboard
            </Link>
            <Link
              to="/dashboard/nueva"
              className={`rounded-xl px-3.5 py-1.5 transition-all ${
                location.pathname === "/dashboard/nueva"
                  ? "bg-slate-800 text-white"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              Nueva incidencia
            </Link>
          </nav>

          <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
            <div className="hidden sm:block text-right">
              <p className="text-xs font-semibold text-slate-900 max-w-[140px] truncate">
                {nombreUsuario}
              </p>
              {rolUsuario && (
                <p className="text-[10px] text-slate-500 truncate max-w-[140px]">{rolUsuario}</p>
              )}
            </div>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 font-bold text-white text-sm">
              {inicial}
            </div>
            <button
              onClick={handleLogout}
              type="button"
              className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-all cursor-pointer"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
