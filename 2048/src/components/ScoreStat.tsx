


function StatBlock(
  {label, value}: {label: string; value: number}
): React.JSX.Element {

  return (
      <div
        className={`
          flex flex-col grow bg-red-900 rounded-2xl my-2 py-2
        `}
      >
        <span className="text-lg font-medium">{label}</span>
        <span className="text-md font-semibold">{value}</span>
      </div>    
  )
  
}

export default StatBlock;