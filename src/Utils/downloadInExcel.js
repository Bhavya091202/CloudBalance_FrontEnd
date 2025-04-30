import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export const downloadExcelFile = ({ rows = [], columns = [], sheetName = "Sheet1", fileName = "Export.xlsx" }) => {
  if (!rows.length) {
    alert("No data to export!");
    return;
  }

  const formattedData = rows.map(row => {
    const formattedRow = {};
    columns.forEach(col => {
      formattedRow[col.label] = row[col.key];
    });
    return formattedRow;
  });

  const worksheet = XLSX.utils.json_to_sheet(formattedData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([excelBuffer], { type: "application/octet-stream" });

  saveAs(blob, fileName);
};
