import React from "react";
import Button from "@mui/material/Button";

export default function CalcularHomologacionButton({ header, materias, setResultados }) {
  const handleCalcular = async () => {
    // Aquí se adapta el nombre de la propiedad para el backend
    const payload = {
      tipo_documento: header.tipoDoc, // <-- CAMBIO AQUÍ
      cedula: header.cedula,
      nombre: header.nombre,
       materias_antiguas: materias.map(mat => ({
       nombre: String(mat.nombre),
       nota: Number(mat.nota),
  })),
    };
       
    try {
      console.log("Payload enviado:", payload);
      alert("JSON que se enviará:\n" + JSON.stringify(payload, null, 2));
      const response = await fetch("https://backend-pensum-front.onrender.com/homologacion/calcular", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorMsg = await response.text();
        throw new Error(errorMsg || "Error en la petición");
      }

      const data = await response.json();
      setResultados(formatearResultados(data, header));
    } catch (err) {
      alert("Error al calcular homologación: " + err.message);
    }
  };

  function formatearResultados(data, header) {
    return {
      nombre: header.nombre,
      cedula: header.cedula,
      creditosHomologados: data.creditos_homologados || data.creditosHomologados || 0,
      creditosFaltantes: data.creditos_faltantes || data.creditosFaltantes || 0,
      materiasFaltantes: data.materias_faltantes || data.materiasFaltantes || [],
      detalleHomologacion: data.detalle_homologacion || data.detalleHomologacion || []
    };
  }

  return (
    <Button
      fullWidth
      variant="contained"
      color="primary"
      style={{ margin: "2rem 0", fontWeight: "bold", fontSize: "1.1rem" }}
      onClick={handleCalcular}
      disabled={materias.length === 0}
    >
      Calcular Homologación
    </Button>
  );
}