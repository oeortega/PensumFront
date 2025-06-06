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
  const [submitHeader, setSubmitHeader] = useState(null);
  const [materias, setMaterias] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [materiaToEdit, setMateriaToEdit] = useState(null);
  const [resultados, setResultados] = useState(null);

  // Nueva advertencia para duplicados
  const [duplicateWarning, setDuplicateWarning] = useState("");

  // Abrir modal para agregar
  const handleAddMateriaClick = () => {
    setEditIndex(null);
    setMateriaToEdit(null);
    setModalOpen(true);
    setDuplicateWarning(""); // Limpiar advertencia al abrir
  };

  // Abrir modal para editar
  const handleUpdateMateria = (idx) => {
    setEditIndex(idx);
    setMateriaToEdit(materias[idx]);
    setModalOpen(true);
    setDuplicateWarning(""); // Limpiar advertencia
  };

  // Eliminar materia
  const handleDeleteMateria = (idx) => {
    setMaterias(prev => prev.filter((_, i) => i !== idx));
    setDuplicateWarning(""); // Limpiar advertencia
  };

  // Agregar nueva materia con control de duplicados
  const handleAddMateria = (materia) => {
    const exists = materias.some(
      (m) =>
        m.id.toLowerCase() === materia.id.toLowerCase() ||
        m.nombre.toLowerCase() === materia.nombre.toLowerCase()
    );
    if (exists) {
      setDuplicateWarning("¡La materia ya existe en la tabla!");
      setModalOpen(false); // Opcional: cerrar modal si es duplicado
      return;
    }
    setMaterias(prev => [...prev, materia]);
    setDuplicateWarning("");
    setModalOpen(false);
  };

  // Actualizar materia existente con control de duplicados
  const handleUpdateMateriaConfirm = (materiaActualizada, idx) => {
    const exists = materias.some(
      (m, i) =>
        i !== idx &&
        (m.id.toLowerCase() === materiaActualizada.id.toLowerCase() ||
         m.nombre.toLowerCase() === materiaActualizada.nombre.toLowerCase())
    );
    if (exists) {
      setDuplicateWarning("¡La materia ya existe en la tabla !");
      setModalOpen(false); // Opcional: cerrar modal si es duplicado
      return;
    }
    setMaterias(prev =>
      prev.map((mat, i) => (i === idx ? materiaActualizada : mat))
    );
    setDuplicateWarning("");
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
        onSubmitHeaderReady={setSubmitHeader}
      />

      <HomologacionTable
        materias={materias}
        onAddClick={handleAddMateriaClick}
        headerValid={headerValid}
        onUpdate={handleUpdateMateria}
        onDelete={handleDeleteMateria}
        duplicateWarning={duplicateWarning} 
      />

      <Box display="flex" justifyContent="center">
        <CalcularHomologacionButton
          header={header}
          materias={materias}
          setResultados={setResultados}
          submitHeader={submitHeader}
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