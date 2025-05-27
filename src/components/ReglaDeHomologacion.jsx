import React from "react";
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip } from "@mui/material";

// Equivalencias de asignaturas: plan vigente => plan propuesto
const equivalencias = [
  { vigente: "Cálculo Diferencial", propuesto: "Cálculo Diferencial" },
  { vigente: "Algoritmos y Fundamentos de programación", propuesto: "Algoritmos y Fundamentos de programación" },
  { vigente: "Introducción a la Ingeniería de Sistemas", propuesto: "Introducción a la Ingeniería de Sistemas" },
  { vigente: "Cátedra Upecista", propuesto: "Cátedra Upecista" },
  { vigente: "Comunicación Oral y Escrita I", propuesto: "Comunicación Oral y Escrita I" },
  { vigente: "Algebra Lineal", propuesto: "Algebra Lineal" },
  { vigente: "Lengua Extranjera Gramática", propuesto: "Tech English I" },
  { vigente: "Actividad Deportiva", propuesto: "Actividad Deportiva" },
  { vigente: "Matemática Discreta", propuesto: "Lógica Matemática" },
  { vigente: "Cálculo Integral", propuesto: "Cálculo Integral" },
  { vigente: "Mecánica", propuesto: "Mecánica" },
  { vigente: "Programación de Computadores I", propuesto: "Programación de Computadores I" },
  { vigente: "Comunicación Oral y Escrita II", propuesto: "Comunicación Oral y Escrita II" },
  { vigente: "Humanidades I", propuesto: "Humanidades I" },
  { vigente: "Lengua Extranjera Lectura", propuesto: "Tech English I" },
  { vigente: "Humanidades II", propuesto: "Humanidades II" },
  { vigente: "Cálculo Multivariable", propuesto: "Cálculo Multivariable" },
  { vigente: "Programación de Computadores II", propuesto: "Programación de Computadores II" },
  { vigente: "Estructura de Datos", propuesto: "Estructura de Datos" },
  { vigente: "Actividad Cultural", propuesto: "Actividad Cultural" },
  { vigente: "Lengua Extranjera Escritura", propuesto: "Tech English II" },
  { vigente: "Ondas", propuesto: "Ondas" },
  { vigente: "Semillero de Investigación", propuesto: "Semillero de Investigación" }, // No hay equivalente directo
  { vigente: "Electromagnetismo", propuesto: "Electromagnetismo" },
  { vigente: "Estadística Descriptiva e Inferencial", propuesto: "Estadística Descriptiva e Inferencial" },
  { vigente: "Lengua Extranjera Conversación", propuesto: "Tech English II" },
  { vigente: "Ecuaciones Diferenciales", propuesto: "Ecuaciones Diferenciales" },
  { vigente: "Programación de Computadores III", propuesto: "Programación de Computadores III" },
  { vigente: "Base de Datos", propuesto: "Base de Datos" },
  { vigente: "Metodología de Investigación", propuesto: "Metodología de Investigación" },
  { vigente: "Análisis Numéricos", propuesto: "Análisis Numérico" },
  { vigente: "Investigación de Operaciones", propuesto: "Investigación de Operaciones" },
  { vigente: "Arquitectura de Computadores", propuesto: "Arquitectura de Computadores" },
  { vigente: "Programación Web", propuesto: "Programación Web" },
  { vigente: "Ingeniería de Software I", propuesto: "Ingeniería de Software I" },
  { vigente: "Seminario de Investigación", propuesto: "Seminario de Investigación" },
  { vigente: "Cátedra de la Paz", propuesto: "" },
  { vigente: "Sistemas Operativos", propuesto: "Sistemas Operativos" },
  { vigente: "Modelos y Simulación", propuesto: "Modelos y Simulación" },
  { vigente: "Ingeniería de Software II", propuesto: "Ingeniería de Software II" },
  { vigente: "Programación Móvil", propuesto: "Programación Móvil" },
  { vigente: "Fundamentos de Administración", propuesto: "Electiva Ciencias Administrativas, Económicas y Contables" },
  { vigente: "Cátedra de Negocios Internacionales" , propuesto:  "Innovación y Emprendimiento Tecnológico" },
  { vigente: "Cátedra de Emprendimiento", propuesto: "" },
  { vigente: "Ingeniería Económica", propuesto: "Ingeniería Económica" },
  { vigente: "Redes y Comunicaciones", propuesto: "Redes y Comunicaciones" },
  { vigente: "Inteligencia Artificial", propuesto: "Inteligencia Artificial" },
  { vigente: "Computación Gráfica", propuesto: "Tecnologías Inmersivas" },
  { vigente: "Research Project", propuesto: "" },
  { vigente: "Sistemas de Información", propuesto: "Ingeniería de Software III" },
  { vigente: "Electiva Ciencias Administrativas, Económicas y Contables", propuesto: "Electiva Ciencias Administrativas, Económicas y Contables" },
  { vigente: "Base de Datos Avanzada", propuesto: "Base de Datos Avanzada" },
  { vigente: "Formulación y Evaluación de Proyectos de Ingeniería", propuesto: "Formulación y Evaluación de Proyectos de Ingeniería" },
  { vigente: "Electiva Gestión Ambiental", propuesto: "Cátedra Ambiental y Desarrollo Sostenible" },
  { vigente: "Electiva de profundización I", propuesto: "Optativa Profundización I" },
  { vigente: "Gestión de Proyectos TI", propuesto: "Gestión de Proyectos TI" },
  { vigente: "Seguridad Informática", propuesto: "Seguridad de la Información" },
  { vigente: "Electiva Básica de Ingeniería", propuesto: "Electiva Básica de Ingeniería" },
  { vigente: "Electiva de profundización II", propuesto: "Optativa Profundización II" },
  { vigente: "Electiva de profundización III", propuesto: "Optativa Profundización III" },
  { vigente: "Auditoria de Sistemas", propuesto: "" },
  { vigente: "Legislación de Sistemas", propuesto: "" },
  { vigente: "Proyecto de Grado I", propuesto: "Proyecto de Grado I" },
  { vigente: "Ética Profesional", propuesto: "Ética Profesional" },
  { vigente: "Electiva de profundización IV", propuesto: "Optativa Profundización IV" },
  { vigente: "Electiva de profundización V", propuesto: "Optativa Profundización V" },
  { vigente: "Proyecto de Grado II", propuesto: "Proyecto de Grado II" }
];

