import WindowWrapper from "#hoc/WindowWrapper";
import { WindowControls } from "#components";
import { Download } from "lucide-react";
import { Document, Page, pdfjs } from "react-pdf";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const CompanyProfile = () => {
  return (
    <>
      <div id="window-header">
        <WindowControls target="companyProfile" />
        <h2>Company Profile</h2>

        <a
          href="files/onecodio-company-profile.pdf"
          download
          className="cursor-pointer"
          title="Download CompanyProfile"
        >
          <Download className="icon" />
        </a>
      </div>
      <Document file="files/onecodio-company-profile.pdf">
        <Page pageNumber={1} renderTextLayer renderAnnotationLayer />
      </Document>
    </>
  );
};

const CompanyProfileWindow = WindowWrapper(CompanyProfile, "companyProfile");
export default CompanyProfileWindow;
