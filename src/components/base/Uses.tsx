

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

export default Uses