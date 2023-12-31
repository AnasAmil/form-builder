import Input from './Input'
import { useDrop } from 'react-dnd'
import { InputInterface } from '../Types'
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined'
import { IconForms, IconAt, IconSelect, IconCalendar, IconDeviceFloppy, IconTrash  } from '@tabler/icons-react'
import Draft from './Draft'
import { Button} from '@mui/material'
import ConfirmedInput from './ConfirmedInput'

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

interface DroppablesProps {
    board: InputInterface[];
    setBoard: (board: InputInterface[]) => void;
    addInputToBoard: (item: InputInterface) => void;
    confirmDraft: (id: number, newValue: InputInterface) => void;
    removeDraft: (id: number) => void;
    editInput: (id:number) => void;
    setToggleTable: (toggleTable: boolean) => void; 
}


const Droppables = ({board, setBoard, addInputToBoard, confirmDraft, removeDraft, editInput, setToggleTable}:DroppablesProps) => {




  const [{isOver}, drop] = useDrop(() => ({
    accept: "Input",
    drop: (item: InputInterface) => addInputToBoard(item),
    collect: (monitor) => ({
        isOver: !!monitor.isOver()
    })
  }))

  const hasDraft = (array: InputInterface[]) => {
    return array.some((input) => input.isDraft === true)
  }

  const isSaveDisabled = hasDraft(board)
  
  return (
    <div className='Droppables-container'>
        <div className='sidebar'>
            <div className='flex font-semibold gap-1 py-4'>
                <DashboardOutlinedIcon sx={{color: '#87D6F1'}} />
                <h2>Form Elements</h2>
            </div>
            <div className='Input-container'>
                {
                    InputList.map((input) => {
                        return (
                            <Input input={input} key={input.id}/>
                        )
                    })
                }
            </div>
        </div>

        <div className='flex flex-col items-end'>
            <div ref={drop} className='Dropzone'>
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
                    disabled={isSaveDisabled}
                >Save</Button>
            </div>
        </div>
       
    </div>
  )
}

export default Droppables