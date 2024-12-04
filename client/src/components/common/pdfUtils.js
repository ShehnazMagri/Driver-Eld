// pdfUtils.js
import jsPDF from "jspdf";
import "jspdf-autotable";

export function generatePDF({
  title,
  generalInfo = [],
  tables = [],
  filename = "report.pdf",
}) {
  const doc = new jsPDF();

  // Title setup
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  const pageWidth = doc.internal.pageSize.getWidth();
  const titleWidth = doc.getTextWidth(title);
  const titleX = (pageWidth - titleWidth) / 2;
  doc.text(title, titleX, 20);

  // Add general information
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  let yPosition = 30;
  generalInfo.forEach((info) => {
    doc.text(info, 10, yPosition);
    yPosition += 10;
  });

  // Generate tables
  tables.forEach((table, index) => {
    doc.autoTable({
      startY: yPosition + 10, // Start position below previous content
      head: [table.headers],
      body: table.rows,
      theme: "grid",
      styles: { fontSize: 10, cellPadding: 2 },
    });
    yPosition = doc.lastAutoTable.finalY;
  });

  // Save the PDF with specified filename
  doc.save(filename);
}
