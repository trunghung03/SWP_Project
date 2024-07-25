import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const htmlToPdf = async (htmlContent) => {
  const element = document.createElement("div");
  element.innerHTML = htmlContent;

  const canvas = await html2canvas(element);
  const imgData = canvas.toDataURL("image/png");

  const pdf = new jsPDF();
  pdf.addImage(imgData, "PNG", 0, 0);
  return pdf.output("blob");
};
export default htmlToPdf;
