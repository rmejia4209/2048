import UndoButton from "./UndoButton";


function PowerUpContainer(
  { onClick }: { onClick: () => void; }
): React.JSX.Element {
  return (
    <div className={`
      flex flex-row justify-center gap-4 items-center mt-4 bg-neutral-500
      w-72 mx-auto xs:w-96 xl:w-136 rounded-2xl py-2
    `}>
      <UndoButton onClick={onClick}/>
    </div>
  );
}

export default PowerUpContainer;