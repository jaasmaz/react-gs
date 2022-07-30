import { useState, useEffect, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import './App.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

function App(props) {
  const [rowData, setRowData] = useState([]);
  const [gridApi, setGridApi] = useState('');
  const [colApi, setColApi] = useState('');
  const [modelVisibility, setModelVisibility] = useState(true);

  const gridRef = useRef();

  const onGridReady = (params) => {
    setGridApi(params.api);
    setColApi(params.columnApi);
    gridRef.current?.api.showLoadingOverlay();
  };

  useEffect(() => {
    fetch('https://gorest.co.in/public/v1/users')
      .then((result) => result.json())
      .then((rowData) => setRowData(rowData.data));
  }, []);

  useEffect(() => {
    if (colApi) {
      colApi.setColumnVisible('id', modelVisibility);
    }
  }, [modelVisibility]);

  const toggleModelVis = () => {
    setModelVisibility(!modelVisibility);
  };

  const onButtonClick = () => {
    const selectedNodes = gridApi.getSelectedNodes();
    const selectedData = selectedNodes.map((node) => node.data);
    console.log(selectedData);
  };

  const columnDefs = [
    {
      headerName: 'Id',
      field: 'id',
      sortable: true,
      filter: true,
      checkboxSelection: true,
    },
    {
      headerName: 'Name',
      field: 'name',
      sortable: true,
      filter: true,
    },
    {
      headerName: 'Gender',
      field: 'gender',
      sortable: true,
      filter: true,
    },
    {
      headerName: 'Contact',
      valueGetter: ({ data }) => `${data.email}, #916-999-9999`,
      sortable: true,
      filter: true,
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
      <button type='button' onClick={onButtonClick}>
        Get Nodes
      </button>
      <button type='button' onClick={toggleModelVis}>
        Toggle Model Column
      </button>
      {rowData.length && (
        <AgGridReact
          onGridReady={onGridReady}
          rowSelection='multiple'
          columnDefs={columnDefs}
          rowData={rowData}
          tooltipShowDelay={0}
          tooltipHideDelay={2000}
        ></AgGridReact>
      )}
    </div>
  );
}

export default App;
