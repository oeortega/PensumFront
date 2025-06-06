import React, { useState } from "react";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";

// Combinaciones especiales
const MATERIAS_COMBINADAS = [
  {
    codigos: ['UPC06', 'UPC07'],
    nombres: [
      'LENGUA EXTRANJERA-ESCRITURA',
      'LENGUA EXTRANJERA CONVERSACIÓN'
    ],
    codigoCombinado: 'UPC06,UPC07',
    nombreCombinado: 'LENGUA EXTRANJERA-ESCRITURA,LENGUA EXTRANJERA CONVERSACIÓN'
  },
  {
    codigos: ['UPC04', 'UPC05'],
    nombres: [
      'LENGUA EXTRANJERA-GRAMATICA',
      'LENGUA EXTRANJERA-LECTURA'
    ],
    codigoCombinado: 'UPC04,UPC05',
    nombreCombinado: 'LENGUA EXTRANJERA-GRAMATICA,LENGUA EXTRANJERA-LECTURA'
  }
];

// Función que combina materias según las reglas
function combinarMaterias(materias) {
  let materiasProcesadas = [...materias];
  let nuevasMaterias = [];

  MATERIAS_COMBINADAS.forEach(combinacion => {
    // Busca si existen ambas materias en la lista
    const indices = combinacion.nombres.map(nombre =>
      materiasProcesadas.findIndex(m => m.nombre === nombre)
    );
    // Si ambas materias existen
    if (indices.every(idx => idx !== -1)) {
      // Calcula promedio de notas
      const notas = indices.map(idx => Number(materiasProcesadas[idx].nota));
      const notaProm = (
        notas.reduce((a, b) => a + b, 0) / notas.length
      ).toFixed(2);

      // Suma créditos (ajusta si es necesario)
      const creditos = indices
        .map(idx => Number(materiasProcesadas[idx].creditos || 0))
        .reduce((a, b) => a + b, 0);

      // Semestre mayor
      const semestre = Math.max(...indices.map(idx => Number(materiasProcesadas[idx].semestre)));

      // Nueva materia combinada
      nuevasMaterias.push({
        id: combinacion.codigoCombinado,
        nombre: combinacion.nombreCombinado,
        creditos,
        semestre,
        nota: notaProm
      });

      // Elimina las materias originales
      indices.sort((a, b) => b - a).forEach(idx => materiasProcesadas.splice(idx, 1));
    }
  });

  // Retorna el array final: todas las no-combinadas y las nuevas combinadas
  return [...materiasProcesadas, ...nuevasMaterias];
}

// Advierte si falta alguna materia necesaria para combinar
function advertenciasMaterias(materias) {
  return MATERIAS_COMBINADAS
    .filter(comb => {
      const presentes = comb.nombres
        .map(n => materias.some(m => m.nombre === n));
      return presentes.some(Boolean) && !presentes.every(Boolean);
    })
    .map(comb => `Para homologar "${comb.nombreCombinado}" debes agregar: ${comb.nombres.join(' + ')}`);
}

export default function CalcularHomologacionButton({ header, materias, setResultados, submitHeader }) {
  const [advertencias, setAdvertencias] = useState([]);

  const handleCalcular = async () => {
    // Mostrar advertencias si faltan materias para una combinación
    const advs = advertenciasMaterias(materias);
    if (advs.length > 0) {
      setAdvertencias(advs);
      return;
    }
    setAdvertencias([]);

    // Procesar materias antes de enviar
    const materiasFinales = combinarMaterias(materias);

    const payload = {
      tipo_documento: header.tipoDoc || "",
      cedula: header.cedula || "",
      nombre: header.nombre || "",
      materias_antiguas: materiasFinales.map(mat => ({
        nombre: String(mat.nombre), // Nombre combinado si aplica
        codigo: String(mat.id),     // Código combinado si aplica
        semestre: Number(mat.semestre),
        nota: Number(mat.nota),
        creditos: Number(mat.creditos)
      })),
    };

    console.log("Payload enviado:", payload);

    try {
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
      detalleHomologacion: data.detalle_homologacion || data.detalleHomologacion || [],
    };
  }

  return (
    <div style={{ width: "100%" }}>
      {advertencias.map((adv, i) => (
        <Alert severity="warning" key={i} sx={{ mb: 1 }}>
          {adv}
        </Alert>
      ))}
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
    </div>
  );
}