import React, { useState } from 'react'
import { InputInterface } from '../Types'
import { Button, Checkbox,  Chip,  FormControlLabel, TextField } from '@mui/material'
import { IconSquareRoundedPlusFilled } from '@tabler/icons-react';

interface childProps {
    input: InputInterface;
    confirmDraft: (id: number, newValue: InputInterface) => void;
    removeDraft: (id: number) => void;
}

const Draft = ({input, confirmDraft, removeDraft}:childProps) => {

  const [values, setValues] = useState<InputInterface>(input)
  const [newOption, setNewOption] = useState<string>('')


    const handleDoneClick = (id: number) => {
        confirmDraft(id, values);
    }

    const handleRemoveClick = (id: number) => {
        removeDraft(id);
    }

    const addOption = () => {
        setValues((prevValues) => ({...prevValues, options: [...prevValues.options, newOption]}))
    }
    
    
  return (
    <div className='Draft-holder'>
        <header className='Draft-header'>
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
        </header>
        <div className='mt-5 flex flex-col gap-3'>
            <TextField 
                fullWidth 
                label='Label' 
                required 
                type='text' 
                value={values.label} 
                onChange={(e) => setValues({...values, label: e.target.value})}
            />

            <TextField 
                fullWidth 
                label='Placeholder' 
                required type='text' 
                value={values.placeholder} 
                onChange={(e) => setValues({...values, placeholder: e.target.value})}
            />
            {
                input.inputType === 'select' &&
                <div className='flex flex-col gap-2'>
                    <div className='flex items-center gap-4'>
                        <TextField 
                            fullWidth 
                            label='Option' 
                            placeholder='Option'
                            value={newOption}
                            onChange={(e) => setNewOption(e.target.value)}
                        />
                        <IconSquareRoundedPlusFilled size={30} className='cursor-pointer' onClick={addOption}/>
                    </div>
                    
                    <div className='Chip-holder'>
                        {values.options.map((option, index) => (
                            <Chip  key={index} label={option} variant='outlined' />
                        ))}
                    </div>
                </div>
            }
            <h4>Settings</h4>
            <FormControlLabel required control={<Checkbox  checked={values.required} onChange={(e) => setValues({...values, required: e.target.checked})} />} label="Required"/>
        </div>
     </div>
  )
}

export default Draft