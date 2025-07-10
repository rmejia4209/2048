



import IconWrapper from "./IconWrapper";

function MenuPath(): React.JSX.Element {
  return (
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  )
}

export default function MenuIcon(): React.JSX.Element {
  return <IconWrapper Path={MenuPath} fill="fill-none"/>;
}
  

