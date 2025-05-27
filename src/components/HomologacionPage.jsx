import React, { useState } from "react";
import axios from "axios";
import HeaderForm from "./HeaderForm";
import HomologacionTable from "./HomologacionTable";
import AgregarMateriaModal from "./AgregarMateriaModal";
import GenerarPdfButton from "./GenerarPdfButton";
import { Button, Typography, Container } from "@mui/material";

export default function HomologacionPage() {
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

  const handleAddMateria = (materia) => {
    setMaterias(prev => [...prev, materia]);
  };

  const handleUpdateMateria = (materiaActualizada, index) => {
    const nuevas = [...materias];
    nuevas[index] = materiaActualizada;
    setMaterias(nuevas);
    setEditIndex(null);
    setMateriaToEdit(null);
  };

  const handleDeleteMateria = (idx) => {
    const nuevas = [...materias];
    nuevas.splice(idx, 1);
    setMaterias(nuevas);
  };

  const handleEditMateria = (idx) => {
    setEditIndex(idx);
    setMateriaToEdit(materias[idx]);
    setModalOpen(true);
  };

  const calcularHomologacion = async () => {
    const payload = {
      tipo_documento: header.tipoDoc,
      cedula: header.cedula,
      nombre: header.nombre,
      materias_antiguas: materias.map(mat => ({
        nombre: mat.nombre,
        nota: Number(mat.nota)
      }))
    };

    try {
      const response = await axios.post(
        "http://localhost:3001/homologacion/pensum/viejo",
        payload
      );
      const nuevasMaterias = response.data?.materias || [];

      // Agregar campos `homologable` y `nombreHomologable` si vienen de la API
      const materiasConHomologacion = materias.map(mat => {
        const match = nuevasMaterias.find(nm => nm.nombre === mat.nombre);
        return {
          ...mat,
          homologable: !!match,
          nombreHomologable: match?.nombre_homologada || ""
        };
      });

      setMaterias(materiasConHomologacion);
      alert("✅ Homologación calculada y lista para exportar en PDF.");
    } catch (error) {
      console.error("❌ Error al calcular homologación:", error);
      alert("❌ Error al calcular homologación");
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <HeaderForm
        header={header}
        setHeader={setHeader}
        setHeaderValid={setHeaderValid}
      />

      <HomologacionTable
        materias={materias}
        onAddClick={() => {
          setEditIndex(null);
          setMateriaToEdit(null);
          setModalOpen(true);
        }}
        headerValid={headerValid}
        onUpdate={handleEditMateria}
        onDelete={handleDeleteMateria}
      />

      <div style={{ textAlign: "center", marginTop: "2rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={calcularHomologacion}
          disabled={!headerValid || materias.length === 0}
        >
          Calcular Homologación desde API
        </Button>

        <GenerarPdfButton
          header={{
            tipoDoc: header.tipoDoc,
            cedula: header.cedula,
            nombre: header.nombre
          }}
          materias={materias}
        />
      </div>

      <AgregarMateriaModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onAdd={handleAddMateria}
        editIndex={editIndex}
        materiaToEdit={materiaToEdit}
        onUpdate={handleUpdateMateria}
      />
    </Container>
  );
}
