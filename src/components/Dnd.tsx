import React, {useState} from 'react'
import {DndProvider} from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Droppables from './Droppables'

const Dnd  = () => {
  const [editMode, setEditMode] = useState<boolean>(false)
  return (
    <DndProvider backend={HTML5Backend}>
        <div className='w-full flex items-center gap-[20%] h-full'>
            <Droppables  editMode={editMode} setEditMode={setEditMode}/>
        </div>
    </DndProvider>
  )
}

export default Dnd