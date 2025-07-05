

function Button(
  { txt, type, className="", onClick}: { txt: string; type?: string; className?: string; onClick: () => void;}
): React.JSX.Element {

  const calcColorWay = () => {
    switch(type) {
      case "destructive":
        return "bg-red-800 hover:bg-red-900 focus:bg-red-900"
      default:
        return "bg-neutral-600 hover:bg-neutral-700 focus:bg-neutral-700"
    }
  }

  return (
    <button
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