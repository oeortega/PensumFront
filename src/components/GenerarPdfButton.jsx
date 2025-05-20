import React from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import logoUcesar from "../assets/logoUcesar";


export default function GenerarPdfButton({ header, materias }) {
  const handleGenerarPdf = () => {
    const doc = new jsPDF();

    // Logo y encabezado institucional
    doc.addImage(logoUcesar, "PNG", 10, 8, 25, 20);
    doc.setFontSize(13);
    doc.setTextColor("#388e3c");
    doc.setFont("helvetica", "bold");
    doc.text("Universidad Popular del Cesar", 40, 18);
    doc.setFontSize(11);
    doc.setTextColor("#1976d2");
    doc.text("Programa Ingeniería de Sistemas", 40, 25);

    doc.setFontSize(9);
    doc.setTextColor("#000");
    doc.text(`Valledupar, ${new Date().toLocaleDateString()}`, 150, 18);

    // Info destinatario
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("Ingeniero", 10, 35);
    doc.setFont("helvetica", "bold");
    doc.text("ARMANDO LUIS CORTES DE ARMAS", 10, 40);
    doc.setFont("helvetica", "normal");
    doc.text("Presidente Consejo de Facultad Ingeniería y Tecnológicas", 10, 45);
    doc.text("UNIVERSIDAD POPULAR DEL CESAR", 10, 50);

    doc.setFont("helvetica", "bold");
    doc.text(
      `Asunto: Estudio de Transferencia Interna:  ${header.nombre?.toUpperCase() || ""}`,
      10,
      57
    );

    // Cuerpo de carta
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    const cuerpo = [
      `Cordial saludo:`,
      `Por medio del presente envío estudio de homologación de asignaturas, presentada por el estudiante`,
      `${header.nombre?.toUpperCase() || ""} identificado con cédula No. ${header.cedula || ""}.`,
      `A continuación, se detalla el informe de Homologación de asignaturas realizadas al aspirante teniendo en cuenta lo dispuesto en el Acuerdo 016 de diciembre del 2005 por el cual se reglamenta la Homologación de Asignaturas en los diferentes programas de la Universidad Popular del Cesar.`,
      `Se adjunta la siguiente relación de Homologación de Asignaturas por que Cumple con el Artículo Décimo del Acuerdo 016 de 2005.`,
    ];
    doc.text(cuerpo.join("\n\n"), 10, 65, { maxWidth: 190 });

    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text("Relación de Asignaturas Homologadas:", 10, 110);

    // Tabla de homologaciones
    autoTable(doc, {
      startY: 115,
      head: [
        [
          "ASIGNATURA",
          "ASIGNATURA HOMOLOGADA",
          "CÓDIGO",
          "NOTA"
        ]
      ],
      body: materias.map((m) => [
        m.nombre,
        m.nombre, // Puedes cambiar si tienes nombre homologado diferente
        m.id,
        m.nota,
      ]),
      theme: "grid",
      styles: {
        halign: "center",
        fontSize: 9,
        cellPadding: 2,
      },
      headStyles: {
        fillColor: [39, 174, 96],
        textColor: "#fff",
        fontStyle: "bold"
      },
      margin: { left: 10, right: 10 },
      tableWidth: 190,
    });

    // Firma y contacto
    let y = doc.lastAutoTable.finalY + 12;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text("Atentamente,", 10, y);

    


    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text("ALVARO OÑATE BOWEN", 10, y + 20);
    doc.setFont("helvetica", "normal");
    doc.text("Director Departamento de Ingeniería de Sistemas", 10, y + 25);
    doc.text("Universidad Popular del Cesar", 10, y + 30);

    doc.setTextColor("#388e3c");
    doc.setFontSize(9);
    doc.text("Teléfono conmutador PBX: (+57 605 588 5592)", 10, y + 37);
    doc.text("Valledupar - Cesar, Colombia", 10, y + 41);

    doc.save("homologacion.pdf");
  };

  return (
    <button
      style={{
        marginTop: 16,
        background: "#27ae60",
        color: "#fff",
        border: "none",
        padding: "12px 24px",
        borderRadius: 6,
        fontWeight: "bold",
        cursor: "pointer",
        boxShadow: "0 2px 8px #0001",
        transition: "background 0.2s, box-shadow 0.2s",
      }}
      onMouseOver={e => (e.target.style.background = "#219150")}
      onMouseOut={e => (e.target.style.background = "#27ae60")}
      onClick={handleGenerarPdf}
    >
      Generar PDF Institucional
    </button>
  );
}