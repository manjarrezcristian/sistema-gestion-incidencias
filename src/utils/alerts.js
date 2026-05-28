import Swal from "sweetalert2";

const swalBase = {
  customClass: {
    popup: "rounded-2xl border border-emerald-200 shadow-xl",
    title: "text-emerald-900 font-bold",
    htmlContainer: "text-slate-600",
    confirmButton:
      "bg-gradient-to-r from-emerald-600 to-green-700 text-white px-6 py-2 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all cursor-pointer",
  },
  buttonsStyling: false,
};

export function showSuccessAlert(titulo, mensaje) {
  return Swal.fire({
    title: titulo,
    text: mensaje,
    icon: "success",
    timer: 1800,
    showConfirmButton: false,
    ...swalBase,
  });
}

export function showErrorAlert(titulo, mensaje) {
  return Swal.fire({
    title: titulo,
    text: mensaje,
    icon: "error",
    confirmButtonText: "Aceptar",
    ...swalBase,
  });
}
