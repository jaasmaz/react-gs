import { useState, useEffect, useRef, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import CustomTooltip from './customTooltip';
import GenderField from './genderField';
import './App.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

function App(props: any) {
  const [rowData, setRowData] = useState([]);
  const [gridApi, setGridApi] = useState<any>('');
  const [colApi, setColApi] = useState<any>('');
  const [modelVisibility, setModelVisibility] = useState(true);

  const gridRef: any = useRef();
  const frameworkComponents = {
    genderField: GenderField,
  };
  const onGridReady = (params: any) => {
    setGridApi(params.api);
    setColApi(params.columnApi);
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
    const selectedData = selectedNodes.map((node: any) => node.data);
    console.log(selectedData);
  };

  const onBtnExport = () => {
    gridRef.current?.api.exportDataAsCsv();
  };

  const defaultColDef = useMemo(() => {
    return {
      editable: true,
      sortable: true,
      flex: 1,
      minWidth: 100,
      filter: true,
      resizable: true,
      tooltipComponent: CustomTooltip,
    };
  }, []);

  const columnDefs = [
    {
      headerName: 'Id',
      field: 'id',
      sortable: true,
      filter: true,
      checkboxSelection: true,
      tooltipField: 'id',
      tooltipComponentParams: { color: '#ececec' },
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
      cellRenderer: 'genderField',
    },
    {
      headerName: 'Contact',
      valueGetter: ({ data }: any) => `${data.email}, #916-999-9999`,
      sortable: true,
      filter: true,
    },
    {
      headerName: 'Status',
      field: 'status',
      width: 100,
      cellRenderer: ({ value }: any) => {
        return (
          <div
            style={{
              backgroundColor: 'green',
              color: 'white',
              borderRadius: '5px',
              textAlign: 'center',
            }}
          >
            <span>{value}</span>
          </div>
        );
      },
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
      <button type='button' onClick={onBtnExport}>
        Download CSV export file
      </button>
      {rowData.length && (
        <AgGridReact
          ref={gridRef}
          onGridReady={onGridReady}
          rowSelection='multiple'
          defaultColDef={defaultColDef}
          columnDefs={columnDefs}
          rowData={rowData}
          tooltipShowDelay={0}
          tooltipHideDelay={2000}
          frameworkComponents={frameworkComponents}
        ></AgGridReact>
      )}
    </div>
  );
}

export default App;
