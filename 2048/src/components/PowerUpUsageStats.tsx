import UndoIcon from "./icons/UndoIcon";


function Uses({ numUses }: { numUses: number }): React.JSX.Element {

  return (
    <div className="absolute -bottom-2 -right-2 xl:-bottom-2.5 xl:-right-2.5">
      <div
        className={`
          bg-neutral-800 rounded-full size-5 xl:size-7 flex items-center justify-center 
          text-white text-sm xl:text-lg font-semibold 
        `}
      >
        {numUses}
      </div>
    </div>

  );
}

function PowerUPStat(
  { Icon, numUses }: { Icon: React.FC; numUses: number }
): React.JSX.Element {

  return (
    numUses > 0
      ? (
        <div className="relative mt-6">
          <div
          className={`
            flex items-center justify-center size-10 xs:size-12 xl:size-14 
            rounded-xl shadow-md shadow-black/30 bg-neutral-600
          `}
          >
            <Icon/>
          </div>
          <Uses numUses={numUses} />
        </div>
      )
    : <></>

  );
}


export default function PowerUpUsageStats({}): React.JSX.Element {
  return (
    <div className="flex flex-row gap-6">
      <PowerUPStat Icon={UndoIcon} numUses={0}/>
      <PowerUPStat Icon={UndoIcon} numUses={0}/>
      <PowerUPStat Icon={UndoIcon} numUses={0}/>
    </div>
  )
}