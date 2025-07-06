import { createPortal } from "react-dom";



export default function BodyPortal(
  { children }: { children: React.ReactNode }
): React.JSX.Element {

  return createPortal(children, document.body)
}