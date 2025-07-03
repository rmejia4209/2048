
import PowerUP from "./base/PowerUp";
import UndoIcon from "./icons/UndoIcon";



function UndoButton(
  { onClick }: { onClick: () => void; }
): React.JSX.Element {

  return (
    <PowerUP Icon={UndoIcon} onClick={onClick}/>
  )
}


export default UndoButton;