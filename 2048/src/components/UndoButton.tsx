
import UndoIcon from "./icons/UndoIcon";




function Undo({onClick}: {onClick: () => void; }): React.JSX.Element {

  return (
    <button
      onClick={onClick}
    >
      <UndoIcon/>  
    </button>
  )
}

export default Undo;