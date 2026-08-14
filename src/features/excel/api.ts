import apiClient from "@/app/api/client/api-client";

/* ================================================================
 * Excel & CSV Deep Parser & LLM Modifier API Interfaces
 * ================================================================ */

export interface FormulaInfo {
  coordinate: string;
  formula: string;
}

export interface CommentInfo {
  coordinate: string;
  author?: string;
  text?: string;
}

export interface HyperlinkInfo {
  coordinate: string;
  target?: string;
  location?: string;
  tooltip?: string;
}

export interface RowSizingInfo {
  row: number;
  height?: number;
  custom_height?: boolean;
  hidden?: boolean;
}

export interface ColumnSizingInfo {
  column: string;
  width?: number;
  custom_width?: boolean;
  hidden?: boolean;
}

export interface TableInfo {
  name: string;
  displayName: string;
  range: string;
  columns: string[];
}

export interface DataValidationInfo {
  type?: string;
  formula1?: string;
  formula2?: string;
  sqref?: string;
  allow_blank?: boolean;
  errorTitle?: string;
  error?: string;
}

export interface ConditionalFormattingInfo {
  sqref: string;
  rules: {
    type?: string;
    operator?: string;
    formula?: string[];
  }[];
}

export interface SheetProtectionInfo {
  is_protected: boolean;
  password_hash?: string | null;
  permissions?: Record<string, boolean>;
}

export interface ExcelSheetMetadata {
  sheet_name: string;
  max_row: number;
  max_column: number;
  merged_cells: string[];
  freeze_panes?: string | null;
  auto_filter_range?: string | null;
  formulas: FormulaInfo[];
  comments?: CommentInfo[];
  hyperlinks?: HyperlinkInfo[];
  row_sizing?: RowSizingInfo[];
  column_sizing?: ColumnSizingInfo[];
  hidden_rows?: number[];
  hidden_columns?: string[];
  tables?: TableInfo[];
  data_validations?: DataValidationInfo[];
  conditional_formatting?: ConditionalFormattingInfo[];
  images?: { count: number };
  charts?: { count: number; details?: { title: string; type: string }[] };
  sheet_protection?: SheetProtectionInfo;
  page_setup?: Record<string, any>;
  print_settings?: Record<string, any>;
  detected_header_row_index?: number;
  headers?: string[];
  total_preview_rows?: number;
  first_10_data_rows?: Record<string, any>[];
}

export interface ExcelAnalysisData {
  filename: string;
  file_size_bytes: number;
  sheet_count: number;
  sheet_names: string[];
  sheets: ExcelSheetMetadata[];
}

export interface ExcelAnalysisResponse {
  status: string;
  message: string;
  data: ExcelAnalysisData;
}

export interface PromptModificationResult {
  blob: Blob;
  modifiedFilename: string;
  actionLogs: string[];
}

export interface ModelStatusInfo {
  connected: boolean;
  status: "connected" | "active_rule_engine";
  model_dir: string;
  available_models: string[];
  llama_python_installed: boolean;
  http_server_active: boolean;
  mode: string;
  active_model: string;
}

/* ================================================================
 * API Service Functions
 * ================================================================ */

/**
 * Uploads an Excel (.xlsx, .xlsm, .xls) or CSV file for deep metadata analysis & preview
 */
export async function uploadAndAnalyzeFile(file: File): Promise<ExcelAnalysisData> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await apiClient.post<ExcelAnalysisResponse>("/upload", formData);

  if (response.data?.status === "success" && response.data?.data) {
    return response.data.data;
  }
  
  if ((response.data as unknown as ExcelAnalysisData)?.sheet_names) {
    return response.data as unknown as ExcelAnalysisData;
  }

  throw new Error(response.data?.message || "Failed to analyze Excel/CSV file");
}

/**
 * Fetches status of local GGUF models or LLM engine
 */
export async function fetchModelStatus(): Promise<ModelStatusInfo> {
  const response = await apiClient.get<ModelStatusInfo>("/model-status");
  return response.data;
}

/**
 * Sends natural language prompt instructions and optional target file to /prompt.
 * Returns the modified Excel file blob, modified filename, and action execution logs.
 */
export async function modifyExcelWithPrompt(
  prompt: string,
  file?: File | null
): Promise<PromptModificationResult> {
  const formData = new FormData();
  formData.append("prompt", prompt);
  
  if (file) {
    formData.append("file", file);
  }

  const response = await apiClient.post<Blob>("/prompt", formData);
  const blob = response.data instanceof Blob ? response.data : new Blob([response.data as unknown as BlobPart]);

  const modifiedFilename =
    response.headers.get("X-Modified-Filename") ||
    response.headers.get("x-modified-filename") ||
    (file ? (file.name.startsWith("modified_") ? file.name : `modified_${file.name}`) : "modified_excel_data.xlsx");

  const actionLogsHeader =
    response.headers.get("X-Action-Logs") ||
    response.headers.get("x-action-logs");
  const actionLogs = actionLogsHeader
    ? actionLogsHeader.split("; ").filter(Boolean)
    : ["Modified worksheet according to prompt instructions."];

  return {
    blob,
    modifiedFilename: decodeURIComponent(modifiedFilename),
    actionLogs,
  };
}
