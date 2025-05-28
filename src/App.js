import React, { useState } from "react";
import './App.css';
import HeaderForm from "./components/HeaderForm";
import HomologacionTable from "./components/HomologacionTable";
import AgregarMateriaModal from "./components/AgregarMateriaModal";
import ResultadosHomologacion from "./components/ResultadosHomologacion";
import CalcularHomologacionButton from "./components/CalcularHomologacionButton";
import { Box, Container } from "@mui/material";

export default function App() {
  const [header, setHeader] = useState({
    tipoDoc: "",
    cedula: "",
    nombre: ""
  });
  const [headerValid, setHeaderValid] = useState(false);
  const [materias, setMaterias] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [materiaToEdit, setMateriaToEdit] = useState(null);
  const [resultados, setResultados] = useState(null); // <-- Estado para la respuesta

  // Abrir modal para agregar
  const handleAddMateriaClick = () => {
    setEditIndex(null);
    setMateriaToEdit(null);
    setModalOpen(true);
  };

  // Abrir modal para editar
  const handleUpdateMateria = (idx) => {
    setEditIndex(idx);
    setMateriaToEdit(materias[idx]);
    setModalOpen(true);
  };

  // Eliminar materia
  const handleDeleteMateria = (idx) => {
    setMaterias(prev => prev.filter((_, i) => i !== idx));
  };

  // Agregar nueva materia
  const handleAddMateria = (materia) => {
    setMaterias(prev => [...prev, materia]);
    setModalOpen(false);
  };

  // Actualizar materia existente
  const handleUpdateMateriaConfirm = (materiaActualizada, idx) => {
    setMaterias(prev =>
      prev.map((mat, i) => (i === idx ? materiaActualizada : mat))
    );
    setModalOpen(false);
  };

  // Si hay resultados, muestra la vista de resultados y no el formulario
  if (resultados) {
    return (
      <Container maxWidth="md" sx={{ p: 2 }}>
        <ResultadosHomologacion
          resultados={resultados}
          onVolver={() => setResultados(null)}
        />
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ p: 2 }}>
      <HeaderForm
        header={header}
        setHeader={setHeader}
        setHeaderValid={setHeaderValid}
      />

      <HomologacionTable
        materias={materias}
        onAddClick={handleAddMateriaClick}
        headerValid={headerValid}
        onUpdate={handleUpdateMateria}
        onDelete={handleDeleteMateria}
      />

      <Box display="flex" justifyContent="center">
        <CalcularHomologacionButton
          header={header}
          materias={materias}
          setResultados={setResultados}
        />
      </Box>

      <AgregarMateriaModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onAdd={handleAddMateria}
        editIndex={editIndex}
        materiaToEdit={materiaToEdit}
        onUpdate={handleUpdateMateriaConfirm}
      />
    </Container>
  );
}