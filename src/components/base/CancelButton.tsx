import CancelIcon from "../icons/CancelIcon";


function CancelButton(
  { isActive, action }: { isActive: boolean; action: () => void; }
): React.JSX.Element 
{
  return (
    <button
      className={`
        absolute top-1/2 left-1/2 -translate-x-1/2 transition-all ease-in-out
        duration-150 active:scale-90
        ${isActive ? "opacity-80 z-30" : "opacity-0 -z-10"}
      `}
      onClick={action}
      >
        <CancelIcon/>
    </button>

  )
}

export default CancelButton;