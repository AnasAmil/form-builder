import { FormControl, InputLabel, MenuItem, Select, TextField, SelectChangeEvent } from '@mui/material'
import { useDrag } from 'react-dnd';
import React from 'react'
import { InputInterface } from '../Types'
import { IconGripVertical, IconEdit } from '@tabler/icons-react';

interface ConfirmedInputProps {
  input: InputInterface;
  editInput: (id: number) => void;
  board: InputInterface[];
  setBoard: (board: InputInterface[]) => void;
}

const ConfirmedInput = ({input, editInput, board, setBoard}:ConfirmedInputProps) => {


  const [{isDragging}, drag] = useDrag(() => ({
    type: "List_Input",
    item: input,
    collect: (monitor) => ({
        isDragging: !!monitor.isDragging()
    })
  }))

  const handleEditClick = (id: number) => {
    editInput(id)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, id:number) => {

    const updatedBoard = board.map((item) =>
      item.id === id ? { ...item, value: e.target.value } : item
   );

   setBoard(updatedBoard);
  } 


  const handleSelectChange = (e: SelectChangeEvent, id: number) => {

    const updatedBoard = board.map((item) =>
      item.id === id ? { ...item, value: e.target.value } : item
    );

    setBoard(updatedBoard);
  };

  return (
    <div className='bg-white p-5 rounded-lg shadow-md flex items-center gap-3 relative' ref={drag}>
      <div className='absolute top-[-10px] left-[-10px] bg-white p-1 rounded-2xl border cursor-pointer' onClick={() => handleEditClick(input.id)}>
        <IconEdit color='#87D6F1' />
      </div>
      {
        input.inputType === 'select' ? (
          <FormControl fullWidth>
            <InputLabel>{input.label}</InputLabel>
            <Select
              value={input.value}
              onChange={(e:SelectChangeEvent) => handleSelectChange(e, input.id)}
              required={input.required}
              label={input.label}
              name={input.label}
              size='medium'
            >
              {
                input.options.map((option, index) => (
                  <MenuItem key={index} value={option}>{option}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
        ) : (
          <TextField 
            variant='outlined' 
            fullWidth 
            size='medium'
            label={input.label}
            name={input.label}
            type={input.inputType}
            required={input.required}
            value={input.value}
            onChange={(e:React.ChangeEvent<HTMLInputElement>) => handleInputChange(e, input.id)}
          />
        )
      }
      <IconGripVertical color='#D2D7DB'/>
    </div>
  )
}

export default ConfirmedInput