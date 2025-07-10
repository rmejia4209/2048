


interface ToolTipPropsTypes {
  power: string;
  uses: number;
  unlockVal?: number;
  destructive?: boolean
}

function ToolTip(props: ToolTipPropsTypes): React.JSX.Element {

  const { power, uses, unlockVal, destructive } = props

  return (
    <div
      className={`
        hidden group-hover:block group-data-[active=true]:hidden absolute
        bottom-full left-1/2 -translate-x-1/2 opacity-95 w-max max-w-64 px-4
        py-3 mb-3 rounded-2xl text-xs
        ${destructive ? "bg-red-800": "bg-neutral-600"}
      `}
    >
      <div className="flex mb-1 items-start gap-1 ">
        <span className="font-semibold uppercase ">
          {power}
        </span>
        {
        uses !== Infinity
        && <span>{`${uses} ${uses === 1 ? "use" : "uses"} left`}</span>
        }
      </div>
      {
        unlockVal && <span>{`Make a ${unlockVal} tile to get more uses`}</span> 
      }
      
    </div>
  )

}

export default ToolTip;