// Normaliza nombres para comparar
function normalizar(nombre) {
  return nombre.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
}

/**
 * materias = array de objetos { nombre: "Cálculo Diferencial", ... }
 */
export default function ReglaDeHomologacion({ materias }) {
  // Saca los nombres de las materias homologables
  const equivalenciasSet = new Set(equivalencias.map(eq => normalizar(eq.vigente)));

  return (
    <Box mt={4}>
      <Typography variant="h6" color="primary" gutterBottom>
        Resultado de Homologación
      </Typography>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell><b>Asignatura Seleccionada</b></TableCell>
              <TableCell><b>¿Homologable?</b></TableCell>
              <TableCell><b>Asignatura Equivalente (Nuevo Plan)</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {materias.map((mat, idx) => {
              const nombreNorm = normalizar(mat.nombre);
              const equivalencia = equivalencias.find(eq => normalizar(eq.vigente) === nombreNorm);
              const homologable = Boolean(equivalencia && equivalencia.propuesto);

              return (
                <TableRow key={idx}>
                  <TableCell>{mat.nombre}</TableCell>
                  <TableCell>
                    {homologable
                      ? <Chip label="Sí puede homologar" color="success" />
                      : <Chip label="No puede homologar" color="error" />
                    }
                  </TableCell>
                  <TableCell>
                    {homologable
                      ? equivalencia.propuesto
                      : <em>No tiene equivalencia directa</em>
                    }
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography mt={2} color="textSecondary" fontSize={14}>
        La homologación depende de las equivalencias definidas por la Universidad. Si una materia no es homologable, consulta con la coordinación del programa.
      </Typography>
    </Box>
  );
}