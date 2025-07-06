import IconWrapper from "./IconWrapper";



function CancelPath(): React.JSX.Element {
  return (
    <>
  <circle cx="12" cy="12" r="12" fill="black" />
  <path
    d="M12 10.586L16.95 5.636a1 1 0 1 1 1.414 1.414L13.414 12l4.95 4.95a1 1 0 1 1-1.414 1.414L12 13.414l-4.95 4.95a1 1 0 1 1-1.414-1.414L10.586 12 5.636 7.05a1 1 0 0 1 1.414-1.414L12 10.586z"
    fill="white"
  />
    </>
  );
}


export default function CancelIcon(): React.JSX.Element {
  return <IconWrapper Path={CancelPath} fill="fill-none" className="size-5"/>
}