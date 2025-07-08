
import IconWrapper from "./IconWrapper";

function UndoPath(): React.JSX.Element {
  return (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
    />
  )
}


export default function UndoIcon(): React.JSX.Element {
  return <IconWrapper Path={UndoPath} fill="fill-none"/>;
};