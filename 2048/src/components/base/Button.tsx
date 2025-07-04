

function Button(
  { onClick, txt }: { onClick: () => void; txt: string }
): React.JSX.Element {
  return (
    <button
      className={`
        rounded-lg px-4 py-1.5 bg-neutral-600 text-sm font-medium 
        self-stretch text-stone-100 transition-all duration-150 ease-in-out 
        hover:cursor-pointer hover:bg-neutral-700 focus:bg-neutral-700
        active:scale-95
      `}
      onClick={onClick}
    >
      {txt}
    </button>

  );
}

export default Button;