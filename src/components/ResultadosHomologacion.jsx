import React from "react";
import GenerarPdfButton from "./GenerarPdfButton";
import {
  Paper,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Divider,
  Box
} from "@mui/material";

export default function ResultadosHomologacion({ resultados, onVolver }) {
  if (!resultados) return null;

  const header = {
    nombre: resultados.nombre,
    cedula: resultados.cedula,
    creditosHomologados: resultados.creditosHomologados,
    creditosFaltantes: resultados.creditosFaltantes
  };

  const materiasHomologadas = resultados.detalleHomologacion?.map(h => ({
    asignaturaAntigua: h.asignatura_antigua,
    asignaturaNueva: h.nombre_nueva,
    nota: h.nota
  }));

  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
      <Typography variant="h5" gutterBottom sx={{ color: "#27ae60", fontWeight: "bold" }}>
        Resultados de Homologación
      </Typography>

      <Typography variant="subtitle1" gutterBottom>
        Estudiante: <strong>{resultados.nombre}</strong>
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Documento: <strong>{resultados.cedula}</strong>
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ display: "flex", gap: 4, mb: 3, flexWrap: "wrap" }}>
        <Paper elevation={1} sx={{ p: 2, minWidth: 200, textAlign: "center" }}>
          <Typography variant="h6" sx={{ color: "#27ae60" }}>
            Créditos homologados
          </Typography>
          <Typography variant="h4" fontWeight="bold">
            {resultados.creditosHomologados}
          </Typography>
        </Paper>
        <Paper elevation={1} sx={{ p: 2, minWidth: 200, textAlign: "center" }}>
          <Typography variant="h6" sx={{ color: "#e74c3c" }}>
            Créditos faltantes
          </Typography>
          <Typography variant="h4" fontWeight="bold">
            {resultados.creditosFaltantes}
          </Typography>
        </Paper>
      </Box>

      {resultados.materiasFaltantes && resultados.materiasFaltantes.length > 0 && (
        <>
          <Typography variant="h6" gutterBottom>
            Materias faltantes para completar el programa:
          </Typography>
          <TableContainer component={Paper} sx={{ mb: 3 }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}>Código</TableCell>
                  <TableCell sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}>Asignatura</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {resultados.materiasFaltantes.map((m, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{m.codigo}</TableCell>
                    <TableCell>{m.nombre}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}

      <Typography variant="h6" gutterBottom>
        Detalle de homologación:
      </Typography>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}>Asignatura Original</TableCell>
              <TableCell sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}>Asignatura Homologada</TableCell>
              <TableCell sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}>Nota</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {materiasHomologadas && materiasHomologadas.length > 0 ? (
              materiasHomologadas.map((h, idx) => (
                <TableRow key={idx}>
                  <TableCell>{h.asignaturaAntigua}</TableCell>
                  <TableCell>{h.asignaturaNueva}</TableCell>
                  <TableCell>{h.nota}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} align="center">No hay homologaciones realizadas.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Ambos botones alineados y con mismo diseño */}
      <Box display="flex" justifyContent="center" gap={2} my={3} flexWrap="wrap">
        <Button
          variant="contained"
          color="success"
          startIcon={null}
          sx={{
            minWidth: 210,
            fontWeight: "bold",
            fontSize: "1.1rem",
            backgroundColor: "#27ae60",
            '&:hover': { backgroundColor: "#219653" },
            px: 3, py: 1.5
          }}
          // forward ref props if needed
          component={GenerarPdfButton}
          header={header}
          materias={materiasHomologadas}
        >
          Descargar PDF
        </Button>
        <Button
          variant="contained"
          color="success"
          sx={{
            minWidth: 210,
            fontWeight: "bold",
            fontSize: "1.1rem",
            backgroundColor: "#27ae60",
            '&:hover': { backgroundColor: "#219653" },
            px: 3, py: 1.5
          }}
          onClick={onVolver}
        >
          Volver a editar
        </Button>
      </Box>
    </Paper>
  );
}