import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Slide
} from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

/**
 * Props:
 * - open: boolean, si el modal está abierto
 * - onClose: función para cerrar el modal
 * - onAdd: función ({id, nombre, creditos, semestre, nota}) para agregar materia
 * - editIndex: (opcional) índice de la materia a editar, o null para agregar
 * - materiaToEdit: (opcional) objeto materia para editar (misma estructura que materia)
 * - onUpdate: (opcional) función ({id, nombre, creditos, semestre, nota}, editIndex) para actualizar materia
 */
export default function AgregarMateriaModal({
  open,
  onClose,
  onAdd,
  editIndex = null,
  materiaToEdit = null,
  onUpdate
}) {
  const [semestre, setSemestre] = useState("");
  const [materiaId, setMateriaId] = useState("");
  const [nota, setNota] = useState("");
  const [materiasDisponibles, setMateriasDisponibles] = useState([]);
  const [loadingMaterias, setLoadingMaterias] = useState(false);
  const [errorMaterias, setErrorMaterias] = useState(null);

  // Obtiene las materias desde un API al abrir el modal
  useEffect(() => {
    if (open) {
      setLoadingMaterias(true);
      fetch("https://backend-pensum-front.onrender.com/homologacion/pensum/viejo")
        .then(res => {
          if (!res.ok) throw new Error("Error cargando materias");
          return res.json();
        })
        .then(data => {
          // Normaliza los datos: asegura que cada materia tenga id, nombre, creditos y semestre
          const materiasNormalizadas = data.map((m, idx) => ({
            id: m.codigo || m.id || idx.toString(),
            nombre: m.nombre || m.asignatura || "",
            creditos: m.creditos || m.credits || 0,
            semestre: (m.semestre || m.semester || Math.ceil((idx + 1) / 5)).toString() // Asegura string siempre
          }));
          setMateriasDisponibles(materiasNormalizadas);
          setLoadingMaterias(false);
        })
        .catch(err => {
          setErrorMaterias(err.message);
          setLoadingMaterias(false);
        });
    }
  }, [open]);

  // Sincroniza los campos si es edición
  useEffect(() => {
    if (materiaToEdit && open) {
      setSemestre(materiaToEdit.semestre?.toString() || "");
      setMateriaId(materiaToEdit.id || "");
      setNota(materiaToEdit.nota?.toString() || "");
    } else if (!open) {
      setSemestre("");
      setMateriaId("");
      setNota("");
    }
  }, [materiaToEdit, open]);

  // Filtra por semestre si corresponde (string contra string)
  const materiasFiltradas = materiasDisponibles.filter(
    m => (!semestre || m.semestre === semestre)
  );

  // Extrae los semestres disponibles de las materias (siempre string)
  const semestresDisponibles = [...new Set(materiasDisponibles.map(m => m.semestre))].sort((a, b) => Number(a) - Number(b));

  const handleConfirm = () => {
    const materia = materiasDisponibles.find(m => m.id === materiaId);
    if (materia && nota) {
      const materiaObj = { ...materia, nota: Number(nota) };
      if (editIndex !== null && typeof onUpdate === "function") {
        onUpdate(materiaObj, editIndex);
      } else {
        onAdd(materiaObj);
      }
      onClose();
      setSemestre("");
      setMateriaId("");
      setNota("");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} TransitionComponent={Transition}>
      <DialogTitle>
        {editIndex !== null ? "Actualizar asignatura" : "Seleccionar asignatura"}
      </DialogTitle>
      <DialogContent dividers>
        {loadingMaterias ? (
          <div>Cargando materias...</div>
        ) : errorMaterias ? (
          <div style={{ color: 'red' }}>Error: {errorMaterias}</div>
        ) : (
          <>
            <TextField
              select
              label="Semestre"
              value={semestre}
              onChange={e => setSemestre(e.target.value)}
              fullWidth
              margin="dense"
            >
              {semestresDisponibles.map(n => (
                <MenuItem key={n} value={n}>{n}</MenuItem>
              ))}
            </TextField>
            <TextField
              select
              label="Asignatura"
              value={materiaId}
              onChange={e => setMateriaId(e.target.value)}
              fullWidth
              margin="dense"
              disabled={!semestre || materiasFiltradas.length === 0}
            >
              {materiasFiltradas.map(m => (
                <MenuItem key={m.id} value={m.id}>{m.nombre}</MenuItem>
              ))}
            </TextField>
            <TextField
              label="Nota"
              type="number"
              value={nota}
              onChange={e => setNota(e.target.value)}
              fullWidth
              margin="dense"
              inputProps={{ min: 0, max: 5, step: 0.1 }}
            />
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary" variant="outlined">
          Cancelar
        </Button>
        <Button
          onClick={handleConfirm}
          color="success"
          variant="contained"
          disabled={loadingMaterias || errorMaterias}
        >
          {editIndex !== null ? "Actualizar" : "Agregar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}