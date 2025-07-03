


function UndoIcon(): React.JSX.Element {
  return (

    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-6 stroke-2 xs:size-8"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
      />
    </svg>
  )
}



function Undo({onClick}: {onClick: () => void; }): React.JSX.Element {

  const isDisabled = true

  return (
    <div className={`
      flex flex-row justify-center gap-4 items-center mt-4 bg-neutral-500
      w-72 mx-auto xs:w-96 xl:w-136 rounded-2xl py-2
    `}>
      <div className="flex flex-col items-center w-max mx-auto gap-1.5">
        <button
        aria-label="Undo"
        disabled={isDisabled}
        className={`
          flex items-center justify-center
          size-8 xs:size-12 xl:size-14
          rounded-xl shadow-md shadow-black/30
          transition-all duration-150 ease-in-out 
           hover:bg-neutral-700 focus:bg-neutral-700
          ${isDisabled
            ? "bg-neutral-700 opacity-40 cursor-not-allowed"
            : "bg-neutral-600 hover:cursor-pointer active:scale-95"
          }
        `}
        onClick={onClick}
        >
        <UndoIcon/>
        </button>
        <div className="flex flex-row gap-1">
          <div className="w-4 h-1.5 rounded-4xl bg-pink-400"></div>
          <div className="w-4 h-1.5 rounded-4xl bg-neutral-400"></div>
        </div>
      </div>
    </div>
  )
}

export default Undo;