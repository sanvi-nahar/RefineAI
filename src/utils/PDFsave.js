import { jsPDF } from "jspdf";

export function generatePdfFromJson(data) {
  const doc = new jsPDF({ unit: "pt", format: "a4" });

  const leftMargin = 40;
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  let y = 50; // starting Y position
  const lineHeight = 20; // height per line
  const sectionGap = 25; // gap between sections

  const { refinedSpec, changeLogs, risks, consensusMap } = data;

  // Helper to add new page if y exceeds limit
  const checkPageOverflow = () => {
    if (y > pageHeight - 50) { // bottom margin
      doc.addPage();
      y = 50; // reset y for new page
    }
  };

  const addHeading = (text, fontSize = 16) => {
    checkPageOverflow();
    doc.setFontSize(fontSize);
    doc.setFont("helvetica", "bold");
    doc.text(text, leftMargin, y);
    y += lineHeight;
  };

  const addText = (text, fontSize = 12, indent = 0) => {
    doc.setFontSize(fontSize);
    doc.setFont("helvetica", "normal");
    const lines = doc.splitTextToSize(text, pageWidth - leftMargin * 2 - indent);
    lines.forEach((line) => {
      checkPageOverflow();
      doc.text(line, leftMargin + indent, y);
      y += lineHeight;
    });
  };

  // ================= Title =================
  addHeading("Product Requirement Document", 18);
  y += sectionGap;

  // ================= Refined Spec =================
  addHeading("Title");
  addText(refinedSpec.title || "N/A");
  y += 10;

  addHeading("Summary");
  addText(refinedSpec.summary || "N/A");
  y += sectionGap;

  if (refinedSpec.features?.length) {
    addHeading("Features");
    refinedSpec.features.forEach((f) => addText(`• ${f}`, 12, 10));
    y += sectionGap;
  }

  if (refinedSpec.acceptanceCriteria?.length) {
    addHeading("Acceptance Criteria");
    refinedSpec.acceptanceCriteria.forEach((ac) => addText(`• ${ac}`, 12, 10));
    y += sectionGap;
  }

  if (refinedSpec.nonFunctional) {
    addHeading("Non-Functional Requirements");
    const nf = refinedSpec.nonFunctional;
    addText(`Security: ${nf.security || "N/A"}`, 12, 10);
    addText(`Scalability: ${nf.scalability || "N/A"}`, 12, 10);
    addText(`Performance: ${nf.performance || "N/A"}`, 12, 10);
    addText(`Accessibility: ${nf.accessability || "N/A"}`, 12, 10);
    y += sectionGap;
  }

  if (refinedSpec.scope) {
    addHeading("Scope");
    if (refinedSpec.scope.inScope?.length) {
      addText("In Scope:", 12, 10);
      refinedSpec.scope.inScope.forEach((item) => addText(`- ${item}`, 12, 20));
    }
    if (refinedSpec.scope.outOfScope?.length) {
      addText("Out of Scope:", 12, 10);
      refinedSpec.scope.outOfScope.forEach((item) => addText(`- ${item}`, 12, 20));
    }
    y += sectionGap;
  }

  if (refinedSpec.milestones?.length) {
    addHeading("Milestones");
    refinedSpec.milestones.forEach((m) => addText(`• ${m}`, 12, 10));
    y += sectionGap;
  }

  if (changeLogs?.length) {
    addHeading("Change Logs");
    changeLogs.forEach((log) => addText(`• ${log}`, 12, 10));
    y += sectionGap;
  }

  if (risks?.length) {
    addHeading("Risks");
    risks.forEach((risk) => {
      addText(`• ${risk.description || "N/A"} [Severity: ${risk.severity || "N/A"}]`, 12, 10);
      addText(`  Mitigation: ${risk.mitigration || "N/A"}`, 12, 20);
    });
    y += sectionGap;
  }

  if (consensusMap) {
    addHeading("Consensus Map");
    Object.entries(consensusMap).forEach(([role, value]) => {
      addText(`• ${role.charAt(0).toUpperCase() + role.slice(1)}: ${value || "N/A"}`, 12, 10);
    });
    y += sectionGap;
  }

  doc.save("PRD.pdf");
}
