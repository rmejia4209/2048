


function Grid(): React.JSX.Element {

  return (
    <div className="grid grid-cols-4 gap-4 bg-neutral-600 rounded-md border-[1rem] border-neutral-600">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map((val) => (
        <div key={val} className="bg-neutral-500 rounded-sm size-24">
        </div>
      ))}
    </div>
  )
}

export default Grid;