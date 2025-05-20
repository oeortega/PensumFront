import React, { useState } from "react";
import HeaderForm from "./components/HeaderForm";
import HomologacionTable from "./components/HomologacionTable";
import AgregarMateriaModal from "./components/AgregarMateriaModal";
import GenerarPdfButton from "./components/GenerarPdfButton";

function App() {
  // Estado global para encabezado y materias
  const [header, setHeader] = useState({
    tipoDoc: "",
    cedula: "",
    nombre: "",
  });
  const [materias, setMaterias] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const handleAddMateria = (materia) => {
    setMaterias([...materias, materia]);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <HeaderForm header={header} setHeader={setHeader} />
      <div style={{ margin: "2rem 0" }}>
        <HomologacionTable
          materias={materias}
          onAddClick={() => setModalOpen(true)}
        />
        <GenerarPdfButton
          header={header}
          materias={materias}
        />
      </div>
      <AgregarMateriaModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onAdd={handleAddMateria}
      />
    </div>
  );
}

export default App;
