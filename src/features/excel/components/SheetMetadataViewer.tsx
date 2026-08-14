import React, { useState, useMemo } from "react";
import {
  ExcelSheetMetadata,
  ExcelAnalysisData,
} from "../api";
import {
  Grid,
  FileSpreadsheet,
  Layers,
  Code,
  ShieldCheck,
  ShieldAlert,
  Search,
  CheckCircle2,
  Table as TableIcon,
  Maximize2,
  FileText,
  Sliders,
  Zap,
  Terminal,
} from "lucide-react";

interface SheetMetadataViewerProps {
  analysisData: ExcelAnalysisData;
  liveUpdateInfo?: {
    time: string;
    filename: string;
    logs: string[];
  } | null;
}

export const SheetMetadataViewer: React.FC<SheetMetadataViewerProps> = ({
  analysisData,
  liveUpdateInfo,
}) => {
  const [activeSheetIndex, setActiveSheetIndex] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<
    "preview" | "formulas" | "merged" | "protection" | "dimensions"
  >("preview");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const currentSheet: ExcelSheetMetadata | undefined =
    analysisData.sheets[activeSheetIndex];

  // Filter preview data rows based on search query
  const filteredRows = useMemo(() => {
    if (!currentSheet?.first_10_data_rows) return [];
    if (!searchQuery.trim()) return currentSheet.first_10_data_rows;

    const query = searchQuery.toLowerCase();
    return currentSheet.first_10_data_rows.filter((row) =>
      Object.values(row).some(
        (val) => val !== null && String(val).toLowerCase().includes(query)
      )
    );
  }, [currentSheet, searchQuery]);

  if (!currentSheet) {
    return (
      <div className="p-8 text-center text-slate-500">
        No sheet metadata found.
      </div>
    );
  }

  const formulaCount = currentSheet.formulas?.length || 0;
  const mergedCount = currentSheet.merged_cells?.length || 0;
  const validationCount = currentSheet.data_validations?.length || 0;
  const isProtected = currentSheet.sheet_protection?.is_protected || false;

  return (
    <div className="flex flex-col gap-6">
      {/* Live Sync Banner if modified */}
      {liveUpdateInfo && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 text-emerald-300 border border-emerald-500/30 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold shrink-0 animate-pulse">
              <Zap className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-400">
                  Live Preview Active
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Updated at {liveUpdateInfo.time}
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Reflecting changes for <strong className="text-white">{liveUpdateInfo.filename}</strong> directly in the live table & metadata below.
              </p>
            </div>
          </div>

          {liveUpdateInfo.logs && liveUpdateInfo.logs.length > 0 && (
            <div className="text-[11px] font-mono text-emerald-400/90 bg-emerald-950/80 px-3 py-1.5 rounded-xl border border-emerald-500/20 max-w-md truncate">
              <span className="text-slate-400 font-sans mr-1 font-semibold">Action:</span>
              {liveUpdateInfo.logs[liveUpdateInfo.logs.length - 1]}
            </div>
          )}
        </div>
      )}

      {/* Workbook Stats Header */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
            <Layers className="h-5 w-5" />
          </div>
          <div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Worksheets
            </div>
            <div className="text-lg font-bold text-slate-900 dark:text-slate-100">
              {analysisData.sheet_count} Sheet{analysisData.sheet_count > 1 ? "s" : ""}
            </div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
            <CheckCircle2 className="h-5 w-5" />
          </div>
          <div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Detected Header Row
            </div>
            <div className="text-lg font-bold text-slate-900 dark:text-slate-100">
              Row #{currentSheet.detected_header_row_index || 1}
            </div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-400 flex items-center justify-center font-bold">
            <Code className="h-5 w-5" />
          </div>
          <div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Excel Formulas
            </div>
            <div className="text-lg font-bold text-slate-900 dark:text-slate-100">
              {formulaCount} {formulaCount === 1 ? "Formula" : "Formulas"}
            </div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
            <Grid className="h-5 w-5" />
          </div>
          <div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Merged Regions
            </div>
            <div className="text-lg font-bold text-slate-900 dark:text-slate-100">
              {mergedCount} Range{mergedCount === 1 ? "" : "s"}
            </div>
          </div>
        </div>
      </div>

      {/* Sheet Tabs */}
      {analysisData.sheet_count > 1 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mr-1">
            Worksheets:
          </span>
          {analysisData.sheets.map((sheet, index) => (
            <button
              key={sheet.sheet_name || index}
              onClick={() => {
                setActiveSheetIndex(index);
                setSearchQuery("");
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeSheetIndex === index
                  ? "bg-blue-600 text-white shadow-sm shadow-blue-600/30"
                  : "bg-white dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/60"
              }`}
            >
              <FileSpreadsheet className="h-3.5 w-3.5" />
              {sheet.sheet_name}
            </button>
          ))}
        </div>
      )}

      {/* Sheet Details Container */}
      <div className="bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800/90 rounded-2xl overflow-hidden shadow-sm">
        {/* Navigation Tabs */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 px-6 pt-4 overflow-x-auto">
          <div className="flex items-center gap-6">
            <button
              onClick={() => setActiveTab("preview")}
              className={`pb-3 text-sm font-semibold flex items-center gap-2 border-b-2 transition-all ${
                activeTab === "preview"
                  ? "border-blue-600 text-blue-600 dark:text-blue-400"
                  : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
              }`}
            >
              <TableIcon className="h-4 w-4" />
              Data Preview (10 Rows)
            </button>

            <button
              onClick={() => setActiveTab("formulas")}
              className={`pb-3 text-sm font-semibold flex items-center gap-2 border-b-2 transition-all ${
                activeTab === "formulas"
                  ? "border-blue-600 text-blue-600 dark:text-blue-400"
                  : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
              }`}
            >
              <Code className="h-4 w-4" />
              Formulas & Comments
              {formulaCount > 0 && (
                <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300">
                  {formulaCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab("merged")}
              className={`pb-3 text-sm font-semibold flex items-center gap-2 border-b-2 transition-all ${
                activeTab === "merged"
                  ? "border-blue-600 text-blue-600 dark:text-blue-400"
                  : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
              }`}
            >
              <Grid className="h-4 w-4" />
              Merged Cells
              {mergedCount > 0 && (
                <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-300">
                  {mergedCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab("protection")}
              className={`pb-3 text-sm font-semibold flex items-center gap-2 border-b-2 transition-all ${
                activeTab === "protection"
                  ? "border-blue-600 text-blue-600 dark:text-blue-400"
                  : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
              }`}
            >
              {isProtected ? (
                <ShieldAlert className="h-4 w-4 text-amber-500" />
              ) : (
                <ShieldCheck className="h-4 w-4 text-emerald-500" />
              )}
              Protection & Validation
            </button>

            <button
              onClick={() => setActiveTab("dimensions")}
              className={`pb-3 text-sm font-semibold flex items-center gap-2 border-b-2 transition-all ${
                activeTab === "dimensions"
                  ? "border-blue-600 text-blue-600 dark:text-blue-400"
                  : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
              }`}
            >
              <Sliders className="h-4 w-4" />
              Sizing & Setup
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {/* TAB 1: DATA PREVIEW */}
          {activeTab === "preview" && (
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900/50">
                    Header Detected at Row #{currentSheet.detected_header_row_index || 1}
                  </span>
                  {liveUpdateInfo && (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                      <Zap className="h-3 w-3 animate-pulse text-emerald-500" /> Live Synced Preview
                    </span>
                  )}
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    Showing top 10 preview rows
                  </span>
                </div>

                <div className="relative w-64">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search in preview..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-slate-100"
                  />
                </div>
              </div>

              {currentSheet.headers && currentSheet.headers.length > 0 ? (
                <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-xl shadow-inner">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 font-semibold border-b border-slate-200 dark:border-slate-700">
                        <th className="py-2.5 px-3 w-12 text-center text-slate-400 font-mono border-r border-slate-200 dark:border-slate-700/80">
                          #
                        </th>
                        {currentSheet.headers.map((hdr, idx) => (
                          <th
                            key={idx}
                            className="py-2.5 px-4 whitespace-nowrap border-r border-slate-200 dark:border-slate-700/80 last:border-r-0"
                          >
                            {hdr}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-800/80">
                      {filteredRows.length > 0 ? (
                        filteredRows.map((row, rIdx) => (
                          <tr
                            key={rIdx}
                            className="hover:bg-blue-50/40 dark:hover:bg-blue-950/20 transition-colors"
                          >
                            <td className="py-2 px-3 text-center text-slate-400 font-mono bg-slate-50/50 dark:bg-slate-800/30 border-r border-slate-200 dark:border-slate-800">
                              {rIdx + 1}
                            </td>
                            {currentSheet.headers?.map((hdr, cIdx) => (
                              <td
                                key={cIdx}
                                className="py-2 px-4 whitespace-nowrap text-slate-800 dark:text-slate-200 border-r border-slate-200 dark:border-slate-800/80 last:border-r-0 font-sans"
                              >
                                {row[hdr] !== undefined && row[hdr] !== null
                                  ? String(row[hdr])
                                  : "-"}
                              </td>
                            ))}
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan={(currentSheet.headers?.length || 0) + 1}
                            className="py-8 text-center text-slate-400"
                          >
                            No data rows match your search query.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-8 text-center text-slate-400 border border-dashed rounded-xl">
                  No preview data or headers available for this sheet.
                </div>
              )}
            </div>
          )}

          {/* TAB 2: FORMULAS & COMMENTS */}
          {activeTab === "formulas" && (
            <div className="flex flex-col gap-6">
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 mb-3">
                  <Code className="h-4 w-4 text-blue-500" />
                  Worksheet Formulas ({formulaCount})
                </h4>

                {formulaCount > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {currentSheet.formulas.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-start justify-between gap-3"
                      >
                        <span className="px-2 py-1 rounded bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-300 font-mono font-bold text-xs shrink-0">
                          {item.coordinate}
                        </span>
                        <code className="text-xs text-emerald-600 dark:text-emerald-400 font-mono break-all text-right font-medium">
                          {item.formula}
                        </code>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-500 dark:text-slate-400 italic">
                    No formula cells detected in this sheet.
                  </p>
                )}
              </div>

              {currentSheet.comments && currentSheet.comments.length > 0 && (
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 mb-3">
                    <FileText className="h-4 w-4 text-amber-500" />
                    Cell Comments ({currentSheet.comments.length})
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {currentSheet.comments.map((cm, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-amber-500/5 dark:bg-amber-950/20 border border-amber-500/20 text-xs"
                      >
                        <div className="font-semibold text-amber-800 dark:text-amber-300 flex items-center justify-between">
                          <span>Cell {cm.coordinate}</span>
                          {cm.author && (
                            <span className="text-[10px] text-amber-600">
                              By {cm.author}
                            </span>
                          )}
                        </div>
                        <p className="text-slate-700 dark:text-slate-300 mt-1">
                          {cm.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: MERGED CELLS */}
          {activeTab === "merged" && (
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 mb-3">
                <Grid className="h-4 w-4 text-amber-500" />
                Merged Cell Ranges ({mergedCount})
              </h4>

              {mergedCount > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {currentSheet.merged_cells.map((range, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 font-mono text-xs font-semibold text-amber-800 dark:text-amber-300"
                    >
                      {range}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-500 dark:text-slate-400 italic">
                  No merged cells present in this sheet.
                </p>
              )}
            </div>
          )}

          {/* TAB 4: PROTECTION & VALIDATION */}
          {activeTab === "protection" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 mb-3">
                  <ShieldCheck className="h-4 w-4 text-blue-500" />
                  Worksheet Protection
                </h4>
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-xs">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-slate-600 dark:text-slate-400">
                      Protection Status
                    </span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        isProtected
                          ? "bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-300"
                          : "bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300"
                      }`}
                    >
                      {isProtected ? "Protected" : "Unprotected"}
                    </span>
                  </div>

                  {currentSheet.sheet_protection?.permissions && (
                    <div className="space-y-1.5 border-t border-slate-200 dark:border-slate-700/60 pt-3">
                      <p className="font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        User Permissions:
                      </p>
                      {Object.entries(
                        currentSheet.sheet_protection.permissions
                      ).map(([key, allowed]) => (
                        <div
                          key={key}
                          className="flex items-center justify-between text-[11px]"
                        >
                          <span className="text-slate-500 dark:text-slate-400 capitalize">
                            {key.replace(/_/g, " ")}
                          </span>
                          <span
                            className={
                              allowed ? "text-emerald-500" : "text-rose-500"
                            }
                          >
                            {allowed ? "Allowed" : "Locked"}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 mb-3">
                  <Sliders className="h-4 w-4 text-purple-500" />
                  Data Validation Rules ({validationCount})
                </h4>
                {validationCount > 0 ? (
                  <div className="space-y-2">
                    {currentSheet.data_validations?.map((dv, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-purple-500/5 dark:bg-purple-950/20 border border-purple-500/20 text-xs"
                      >
                        <div className="flex items-center justify-between font-semibold text-purple-800 dark:text-purple-300">
                          <span>Target: {dv.sqref}</span>
                          <span className="uppercase text-[10px] bg-purple-100 dark:bg-purple-900/60 px-1.5 py-0.5 rounded">
                            {dv.type || "Custom"}
                          </span>
                        </div>
                        {dv.formula1 && (
                          <div className="text-slate-600 dark:text-slate-400 mt-1 font-mono text-[11px]">
                            Rule: {dv.formula1}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-500 dark:text-slate-400 italic">
                    No data validation / drop-down rules set.
                  </p>
                )}
              </div>
            </div>
          )}

          {/* TAB 5: DIMENSIONS & SETUP */}
          {activeTab === "dimensions" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                <h5 className="font-semibold text-slate-800 dark:text-slate-200 mb-2 flex items-center gap-1.5">
                  <Maximize2 className="h-4 w-4 text-blue-500" /> Grid Boundaries
                </h5>
                <p className="text-slate-600 dark:text-slate-400">
                  Max Rows: <strong className="text-slate-900 dark:text-slate-100">{currentSheet.max_row}</strong>
                </p>
                <p className="text-slate-600 dark:text-slate-400 mt-1">
                  Max Columns: <strong className="text-slate-900 dark:text-slate-100">{currentSheet.max_column}</strong>
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                <h5 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">
                  Hidden Content
                </h5>
                <p className="text-slate-600 dark:text-slate-400">
                  Hidden Rows: {currentSheet.hidden_rows?.length || 0}
                </p>
                <p className="text-slate-600 dark:text-slate-400 mt-1">
                  Hidden Columns: {currentSheet.hidden_columns?.length || 0}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                <h5 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">
                  Panes & Filters
                </h5>
                <p className="text-slate-600 dark:text-slate-400">
                  Freeze Panes: {currentSheet.freeze_panes || "None"}
                </p>
                <p className="text-slate-600 dark:text-slate-400 mt-1">
                  Auto Filter: {currentSheet.auto_filter_range || "None"}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
