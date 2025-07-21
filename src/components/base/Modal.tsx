import Backdrop from "./Backdrop";


interface ModalPropTypes {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children?: React.ReactNode;
}

export default function Modal(
  { isOpen, children}: ModalPropTypes
): React.JSX.Element {

  return (
    <Backdrop inFocus={isOpen}>
      <dialog
        className={`
          absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-md shadow-black/30
          bg-neutral-800 z-20 rounded-2xl w-88 xs:w-112 h-fit flex flex-col gap-6 text-center p-6 overflow-x-auto
          transition-all duration-300 ease-in-out ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-90"}
        `}
      >
        <div className="flex flex-col gap-6">
          {children}
        </div>
      </dialog>
    </Backdrop>
  )
}