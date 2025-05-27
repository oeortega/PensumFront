import React from "react";
import { Button } from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

const GenerarPdfButton = () => {
  const handleDownload = async () => {
    try {
      const response = await fetch("http://localhost:3001/homologacion/reporte/pdf", {
        method: "GET",
        headers: {
          Accept: "application/pdf"
        }
      });

      if (!response.ok) {
        throw new Error("Error al descargar el PDF");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(new Blob([blob]));

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "reporte_homologacion.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error al generar el PDF:", error);
      alert("Hubo un problema al generar el PDF.");
    }
  };

  return (
    <Button
      variant="contained"
      color="primary"
      startIcon={<PictureAsPdfIcon />}
      onClick={handleDownload}
    >
      Descargar PDF
    </Button>
  );
};

export default GenerarPdfButton;
