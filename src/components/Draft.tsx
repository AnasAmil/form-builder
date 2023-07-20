import React, { useState } from 'react'
import { InputInterface } from '../Types'
import { Button, Checkbox, FormControl, FormControlLabel, InputLabel, OutlinedInput } from '@mui/material'

interface childProps {
    input: InputInterface;
    confirmDraft: (id: number, newValue: InputInterface) => void;
    removeDraft: (id: number) => void;
}

const Draft = ({input, confirmDraft, removeDraft}:childProps) => {

  const [values, setValues] = useState<InputInterface>(input)

//   const removeDraft = () => {
//     setBoard(current => current.filter((draft) => draft.id !== input.id))
//   }

    const handleDoneClick = (id: number) => {
        confirmDraft(id, values);
    }

    const handleRemoveClick = (id: number) => {
        removeDraft(id);
    }

  return (
    <div className='border-[#7DC4FC] border-2 rounded-lg p-3'>
        <header>
            <div className='border-b flex items-center justify-between'>
                <div className='flex p-2 items-center gap-2'>
                    <div style={{backgroundColor: input.color, padding: '5px', borderRadius: '5px'}}>
                        {input.icon}
                    </div>
                    <h4>{input.name}</h4>
                </div>
                <div className='flex gap-2'>
                    <Button 
                        variant='contained' 
                        size='small'
                        sx={{
                            backgroundColor: 'transparent',
                            color: '#70767A',
                            textTransform: 'none',
                            fontWeight: 'semibold',
                            border: '1px solid #E5E7EB',
                            boxShadow: 0,
                            '&:hover': {
                                backgroundColor: 'transparent',
                                boxShadow: 0
                            }
                        }}
                        onClick={() => handleRemoveClick(input.id)}
                    >Remove</Button>

                    <Button 
                        variant='contained' 
                        size='small'
                        sx={{
                            backgroundColor: '#238BE6',
                            color: 'white',
                            textTransform: 'none',
                            fontWeight: 'semibold',
                            boxShadow: 0,
                            '&:hover': {
                                backgroundColor: '#238BE6',
                                boxShadow: 0
                            }
                        }}
                        onClick={() => handleDoneClick(input.id)}
                    >Done</Button>
                </div>
            </div>
        </header>
        <div className='mt-5 flex flex-col gap-3'>
            <FormControl required variant='outlined' fullWidth size='small' >
                <InputLabel htmlFor="label-input">Label</InputLabel>
                <OutlinedInput type='text' id="label-input" value={values.label} onChange={(e) => setValues({...values, label: e.target.value})}/>
            </FormControl>

            <FormControl required variant='outlined' fullWidth size='small'>
                <InputLabel htmlFor="placeholder-input">Placeholder</InputLabel>
                <OutlinedInput type='text' id="placeholder-input" value={values.placeholder} onChange={(e) => setValues({...values, placeholder: e.target.value})}/>
            </FormControl>
            <h4>Settings</h4>
            <FormControlLabel required control={<Checkbox  checked={values.required} onChange={(e) => setValues({...values, required: e.target.checked})} />} label="Required"/>
        </div>
     </div>
  )
}

export default Draft