import React from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Button,
  Typography,
  Fade,
  useMediaQuery
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useTheme } from "@mui/material/styles";

/**
 * Tabla responsiva de homologación de materias.
 * - En pantallas pequeñas (<600px), la tabla se transforma en una "tabla apilada" tipo móvil.
 */
export default function HomologacionTable({ materias, onAddClick }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  if (isMobile) {
    // Vista móvil: apilada
    return (
      <Fade in>
        <Paper elevation={3} sx={{ p: 2, borderRadius: 3 }}>
          <Typography variant="h6" color="success.main" gutterBottom>
            Tabla de Homologación
          </Typography>
          <Button
            variant="contained"
            color="success"
            size="small"
            startIcon={<AddIcon />}
            onClick={onAddClick}
            sx={{ mb: 2, borderRadius: 2, fontWeight: "bold" }}
          >
            Agregar materia
          </Button>
          {materias.length === 0 ? (
            <Typography align="center" sx={{ color: "#999" }}>
              No hay materias agregadas.
            </Typography>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {materias.map((mat, idx) => (
                <Paper
                  key={idx}
                  elevation={1}
                  sx={{
                    p: 1,
                    borderRadius: 2,
                    background: "#f4f9f4",
                    border: "1px solid #e0e0e0"
                  }}
                >
                  <div>
                    <strong>ID:</strong> {mat.id}
                  </div>
                  <div>
                    <strong>Asignatura:</strong> {mat.nombre}
                  </div>
                  <div>
                    <strong>Créditos:</strong> {mat.creditos}
                  </div>
                  <div>
                    <strong>Semestre:</strong> {mat.semestre}
                  </div>
                  <div>
                    <strong>Nota:</strong> {mat.nota}
                  </div>
                </Paper>
              ))}
            </div>
          )}
        </Paper>
      </Fade>
    );
  }

  // Vista escritorio: tabla tradicional
  return (
    <Fade in>
      <Paper elevation={3} sx={{ p: 2, borderRadius: 3 }}>
        <Typography variant="h6" color="success.main" gutterBottom>
          Tabla de Homologación
        </Typography>
        <Button
          variant="contained"
          color="success"
          size="small"
          startIcon={<AddIcon />}
          onClick={onAddClick}
          sx={{ mb: 2, borderRadius: 2, fontWeight: "bold" }}
        >
          Agregar materia
        </Button>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell align="center" sx={{ fontWeight: "bold", background: "#27ae60", color: "#fff" }}>ID</TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold", background: "#27ae60", color: "#fff" }}>Asignatura</TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold", background: "#27ae60", color: "#fff" }}>Créditos</TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold", background: "#27ae60", color: "#fff" }}>Semestre</TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold", background: "#27ae60", color: "#fff" }}>Nota</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {materias.map((mat, idx) => (
                <TableRow key={idx} hover>
                  <TableCell align="center">{mat.id}</TableCell>
                  <TableCell align="center">{mat.nombre}</TableCell>
                  <TableCell align="center">{mat.creditos}</TableCell>
                  <TableCell align="center">{mat.semestre}</TableCell>
                  <TableCell align="center">{mat.nota}</TableCell>
                </TableRow>
              ))}
              {materias.length === 0 && (
                <TableRow>
                  <TableCell align="center" colSpan={5} sx={{ color: "#999" }}>
                    No hay materias agregadas.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Fade>
  );
}