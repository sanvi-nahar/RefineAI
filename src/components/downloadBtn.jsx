import React from "react";
import { generatePdfFromJson } from "../utils/PDFsave";

export default function DownloadPDF({ data }) {
  return (
    <button
      onClick={() => generatePdfFromJson(data)}
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
    >
      Download PDF
    </button>
  );
}
