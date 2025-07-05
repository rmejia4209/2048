

function Uses({ numOfUses }: { numOfUses: number;}): React.JSX.Element {
  return (
    <div className="flex flex-row gap-1">
      {Array.from({length: 2}, (_, idx) => {
        return (
          <div key={idx} className={`
            w-4 h-1 rounded-4xl
            ${numOfUses > idx ? "bg-pink-300": "bg-neutral-300"}
          `}></div>
        )
      })}
    </div>
  )
}

interface PropTypes {
  Icon: React.FC;
  uses: number;
  type?: string;
  action: () => void;
}

function PowerUP({ Icon, uses, type, action }: PropTypes): React.JSX.Element {

    const calcColorWay = () => {
    switch(type) {
      case "destructive":
        return "bg-red-800 hover:bg-red-900 focus:bg-red-900"
      default:
        return (`
          hover:bg-neutral-700 focus-visible:bg-neutral-700
          ${
            uses === 0
            ? "bg-neutral-700 opacity-40 cursor-not-allowed"
            : "bg-neutral-600 hover:cursor-pointer active:scale-95"
          }
        `)
    }
  }

  return (
    <div className="flex flex-col items-center w-max mx-auto gap-1.5">
      <button
        aria-label="Undo"
        disabled={uses === 0 ? true : false}
        className={`
          flex items-center justify-center size-8 xs:size-12 xl:size-14 
          rounded-xl shadow-md shadow-black/30 transition-all duration-150
          ease-in-out focus:outline-none ${calcColorWay()}
        `}
        onClick={action}
      >
        <Icon/>
      </button>
      {uses === Infinity ? null : <Uses numOfUses={uses}/>}
    </div>
  );
}

export default PowerUP;