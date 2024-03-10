import React from "react";
import { ReactSpreadsheetImport, StepType } from "react-spreadsheet-import";

function DataTableFalse({ isOpen, onClose, onSubmit, fields, excelData }) {
  return (
    <div>
      <ReactSpreadsheetImport
        isOpen={isOpen}
        initialStepState={{
          type: StepType.validateData,
          data: excelData,
        }}
        fields={fields}
        onClose={onClose}
        onSubmit={onSubmit}
        customTheme={{
          components: {
            Button: {
              defaultProps: {
                colorScheme: "green",
              },
            },
          },
        }}
      />
    </div>
  );
}

export default DataTableFalse;
