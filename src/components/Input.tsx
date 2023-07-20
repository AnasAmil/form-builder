import { InputInterface } from '../Types'
import { useDrag } from 'react-dnd'

const Input = ({input}:{input: InputInterface}) => {

    const [{isDragging}, drag] = useDrag(() => ({
        type: "Input",
        item: input,
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    }))

  return (
    <div 
      className='rounded flex p-2 items-center w-full gap-2 cursor-pointer' 
      key={input.id} 
      ref={drag}
      style={{border: isDragging ? '1px solid #87D6F1' : '1px solid #E5E7EB'}}
    >
      <div style={{backgroundColor: input.color, padding: '5px', borderRadius: '5px'}}>
          {input.icon}
      </div>
      <h4>{input.name}</h4>
    </div>
  )
}

export default Input