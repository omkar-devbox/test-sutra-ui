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
 * Dynamically calculates the optimal content-fit width for any column based on actual table data.
 */
export const calculateColumnContentWidth = <T,>(
  column: ColumnDef<T>,
  data: T[],
): number => {
  const canvas = typeof document !== "undefined" ? document.createElement("canvas") : null;
  const context = canvas?.getContext("2d");

  // 1. Measure Header Label Width
  let labelWidth = 80;
  if (column.label) {
    if (context) {
      context.font = "700 11px Inter, system-ui, sans-serif";
      const sortExtra = ("sortable" in column ? column.sortable !== false : false) ? 20 : 0;
      const filterExtra = column.isFilter ? 24 : 0;
      labelWidth = context.measureText(column.label).width + sortExtra + filterExtra + 36;
    } else {
      labelWidth = column.label.length * 9 + 48;
    }
  }

  // 2. Measure Row Cell Content Widths
  let maxCellWidth = 0;
  if (Array.isArray(data) && data.length > 0) {
    const sampleRows = data.slice(0, 50);

    sampleRows.forEach((row: any) => {
      let cellW = 0;

      if (column.id === "select" || column.id === "selection") {
        cellW = 48;
      } else if (column.id === "actions") {
        cellW = 160;
      } else {
        const textValuesToMeasure: string[] = [];

        if ("key" in column && column.key && row[column.key] !== undefined && row[column.key] !== null) {
          const rawVal = row[column.key];

          if (column.key === "pricePerUnit" || column.id === "pricePerUnit" || column.id === "price") {
            const formattedPrice = `₹${Number(rawVal).toFixed(2)}${row.unit ? ` / ${row.unit}` : ""}`;
            textValuesToMeasure.push(formattedPrice);
          } else if (column.key === "gsm" || column.id === "gsm") {
            textValuesToMeasure.push(`${rawVal} GSM`);
          } else if (column.key === "status" || column.id === "status") {
            textValuesToMeasure.push(`    ${rawVal}    `);
          } else {
            textValuesToMeasure.push(String(rawVal));
          }
        }

        if (row.description && (column.id === "paperTypeName" || column.id === "name" || column.id === "title")) {
          textValuesToMeasure.push(String(row.description).slice(0, 50));
        }

        if (textValuesToMeasure.length > 0) {
          let maxValW = 0;
          textValuesToMeasure.forEach((str) => {
            let measured = 0;
            if (context) {
              context.font = "500 13px Inter, system-ui, sans-serif";
              measured = context.measureText(str).width + 36;
            } else {
              measured = str.length * 8 + 36;
            }
            if (measured > maxValW) maxValW = measured;
          });
          cellW = maxValW;
        } else if (column.render) {
          cellW = column.width ?? column.minWidth ?? 100;
        }
      }

      if (cellW > maxCellWidth) {
        maxCellWidth = cellW;
      }
    });
  }

  // 3. Compute final optimal width bounded by minWidth and maxWidth
  let calculated = Math.ceil(Math.max(labelWidth, maxCellWidth) * 1.05);

  const baseMin = column.minWidth ?? 80;
  calculated = Math.max(baseMin, calculated);

  if (column.maxWidth) {
    calculated = Math.min(calculated, column.maxWidth);
  }

  return calculated;
};
