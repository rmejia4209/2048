

function Uses({ numOfUses }: { numOfUses: number;}): React.JSX.Element {
  return (
    <div className="flex flex-row gap-1">
      {Array.from({length: 2}, (_, idx) => {
        return (
          <div className={`
            w-4 h-1.5 rounded-4xl
            ${numOfUses > idx ? "bg-pink-300": "bg-neutral-300"}
          `}></div>
        )
      })}
    </div>
  )
}

function PowerUP(
  { Icon, onClick }: { Icon: React.FC; onClick: () => void; }
): React.JSX.Element {

  const isDisabled = false;

  return (
    <div className="flex flex-col items-center w-max mx-auto gap-1.5">
      <button
        aria-label="Undo"
        disabled={isDisabled}
        className={`
          flex items-center justify-center size-8 xs:size-12 xl:size-14 
          rounded-xl shadow-md shadow-black/30 transition-all duration-150
          ease-in-out hover:bg-neutral-700 focus:bg-neutral-700
          ${isDisabled
            ? "bg-neutral-700 opacity-40 cursor-not-allowed"
            : "bg-neutral-600 hover:cursor-pointer active:scale-95"
          }
        `}
        onClick={onClick}
      >
      <Icon/>
      </button>
      <Uses numOfUses={1}/>
    </div>


  );
}

export default PowerUP;