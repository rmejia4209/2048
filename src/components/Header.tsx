import RestartGameButton from "./buttons/RestartGameButton"


export default function Header(): React.JSX.Element {

  return (
    <header className="flex items-center justify-between px-4 py-3 w-full mx-auto xs:w-100 xl:w-136">
      <h1 className="text-3xl font-bold text-stone-100">2048</h1>
      <RestartGameButton/>
    </header>
  )
}