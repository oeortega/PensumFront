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
  useMediaQuery,
  IconButton,
  Box,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTheme } from "@mui/material/styles";

/**
 * Props:
 * - materias: array de materias agregadas
 * - onAddClick: función para abrir el modal de agregar materia
 * - headerValid: booleano, true si los datos personales son válidos
 * - onUpdate: función (idx) para actualizar una materia
 * - onDelete: función (idx) para eliminar una materia
 * - duplicateWarning: string, advertencia de materia duplicada (opcional)
 */
export default function HomologacionTable({
  materias,
  onAddClick,
  headerValid,
  onUpdate,
  onDelete,
  duplicateWarning // <-- nueva prop
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const addButtonDisabled = !headerValid;
  const addButtonText = headerValid
    ? "Agregar materia"
    : "Complete datos personales";

  if (isMobile) {
    return (
      <Fade in>
        <Paper elevation={3} sx={{ p: 2, borderRadius: 3 }}>
          <Typography variant="h6" color="success.main" gutterBottom>
            Tabla de Homologación
          </Typography>
          <Button
            variant="contained"
            color="success"
            size="medium"
            startIcon={<AddIcon />}
            onClick={onAddClick}
            sx={{
              mb: 2,
              borderRadius: 2,
              fontWeight: "bold",
              minWidth: 180,
              fontSize: "1.1rem",
            }}
            disabled={addButtonDisabled}
          >
            {addButtonText}
          </Button>
          {/* Advertencia de duplicado */}
          {duplicateWarning && (
            <Typography color="error" sx={{ mb: 2, fontWeight: "bold" }}>
              {duplicateWarning}
            </Typography>
          )}
          {materias.length === 0 ? (
            <Typography align="center" sx={{ color: "#999" }}>
              No hay materias agregadas.
            </Typography>
          ) : (
            <Box display="flex" flexDirection="column" gap={2}>
              {materias.map((mat, idx) => (
                <Paper
                  key={idx}
                  elevation={1}
                  sx={{
                    p: 1,
                    borderRadius: 2,
                    background: "#f4f9f4",
                    border: "1px solid #e0e0e0",
                    position: "relative",
                  }}
                >
                  <Box display="flex" gap={1} mb={1}>
                    <IconButton
                      aria-label="Editar"
                      color="primary"
                      size="small"
                      onClick={() => onUpdate && onUpdate(idx)}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      aria-label="Eliminar"
                      color="error"
                      size="small"
                      onClick={() => onDelete && onDelete(idx)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
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
            </Box>
          )}
        </Paper>
      </Fade>
    );
  }

  return (
    <Fade in>
      <Paper elevation={3} sx={{ p: 2, borderRadius: 3 }}>
        <Typography variant="h6" color="success.main" gutterBottom>
          Tabla de Homologación
        </Typography>
        <Button
          variant="contained"
          color="success"
          size="medium"
          startIcon={<AddIcon />}
          onClick={onAddClick}
          sx={{
            mb: 2,
            borderRadius: 2,
            fontWeight: "bold",
            minWidth: 180,
            fontSize: "1.1rem",
          }}
          disabled={addButtonDisabled}
        >
          {addButtonText}
        </Button>
        {/* Advertencia de duplicado */}
        {duplicateWarning && (
          <Typography color="error" sx={{ mb: 2, fontWeight: "bold" }}>
            {duplicateWarning}
          </Typography>
        )}
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell
                  align="center"
                  sx={{
                    fontWeight: "bold",
                    background: "#27ae60",
                    color: "#fff",
                  }}
                >
                  ID
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    fontWeight: "bold",
                    background: "#27ae60",
                    color: "#fff",
                  }}
                >
                  Asignatura
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    fontWeight: "bold",
                    background: "#27ae60",
                    color: "#fff",
                  }}
                >
                  Créditos
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    fontWeight: "bold",
                    background: "#27ae60",
                    color: "#fff",
                  }}
                >
                  Semestre
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    fontWeight: "bold",
                    background: "#27ae60",
                    color: "#fff",
                  }}
                >
                  Nota
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    fontWeight: "bold",
                    background: "#27ae60",
                    color: "#fff",
                  }}
                >
                  Acciones
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {materias.length === 0 ? (
                <TableRow>
                  <TableCell align="center" colSpan={6} sx={{ color: "#999" }}>
                    No hay materias agregadas.
                  </TableCell>
                </TableRow>
              ) : (
                materias.map((mat, idx) => (
                  <TableRow key={idx} hover>
                    <TableCell align="center">{mat.id}</TableCell>
                    <TableCell align="center">{mat.nombre}</TableCell>
                    <TableCell align="center">{mat.creditos}</TableCell>
                    <TableCell align="center">{mat.semestre}</TableCell>
                    <TableCell align="center">{mat.nota}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        aria-label="Editar"
                        color="primary"
                        size="small"
                        onClick={() => onUpdate && onUpdate(idx)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        aria-label="Eliminar"
                        color="error"
                        size="small"
                        onClick={() => onDelete && onDelete(idx)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Fade>
  );
}