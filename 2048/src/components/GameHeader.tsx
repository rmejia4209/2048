import PowerUpUsageStats from "./PowerUpUsageStats";

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

export function Button(
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




function InGameHeader(
  { isOpen, score, resetGame }: { isOpen: boolean; score: number; resetGame: () => void; }
): React.JSX.Element {
  return (
    <div className={`
      flex flex-row items-start w-72 mx-auto mb-4 gap-6
      xs:w-96 xs:gap-4 xl:w-136 xl:gap-64 transition-all duration-800
      ${isOpen ? "opacity-100 max-h-40 scale-100" : "opacity-0 max-h-0 scale-0"}
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


function GameOverHeader(
  { isOpen, score, turns }: { isOpen: boolean; score: number; turns: number }
): React.JSX.Element {
  return(
    <div
      className={`
        flex flex-col items-center w-full mx-auto mb-4 gap-2 xs:w-120 xl:w-164
        transition-all duration-800 ease-in-out overflow-hidden
        ${!isOpen ? "opacity-100 scale-100 max-h-40" : "opacity-0 scale-0 max-h-0" }
      `}
    >
      <h1 className="text-4xl xs:text-5xl font-extrabold text-stone-100 tracking-tight">
        Game Over
      </h1>
      <div>
        <span className="text-md text-stone-100">
          {score.toLocaleString()} points scored in {turns.toLocaleString()} moves.
        </span>
        <span className="text-md font-bold text-stone-100">
          x powerup{2 > 1 ? "s ": " "}used:
        </span>
      </div>
      <PowerUpUsageStats />
    </div>

  );
}


interface GameHeaderPropTypes {
  isOpen: boolean;
  score: number;
  turns: number;
  resetGame: () => void;
}

function GameHeader(
  { isOpen, score, turns, resetGame }: GameHeaderPropTypes
): React.JSX.Element {
  return (
    <>
      <GameOverHeader isOpen={isOpen} score={score} turns={turns}/>
      <InGameHeader isOpen={isOpen} score={score} resetGame={resetGame}/>
    </>
  )
}

export default GameHeader;