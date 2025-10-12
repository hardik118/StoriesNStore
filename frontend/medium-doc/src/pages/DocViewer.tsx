import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import WebViewer from "@pdftron/webviewer";

export const DocViewerPage = () => {
  const location = useLocation();
  const { docUrl, title, author, desc } = location.state || {};

  const viewerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (viewerRef.current && docUrl) {
      WebViewer(
        {
          path: "/lib", // path to the WebViewer lib folder in public
          initialDoc: docUrl,
        },
        viewerRef.current
      ).then(() => {
        // Optional: you can use instance.UI or instance.docViewer here
      });
    }
  }, [docUrl]);

  return (
    <div className="w-full h-screen flex flex-col">
      {/* ----------- Header / Placeholder for Doc Info ----------- */}
      <div className="h-24 w-full flex justify-between items-center px-6 border-b bg-white shadow-sm">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold">{title || "Untitled Document"}</h1>
          <div className="flex gap-2 text-sm text-gray-600">
            <span>By {author || "Unknown"}</span>
            <span className="text-gray-400 italic">{desc || ""}</span>
          </div>
        </div>
      </div>

      {/* ----------- Document Viewer ----------- */}
      <div className="flex-1 w-full bg-gray-100 p-4">
        {docUrl ? (
          <div
            className="w-full h-full border rounded-lg shadow overflow-hidden bg-white"
            ref={viewerRef}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            No document selected
          </div>
        )}
      </div>
    </div>
  );
};
