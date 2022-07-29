import { useRef } from 'react';
import './App.css';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

function App(props) {
  const gridRef = useRef();
  function onGridReady() {
    gridRef.current?.api.showLoadingOverlay();
  }

  const columnDefs = [
    {
      headerName: 'Make',
      field: 'make',
      sortable: true,
      filter: true,
      checkboxSelection: true,
    },
    {
      headerName: 'Model',
      field: 'model',
      sortable: true,
      filter: true,
    },
    {
      headerName: 'Price',
      field: 'price',
      sortable: true,
      filter: true,
    },
  ];

  const rowData = [
    {
      make: 'Toyota',
      model: 'Celica',
      price: 35000,
    },
    {
      make: 'Ford',
      model: 'Mondeo',
      price: 32000,
    },
    {
      make: 'Porsche',
      model: 'Boxter',
      price: 72000,
    },
  ];

  return (
    <div
      className='ag-theme-balham'
      style={{
        height: '500px',
        width: '600px',
      }}
    >
      <AgGridReact
        onGridReady={onGridReady}
        columnDefs={columnDefs}
        rowData={rowData}
        tooltipShowDelay={0}
        tooltipHideDelay={2000}
      ></AgGridReact>
    </div>
  );
}

export default App;
