

function StatBlock(
  {label, value}: {label: string; value: number}
): React.JSX.Element {

  return (
    <div className={`
      flex flex-col items-center bg-neutral-600 rounded-xl w-16 py-2
    `}>
      <span className="text-xs font-bold tracking-tight text-stone-100">
        {label}
      </span>
      <span className="text-2xl leading-tight font-semibold text-stone-100">
        {value}
      </span>
    </div>    
  );
}

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


function GameHeader(
  { score, resetGame }: { score: number; resetGame: () => void; }
): React.JSX.Element {
  return (
      <div className={`
        flex flex-row items-start w-72 mx-auto mb-4 gap-6
        xs:w-96 xs:gap-4 xl:w-136 xl:gap-64 
      `}>
        <div>
          <h1 className="text-4xl xs:text-6xl font-extrabold text-stone-100">
            2048
          </h1>
          <p className="text-sm text-stone-300 leading-snug mt-1">
            Join the numbers and get to the 2048 tile!
          </p>
        </div>

        <div className="flex flex-col gap-2 items-end">
          <div className="flex flex-row gap-2">
            <StatBlock label={"Score"} value={score}/>
            <StatBlock label={"Best"} value={score}/>
          </div>
          <Button txt={"New Game"} onClick={resetGame}/>
        </div>

      </div>
      
  )
}

export default GameHeader;