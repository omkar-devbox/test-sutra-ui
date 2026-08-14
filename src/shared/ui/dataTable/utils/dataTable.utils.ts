import type { ColumnDef } from "../types/dataTable.types";

export const calculateOffset = (
  cols: ColumnDef<any>[],
  index: number,
  direction: "left" | "right",
  sizing: Record<string, number>,
) => {
  if (direction === "left") {
    return cols
      .slice(0, index)
      .reduce((acc, col) => acc + (sizing[col.id] || col.width || 150), 0);
  } else {
    return cols
      .slice(index + 1)
      .reduce((acc, col) => acc + (sizing[col.id] || col.width || 150), 0);
  }
};

/**
 * Calculates the initial minimum width for a column based on explicit config or content measurement.
 */
export const calculateColumnMinWidth = <T,>(
  column: ColumnDef<T>,
  data: T[],
): number => {
  if (column.width !== undefined && column.width > 0) {
    return column.width;
  }
  return calculateColumnContentWidth(column, data);
};

/**
 * Dynamically calculates the optimal content-fit width for any column without hardcoded column IDs.
 */
export const calculateColumnContentWidth = <T,>(
  column: ColumnDef<T>,
  data: T[],
): number => {
  const canvas = typeof document !== "undefined" ? document.createElement("canvas") : null;
  const context = canvas?.getContext("2d");

  // 1. Measure Header Label Width
  let labelWidth = 80;
  if (context && column.label) {
    context.font = "600 11px Inter, system-ui, sans-serif";
    labelWidth = context.measureText(column.label).width + 36;
  }

  // 2. Measure Row Cell Content Widths
  let maxCellWidth = 0;
  if (context && Array.isArray(data) && data.length > 0) {
    context.font = "400 13px Inter, system-ui, sans-serif";
    const sampleRows = data.slice(0, 50);

    sampleRows.forEach((row: any) => {
      let textVal = "";
      if ("key" in column && column.key && row[column.key] !== undefined && row[column.key] !== null) {
        textVal = String(row[column.key]);
      }

      let cellW = 0;
      if (textVal) {
        const measured = context.measureText(textVal).width + 36;
        cellW = Math.min(measured, 320);
      } else if (column.render) {
        cellW = column.width ?? column.minWidth ?? 90;
      }

      if (cellW > maxCellWidth) {
        maxCellWidth = cellW;
      }
    });
  }

  // 3. Compute final optimal width bounded by minWidth and maxWidth
  let calculated = Math.ceil(Math.max(labelWidth, maxCellWidth) * 1.05);

  const baseMin = column.minWidth ?? 60;
  calculated = Math.max(baseMin, calculated);

  if (column.maxWidth) {
    calculated = Math.min(calculated, column.maxWidth);
  }

  return calculated;
};
