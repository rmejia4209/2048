import { useState } from "react";
import Backdrop from "@/components/base/Backdrop";
import MenuIcon from "@/components/icons/Menu"
import RestartGameButton from "./buttons/RestartGameButton"
import PlayModes from "@/components/base/PlayModes";





function Menu(
  { isOpen, closeMenu }: { isOpen: boolean; closeMenu: () => void;}
): React.JSX.Element {
  return (
    <div
      className={`
        absolute mt-1 px-2 py-2 rounded-2xl w-86 bg-neutral-800 z-20
        transition-all duration-300 ease-in-out origin-top
        ${
          isOpen
          ? "opacity-100 scale-100"
          : "opacity-0 scale-0 pointer-events-none"
        }
      `}
    >
    <PlayModes closeMenu={closeMenu} />
    </div>

  )
}



function MenuButton(): React.JSX.Element {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
    <Backdrop
      inFocus={isOpen}
      closeAction={() => setIsOpen(false)}
    />
    <div className="relative">
      <div
        role="button"
        className={`
          flex flex-row gap-1 items-center rounded-2xl px-3 py-1
          hover:bg-neutral-700 hover:cursor-pointer
          transition-all duration-150 active:scale-95
        `}
        onClick={() => setIsOpen(true)}
      >
        <MenuIcon/>
        <h1 className="text-3xl xs:text-4xl font-bold text-stone-100">2048</h1>
      </div>
      <Menu isOpen={isOpen} closeMenu={()=>{setIsOpen(false)}}/>
    </div>
    </>
  )
}




export default function Header(): React.JSX.Element {

  return (
    <header className="flex items-center justify-between px-4 py-3 w-full mx-auto xs:w-116 xl:w-148">
      <MenuButton/>
      <RestartGameButton/>
    </header>
  )
}