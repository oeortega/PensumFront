import React, { useState } from "react";
import { Button, CircularProgress, Typography, Box, Container } from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

const GenerarPdfButton = () => {
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const downloadPDF = async () => {
    setLoading(true);
    setMensaje("Preparando archivo PDF...");

    try {
      const response = await fetch("https://backend-pensum-front.onrender.com/homologacion/reporte/pdf", {
        method: "GET",
        headers: {
          Accept: "application/pdf"
        }
      });

      if (!response.ok) {
        throw new Error("Error al descargar el PDF");
      }

      setMensaje("Descargando archivo...");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(new Blob([blob]));

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "reporte_homologacion.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      setMensaje("¡Descarga completada!");
    } catch (error) {
      console.error("Error al generar el PDF:", error);
      alert("Hubo un problema al generar el PDF.");
      setMensaje("Error al generar el PDF");
    } finally {
      setTimeout(() => {
        setLoading(false);
        setMensaje("");
      }, 2000);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4, textAlign: "center", px: 2 }}>
      <Button
        fullWidth
        variant="contained"
        color="primary"
        startIcon={<PictureAsPdfIcon />}
        onClick={downloadPDF}
        disabled={loading}
        sx={{ fontSize: { xs: "0.9rem", sm: "1rem" }, py: 1.5 }}
      >
        {loading ? "Generando PDF..." : "Descargar PDF"}
      </Button>

      {loading && (
        <Box mt={3} display="flex" flexDirection="column" alignItems="center">
          <CircularProgress size={24} />
          <Typography variant="body2" mt={2} sx={{ fontSize: { xs: "0.8rem", sm: "0.9rem" } }}>
            {mensaje}
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default GenerarPdfButton;
