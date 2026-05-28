import api from "./api";
import Swal from "sweetalert2";

const RECURSO = "/incidencias";

export const getIncidencias = async () => {
  const response = await api.get(RECURSO);
  return response.data;
};

export const getIncidenciaById = async (id) => {
  const response = await api.get(`${RECURSO}/${id}`);
  return response.data;
};

export const createIncidencia = async (incidencia) => {
  try {
    const response = await api.post(RECURSO, incidencia);
    return response.data;
  } catch (error) {
    Swal.fire("Error", "No se pudo crear la incidencia", "error");
    throw error;
  }
};

export const updateIncidencia = async (id, incidencia) => {
  try {
    const response = await api.put(`${RECURSO}/${id}`, incidencia);
    return response.data;
  } catch (error) {
    Swal.fire("Error", "No se pudo actualizar la incidencia", "error");
    throw error;
  }
};

export const deleteIncidencia = async (id) => {
  try {
    await api.delete(`${RECURSO}/${id}`);
  } catch (error) {
    Swal.fire("Error", "No se pudo eliminar la incidencia", "error");
    throw error;
  }
};

