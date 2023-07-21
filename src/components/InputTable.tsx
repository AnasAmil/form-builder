import React from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { InputInterface } from '../Types';

interface InputTableProps {
  data: InputInterface[]
}

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Input Name', width: 150 },
    { field: 'label', headerName: 'Label', width: 150 },
    { field: 'value', headerName: 'Value', width: 250 },
]

const InputTable = ({ data }: InputTableProps) => {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={data}
        columns={columns}
        checkboxSelection
      />
    </div>
  )
}

export default InputTable