import MenuIcon from "@/components/icons/Menu"
import RestartGameButton from "./buttons/RestartGameButton"


// TODO: Factor out menu once AI is established

export default function Header(): React.JSX.Element {

  return (
    <header className="flex items-center justify-between px-4 py-3 w-full mx-auto xs:w-100 xl:w-136">
      <div className="flex flex-row gap-1 items-center">
        <MenuIcon/>
        <h1 className="text-3xl font-bold text-stone-100">2048</h1>
      </div>
      <RestartGameButton/>
    </header>
  )
}