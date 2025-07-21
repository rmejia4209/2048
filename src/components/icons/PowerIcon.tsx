import IconWrapper from "./IconWrapper";


function PowerPath(): React.JSX.Element {
  return (
    <path
      d="M11.983 1.907a.75.75 0 0 0-1.292-.657l-8.5 9.5A.75.75 0 0 0 2.75 12h6.572l-1.305 6.093a.75.75 0 0 0 1.292.657l8.5-9.5A.75.75 0 0 0 17.25 8h-6.572l1.305-6.093Z" 
    />
  )
}

export default function PowerIcon(): React.JSX.Element {
  return <IconWrapper Path={PowerPath} fill="fill-current" className="size-6"/>
}