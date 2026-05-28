/**
 * Utilidades para interactuar con LocalStorage.
 * Permite guardar, recuperar y eliminar datos de sesión.
 */

export function saveLocalStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch {
    /* fallo silencioso de almacenamiento local */
  }
}

export function getLocalStorage(key) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function removeLocalStorage(key) {
  try {
    localStorage.removeItem(key);
  } catch {
    /* fallo silencioso al eliminar */
  }
}
