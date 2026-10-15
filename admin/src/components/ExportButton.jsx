import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function ExportButton() {
  const exportPDF = async () => {
    const element = document.getElementById("dashboard");
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("landscape");
    pdf.addImage(imgData, "PNG", 10, 10, 280, 160);
    pdf.save("church-dashboard.pdf");
  };

  return (
    <button
      onClick={exportPDF}
      className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
    >
      Export Report
    </button>
  );
}
