

function Background(): React.JSX.Element {

  return (
    <div className={`
      grid grid-cols-4 rounded-2xl gap-2 border-[0.5rem] xl:gap-4
      xl:border-[1rem] bg-neutral-600 border-neutral-600
      transition-all duration-150
      
    `}>
      {Array.from({ length: 16 }, (_, idx) => (
        <div
          key={idx}
          className={`
            bg-neutral-500 rounded-2xl size-18 xs:size-24 xl:size-30
            transition-all duration-100
          `}
        >
        </div>
      ))}
    </div>
  );

}


export default Background;