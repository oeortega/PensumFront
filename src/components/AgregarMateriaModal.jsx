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

// Elimina la constante materiasDisponibles, ahora será obtenida desde el API

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
export default function AgregarMateriaModal({ open, onClose, onAdd, editIndex = null, materiaToEdit = null, onUpdate }) {
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
      fetch("https://6438770b1b9a7dd5c951c792.mockapi.io/pensum_anterior") // Cambia esta URL por la de tu API real
        .then(res => {
          if (!res.ok) throw new Error("Error cargando materias");
          return res.json();
        })
        .then(data => {
          setMateriasDisponibles(data);
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

  const materiasFiltradas = materiasDisponibles.filter(
    m =>
      (!semestre || m.semestre === Number(semestre))
  );

  const handleConfirm = () => {
    const materia = materiasDisponibles.find(m => m.id === materiaId);
    if (materia && nota) {
      const materiaObj = { ...materia, nota };
      if (editIndex !== null && typeof onUpdate === "function") {
        onUpdate(materiaObj, editIndex);
      } else {
        onAdd(materiaObj);
      }
      onClose();
      setSemestre(""); setMateriaId(""); setNota("");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} TransitionComponent={Transition}>
      <DialogTitle>{editIndex !== null ? "Actualizar asignatura" : "Seleccionar asignatura"}</DialogTitle>
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
              {[...Array(10).keys()].map(n => (
                <MenuItem key={n+1} value={n+1}>{n+1}</MenuItem>
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
        <Button onClick={onClose} color="secondary" variant="outlined">Cancelar</Button>
        <Button onClick={handleConfirm} color="success" variant="contained" disabled={loadingMaterias || errorMaterias}>
          {editIndex !== null ? "Actualizar" : "Agregar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}