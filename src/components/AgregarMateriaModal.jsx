import React, { useState } from "react";
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

const materiasDisponibles = [
  { id: "SS111", nombre: "CALIDAD ME", creditos: 2, semestre: 10 },
  { id: "MAT101", nombre: "Calculo I", creditos: 3, semestre: 1 },
  // Agrega más materias aquí
];

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AgregarMateriaModal({ open, onClose, onAdd }) {
  const [semestre, setSemestre] = useState("");
  const [materiaId, setMateriaId] = useState("");
  const [nota, setNota] = useState("");

  const materiasFiltradas = materiasDisponibles.filter(
    m =>
      (!semestre || m.semestre === Number(semestre))
  );

  const handleAgregar = () => {
    const materia = materiasDisponibles.find(m => m.id === materiaId);
    if (materia && nota) {
      onAdd({ ...materia, nota });
      onClose();
      setSemestre(""); setMateriaId(""); setNota("");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} TransitionComponent={Transition}>
      <DialogTitle>Seleccionar asignatura</DialogTitle>
      <DialogContent dividers>
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
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary" variant="outlined">Cancelar</Button>
        <Button onClick={handleAgregar} color="success" variant="contained">Agregar</Button>
      </DialogActions>
    </Dialog>
  );
}