

function StatBlock(
  {label, value}: {label: string; value: number}
): React.JSX.Element {

  return (
    <div className={`
      flex flex-col items-center bg-neutral-600 rounded-xl w-36 py-2
    `}>
      <span className="text-xs font-bold tracking-tight text-stone-100">
        {label}
      </span>
      <span
        className={`
          leading-tight font-semibold text-stone-100
          ${
            value > 1e6
            ? (value > 1e9 ? "text-sm" :"text-lg")
            : "text-2xl"
          } 
        `}
      >
        {value.toLocaleString()}
      </span>
    </div>    
  );
}

export default StatBlock;