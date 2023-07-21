import React from 'react'
import {DndProvider} from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Droppables from './Droppables'

const Dnd  = () => {
  return (
    <DndProvider backend={HTML5Backend}>
        <div className='w-full flex items-center gap-[20%] '>
            <Droppables  />
        </div>
    </DndProvider>
  )
}

export default Dnd