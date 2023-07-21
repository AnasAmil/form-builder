import React, { useState } from 'react'
import Input from './Input'
import { useDrop } from 'react-dnd'
import { InputInterface } from '../Types'
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined'
import { IconForms, IconAt, IconSelect, IconCalendar, IconDeviceFloppy, IconTrash  } from '@tabler/icons-react'
import Draft from './Draft'
import { Button} from '@mui/material'
import ConfirmedInput from './ConfirmedInput'
import InputTable from './InputTable'

const InputList: InputInterface[] = [
    {
        id: 1,
        label: 'text',
        required: false,
        name: 'Text Field',
        inputType: 'text',
        value: '',
        placeholder: 'text',
        options: [],
        icon: <IconForms color='#297587' />,
        color: '#E9F7FD',
        isDraft: true,
    },
    {
        id: 2,
        label: 'email',
        required: true,
        name: 'Email',
        inputType: 'email',
        value: '',
        placeholder: 'email',
        options: [],
        icon: <IconAt color='#268D8D'/>,
        color: '#E9FDFD',
        isDraft: true,
    },
    {
        id: 3,
        label: 'dropDown',
        required: false,
        name: 'Dropdown',
        inputType: 'select',
        value: '',
        placeholder: 'select',
        options : [
        ],
        icon: <IconSelect color='#61127A'/>,
        color: '#F6E9FE',
        isDraft: true,
    },
    {
        id: 4,
        label: 'date',  
        required: false,    
        name: 'Date Field',
        inputType: 'date',
        value: '',
        placeholder: 'date',
        options: [],
        icon: <IconCalendar color='#2F7FC9'/>,
        color: '#E7F5FF',
        isDraft: true,
    }
]



const Droppables = () => {

  const [board, setBoard] = useState<InputInterface[]>([])
  const [toggleTable, setToggleTable] = useState<boolean>(false)


  const [{isOver}, drop] = useDrop(() => ({
    accept: ["Input", "List_Input"],
    drop: (item: InputInterface) => addInputToBoard(item),
    collect: (monitor) => ({
        isOver: !!monitor.isOver()
    })
  }))


  const addInputToBoard = (item: InputInterface) => {
    setBoard((board) => [...board, {...item, id: Math.floor(Math.random() * (100 - 1 + 1)) + 1}])

    
  }

  const confirmDraft = (id:number, newValue:InputInterface) => {
    setBoard((current) =>
        current.map((draft) => (draft.id === id ? {...draft, ...newValue, isDraft: !draft.isDraft} : draft))
   )   
  }
  
  const removeDraft = (id: number) => {
    setBoard(current => current.filter((draft) => draft.id !== id))
  }

  const editInput =  (id: number) => {
    setBoard((current) =>
        current.map((draft) => (draft.id === id ? {...draft, isDraft: !draft.isDraft} : draft))
   ) 
  }

  const handleDrop = () => {

  }

  
  return (
    <>
        <div className={`min-w-[250px] min-h-[100vh] border-r flex flex-col items-center px-3 gap-3 sidebar `}>
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
        <div className='flex flex-col items-end'>
            <div className='flex flex-col items-end'  >
                <div ref={drop} className=' min-w-[700px] h-[500px] bg-[#F8F9FA] border border-dashed rounded-lg p-5 flex flex-col gap-3 overflow-y-scroll' onDrop={handleDrop}>
                {
                    board.map((input) => {
                        if (input.isDraft) {
                            return <Draft key={input.id} input={input} confirmDraft={confirmDraft} removeDraft={removeDraft} />
                        }
                        return <ConfirmedInput key={input.id} input={input} editInput={editInput} board={board} setBoard={setBoard} />
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
                        onClick={() => {setBoard([]); setToggleTable(false)}}
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
                        type='submit'
                        startIcon={<IconDeviceFloppy />}
                        onClick={() => setToggleTable(true)}
                    >Save</Button>
                </div>
            </div>

            {
                toggleTable && board.length > 0 &&
                <InputTable data={board}/>
            }
        </div>
       
    </>
  )
}

export default Droppables