import React, { useState } from 'react'
import {DndProvider} from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Droppables from './Droppables'
import InputTable from './InputTable'
import { InputInterface } from '../Types'

const Dnd  = () => {

  const [board, setBoard] = useState<InputInterface[]>([])
  const [toggleTable, setToggleTable] = useState<boolean>(false)

  const addInputToBoard = (item: InputInterface) => {
    setBoard((current) => [...current, {...item, id: Math.floor(Math.random() * (100 - 1 + 1)) + 1}])
  }

  const confirmDraft = (id:number, newValue:InputInterface) => {
    setBoard((current) =>
        current.map((draft) => (draft.id === id ? {...draft, ...newValue, isDraft: !draft.isDraft} : draft))
   )   
  }
  
  const removeDraft = (id: number) => {
    setBoard((current) => current.filter((draft:InputInterface) => draft.id !== id))
  }

  const editInput =  (id: number) => {
    setBoard((current) =>
        current.map((draft:InputInterface) => (draft.id === id ? {...draft, isDraft: !draft.isDraft} : draft))
   ) 
  }

  return (
    <DndProvider backend={HTML5Backend}>
        <div className='Dnd-container'>
            <Droppables 
              board={board} 
              setBoard={setBoard} 
              addInputToBoard={addInputToBoard}
              confirmDraft={confirmDraft}
              removeDraft={removeDraft}
              editInput={editInput}
              setToggleTable={setToggleTable}
              />
            
              {
                  toggleTable && board.length > 0 &&
                  <InputTable data={board}/>
              }
        </div>
    </DndProvider>
  )
}

export default Dnd