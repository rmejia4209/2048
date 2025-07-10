
type PropTypes = {
  txt: string;
  type?: string;
  className?: string;
  onClick: () => void;
  isDisabled?: boolean;
}


function Button(
  { txt, type, className="", onClick, isDisabled }: PropTypes 
): React.JSX.Element {

  const calcColorWay = () => {
    switch(type) {
      case "destructive":
        return (`
          hover:bg-red-900 focus:bg-red-900
          ${
            isDisabled
            ? "bg-red-900 opacity-40"
            : "bg-red-800 hover:cursor-pointer "
          }
        `)
      default:
        return (`
          hover:bg-neutral-700 focus-visible:bg-neutral-700
          ${
            isDisabled
            ? "bg-neutral-700 opacity-40"
            : "bg-neutral-600 hover:cursor-pointer active:scale-95"
          }
        `)
    }
  }

  return (
    <button
      disabled={isDisabled}
      className={`
        rounded-lg px-4 py-1.5 text-sm font-medium self-stretch 
        text-stone-100 transition-all duration-150 ease-in-out 
        hover:cursor-pointer active:scale-95 shadow-md shadow-black/30 
        ${calcColorWay()} ${className}
      `}
      onClick={onClick}
    >
      {txt}
    </button>

  );
}

export default Button;