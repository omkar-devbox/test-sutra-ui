import React, { useState } from "react";
import { FileUploadZone } from "./components/FileUploadZone";
import { SheetMetadataViewer } from "./components/SheetMetadataViewer";
import { PromptModifierPanel } from "./components/PromptModifierPanel";
import {
  uploadAndAnalyzeFile,
  ExcelAnalysisData,
  PromptModificationResult,
} from "./api";
import {
  FileSpreadsheet,
  Loader2,
  Sparkles,
  AlertTriangle,
  RefreshCw,
  Zap,
} from "lucide-react";

export const ExcelDashboard: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [analysisData, setAnalysisData] = useState<ExcelAnalysisData | null>(
    null
  );
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const [liveUpdateInfo, setLiveUpdateInfo] = useState<{
    time: string;
    filename: string;
    logs: string[];
  } | null>(null);

  const handleFileSelect = async (
    file: File,
    isModification: boolean = false,
    modificationLogs: string[] = []
  ) => {
    setSelectedFile(file);
    setIsAnalyzing(true);
    setAnalysisError(null);

    try {
      const result = await uploadAndAnalyzeFile(file);
      setAnalysisData(result);
      if (isModification) {
        setLiveUpdateInfo({
          time: new Date().toLocaleTimeString(),
          filename: file.name,
          logs: modificationLogs,
        });
      } else {
        setLiveUpdateInfo(null);
      }
    } catch (err: any) {
      setAnalysisError(
        err.message || "Failed to analyze file. Please ensure the backend service is running."
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleModificationSuccess = async (
    result: PromptModificationResult
  ) => {
    // Create a new File instance from the modified blob so backend upload/analyze works seamlessly
    const modifiedFile = new File([result.blob], result.modifiedFilename, {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    await handleFileSelect(modifiedFile, true, result.actionLogs);
  };

  const handleClearFile = () => {
    setSelectedFile(null);
    setAnalysisData(null);
    setAnalysisError(null);
    setLiveUpdateInfo(null);
  };

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto pb-12">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 md:p-8 rounded-3xl shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="z-10">
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="h-4 w-4" />
            FastAPI + openpyxl Deep Parser & LLM Modifier
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Excel & CSV Intelligence Portal
          </h1>
          <p className="text-sm text-slate-300 max-w-2xl mt-1 leading-relaxed">
            Upload spreadsheets to extract detailed openpyxl structural metadata, auto-detect data headers, preview rows, and apply natural language modifications with instant live preview updates.
          </p>
        </div>

        {analysisData && (
          <div className="z-10 shrink-0 flex items-center gap-3">
            <button
              onClick={() => selectedFile && handleFileSelect(selectedFile, false)}
              disabled={isAnalyzing}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-white backdrop-blur transition-all"
            >
              <RefreshCw className={`h-4 w-4 ${isAnalyzing ? "animate-spin" : ""}`} />
              Re-analyze
            </button>
          </div>
        )}
      </div>

      {/* Section 1: File Upload */}
      <div className="flex flex-col gap-2">
        <FileUploadZone
          onFileSelect={(f) => handleFileSelect(f, false)}
          selectedFile={selectedFile}
          onClearFile={handleClearFile}
          isLoading={isAnalyzing}
        />
      </div>

      {/* Analysis Loading Indicator */}
      {isAnalyzing && (
        <div className="p-8 rounded-2xl border border-blue-500/20 bg-blue-500/5 dark:bg-blue-950/20 flex flex-col items-center justify-center gap-3 text-center animate-pulse">
          <Loader2 className="h-8 w-8 text-blue-600 dark:text-blue-400 animate-spin" />
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-slate-100 text-sm">
              Analyzing & Updating Live Preview...
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Extracting openpyxl cell formulas, merged ranges, styles, header index & Pandas preview
            </p>
          </div>
        </div>
      )}

      {/* Analysis Error State */}
      {analysisError && (
        <div className="p-4 rounded-2xl border border-rose-200 dark:border-rose-900/60 bg-rose-50 dark:bg-rose-950/30 flex items-center gap-3 text-rose-700 dark:text-rose-300 text-xs">
          <AlertTriangle className="h-5 w-5 shrink-0 text-rose-500" />
          <div>
            <span className="font-bold">Analysis Failed: </span>
            {analysisError}
          </div>
        </div>
      )}

      {/* Section 2: AI Prompt Modifier Suite */}
      <PromptModifierPanel
        selectedFile={selectedFile}
        onModificationSuccess={handleModificationSuccess}
      />

      {/* Section 3: Detailed openpyxl Metadata & Live Preview */}
      {analysisData ? (
        <SheetMetadataViewer
          analysisData={analysisData}
          liveUpdateInfo={liveUpdateInfo}
        />
      ) : !isAnalyzing && (
        <div className="p-12 text-center rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 flex flex-col items-center justify-center gap-3">
          <div className="h-12 w-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
            <FileSpreadsheet className="h-6 w-6" />
          </div>
          <div>
            <h4 className="font-semibold text-slate-700 dark:text-slate-300 text-sm">
              No Spreadsheet Loaded Yet
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mt-1">
              Upload an Excel (.xlsx, .xlsm) or CSV file above to inspect worksheet formulas, merged cells, protection settings, header row auto-detection, and data preview.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExcelDashboard;

