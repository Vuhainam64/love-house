import React from "react";
import { ReactSpreadsheetImport } from "react-spreadsheet-import";

function DataTable({ isOpen, onClose, onSubmit, fields }) {
  return (
    <div>
      <ReactSpreadsheetImport
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={onSubmit}
        fields={fields}
      />
    </div>
  );
}

export default DataTable;
