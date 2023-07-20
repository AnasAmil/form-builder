import React, { useState, Dispatch, SetStateAction } from 'react'
import Input from './Input'
import { useDrop } from 'react-dnd'
import { InputInterface } from '../Types'
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined'
import { IconForms, IconAt, IconSelect, IconCalendar, IconDeviceFloppy, IconTrash  } from '@tabler/icons-react'
import Draft from './Draft'
import { Button, FormControlLabel, Switch } from '@mui/material'

const InputList: InputInterface[] = [
    {
        id: 1,
        label: 'text',
        required: false,
        name: 'Text Field',
        type: 'text',
        placeholder: 'text',
        icon: <IconForms color='#297587' />,
        color: '#E9F7FD',
        isDraft: true,
    },
    {
        id: 2,
        label: 'email',
        required: true,
        name: 'Email',
        type: 'email',
        placeholder: 'email',
        icon: <IconAt color='#268D8D'/>,
        color: '#E9FDFD',
        isDraft: true,
    },
    {
        id: 3,
        label: 'dropDown',
        required: false,
        name: 'Dropdown',
        type: 'option',
        placeholder: 'option',
        icon: <IconSelect color='#61127A'/>,
        color: '#F6E9FE',
        isDraft: true,
    },
    {
        id: 4,
        label: 'date',  
        required: false,    
        name: 'Date Field',
        type: 'date',
        placeholder: 'date',
        icon: <IconCalendar color='#2F7FC9'/>,
        color: '#E7F5FF',
        isDraft: true,
    }
]

interface DroppableProps {
    editMode: boolean;
    setEditMode: Dispatch<SetStateAction<boolean>>;
}

const Droppables = ({editMode, setEditMode}: DroppableProps) => {

  const [board, setBoard] = useState<InputInterface[]>([])

  const [{isOver}, drop] = useDrop(() => ({
    accept: "Input",
    drop: (item: InputInterface) => addInputToBoard(item),
    collect: (monitor) => ({
        isOver: !!monitor.isOver()
    })
  }))


  const addInputToBoard = (input: InputInterface) => {
    setBoard((board) => [...board, {...input, id: Math.floor(Math.random() * (100 - 1 + 1)) + 1}])
    
  }

  const confirmDraft = (id:number, newValue:InputInterface) => {
    setBoard((current) =>
        current.map((draft) => (draft.id === id ? {...draft, ...newValue, isDraft: !draft.isDraft} : draft))
   )   
  }
  
  const removeDraft = (id: number) => {
    setBoard(current => current.filter((draft) => draft.id !== id))
  }
  
  return (
    <>
        {
            editMode && 
            <div className={`min-h-[200px] min-w-[250px] h-full border-r flex flex-col items-center px-3 gap-3 sidebar `}>
                <div className='flex font-semibold gap-1 py-4'>
                    <DashboardOutlinedIcon sx={{color: '#87D6F1'}} />
                    <h2>Form Elements</h2>
                </div>
                {
                    InputList.map((input) => {
                        return (
                            <Input input={input} key={input.id}/>
                        )
                    })
                }
            </div>
        }
        
        <div className='flex flex-col items-end'>
            <FormControlLabel sx={{paddingY: '5px'}} label='Edit Mode' control={<Switch checked={editMode} onChange={(e) => setEditMode(e.target.checked)}/>} />
            {
                editMode &&
                <div className='flex flex-col items-end'>
                    <div ref={drop} className=' min-w-[700px] h-[500px] border border-dashed rounded-lg p-5 flex flex-col gap-3 overflow-y-scroll' >
                    {
                        board.map((input) => {
                            if (input.isDraft) {
                                return <Draft key={input.id} input={input} confirmDraft={confirmDraft} removeDraft={removeDraft} />
                            }
                            return <h1 key={input.id}>{input.label}</h1>
                        })
                    }
                    
                    </div>

                    <div className='py-5 flex gap-2'>
                        <Button
                            sx={{
                                backgroundColor: '#F44336',
                                color: 'white',
                                textTransform: 'none',
                                fontWeight: 'semibold',
                                boxShadow: 0,
                                '&:hover': {
                                    backgroundColor: '#F44336',
                                    boxShadow: 0
                                }
                            }}
                            startIcon={<IconTrash />}
                        >Clear</Button>
                        <Button
                            sx={{
                                backgroundColor: '#268D8D',
                                color: 'white',
                                textTransform: 'none',
                                fontWeight: 'semibold',
                                boxShadow: 0,
                                '&:hover': {
                                    backgroundColor: '#268D8D',
                                    boxShadow: 0
                                }
                            }}
                            startIcon={<IconDeviceFloppy />}
                        >Save</Button>
                    </div>
                </div>
            }
        </div>
       
    </>
  )
}

export default Droppables