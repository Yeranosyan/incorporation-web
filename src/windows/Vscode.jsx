import { useState } from "react";
import WindowWrapper from "#hoc/WindowWrapper";
import { WindowControls } from "#components";
import {
  Files,
  Search,
  GitBranch,
  PlayCircle,
  Package,
  Settings,
  ChevronRight,
  FileText,
  Folder,
  FolderOpen,
} from "lucide-react";
import {
  vscodeFileStructure,
  vscodeSampleCodes,
  highlightJSON,
  highlightJSX,
} from "#constants";

const Vscode = () => {
  const [activeTab, setActiveTab] = useState("App.jsx");
  const [openFolders, setOpenFolders] = useState(["src", "components"]);
  const [currentCode, setCurrentCode] = useState(vscodeSampleCodes["App.jsx"]);

  const toggleFolder = (folderName) => {
    setOpenFolders((prev) =>
      prev.includes(folderName)
        ? prev.filter((f) => f !== folderName)
        : [...prev, folderName]
    );
  };

  const handleFileClick = (fileName) => {
    setActiveTab(fileName);
    setCurrentCode(vscodeSampleCodes[fileName] || `// ${fileName}`);
  };

  const renderFileTree = (items, depth = 0) => {
    return items.map((item) => (
      <div key={item.name}>
        <div
          className="file-item"
          style={{ paddingLeft: `${depth * 12 + 8}px` }}
          onClick={() =>
            item.type === "folder"
              ? toggleFolder(item.name)
              : handleFileClick(item.name)
          }
        >
          {item.type === "folder" ? (
            <>
              <ChevronRight
                size={14}
                className={`transition-transform ${
                  openFolders.includes(item.name) ? "rotate-90" : ""
                }`}
              />
              {openFolders.includes(item.name) ? (
                <FolderOpen size={14} className="text-blue-400" />
              ) : (
                <Folder size={14} className="text-blue-400" />
              )}
            </>
          ) : (
            <FileText size={14} className="ml-5 text-gray-400" />
          )}
          <span className="text-gray-300">{item.name}</span>
        </div>
        {item.type === "folder" &&
          openFolders.includes(item.name) &&
          item.children && (
            <div>{renderFileTree(item.children, depth + 1)}</div>
          )}
      </div>
    ));
  };

  return (
    <>
      <div id="window-header">
        <WindowControls target="vscode" />
        <h2>Visual Studio Code</h2>
      </div>

      <div className="flex h-150 bg-[#1e1e1e] text-gray-300">
        <div className="activity-bar">
          <Files size={20} className="cursor-pointer hover:text-white" />
          <Search size={20} className="activity-icon" />
          <GitBranch size={20} className="activity-icon" />
          <PlayCircle size={20} className="activity-icon" />
          <Package size={20} className="activity-icon" />
          <div className="flex-1" />
          <Settings size={20} className="activity-icon" />
        </div>

        <div className="sidebar">
          <div className="explorer-title">Explorer</div>
          <div className="sidebar-content">
            <div className="project-header">
              <div className="flex items-center gap-1">
                <ChevronRight size={14} className="rotate-90" />
                ONECODIO-INC
              </div>
            </div>
            {renderFileTree(vscodeFileStructure)}
          </div>
        </div>

        <div className="editor-area">
          <div className="tabs-container">
            <div className="active-tab">
              <FileText size={14} className="text-blue-400" />
              <span>{activeTab}</span>
            </div>
          </div>

          <div className="editor-content">
            {activeTab === "logo.svg" ? (
              <div className="logo-preview">
                <img
                  src="/images/onecodio-logo.png"
                  alt="Onecodio Logo"
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            ) : (
              <pre className="text-gray-300">
                <code>
                  {currentCode.split("\n").map((line, i) => (
                    <div key={i} className="code-line">
                      <span className="line-number">{i + 1}</span>
                      <span
                        dangerouslySetInnerHTML={{
                          __html:
                            activeTab === "package.json"
                              ? highlightJSON(line)
                              : highlightJSX(line),
                        }}
                      />
                    </div>
                  ))}
                </code>
              </pre>
            )}
          </div>

          <div className="status-bar">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <GitBranch size={12} />
                main
              </span>
              <span>○ 0 ⚠ 0</span>
            </div>
            <div className="flex items-center gap-4">
              <span>Ln 1, Col 1</span>
              <span>Spaces: 2</span>
              <span>UTF-8</span>
              <span>JSX</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const VscodeWindow = WindowWrapper(Vscode, "vscode");
export default VscodeWindow;
