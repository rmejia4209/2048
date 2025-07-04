

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

export default StatBlock;