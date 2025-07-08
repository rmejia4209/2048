import IconWrapper from "./IconWrapper";

//TODO

function SwapPath(): React.JSX.Element {
  return (
    <>
      <path strokeLinecap="round" strokeLinejoin="round" d="M 2.5 4.5 a 2 2 0 0 1 2 -2 h 5 a 2 2 0 0 1 2 2 q -2.5 2.5 0 5 a 2 2 0 0 1 -2 2 q -2.5 -2.5 -5 0 a 2 2 0 0 1 -2 -2 v -5 z "/>
      <path fill="none" strokeLinecap="round" strokeLinejoin="round" stroke="currentColor" d="M 11.5 6.5 c 5 0 5 0 5 4 l -1.5 -1.521 M 16.5 10.5 l 1.5 -1.5"/>
      <path strokeLinecap="round" strokeLinejoin="round" d="M 20.5 18.5 a 2 2 180 0 1 -2 2 h -5 a 2 2 180 0 1 -2 -2 q 2.5 -2.5 0 -5 a 2 2 180 0 1 2 -2 q 2.5 2.5 5 0 a 2 2 180 0 1 2 2 v 5 z"/>
      <path fill="none" strokeLinecap="round" strokeLinejoin="round" stroke="currentColor" d="M 11.5 16.5 c -5 0 -5 0 -5 -4 l 1.5 1 M 6.5 12.5 l -1.5 1.5"/>
    </>
    )  
}


export default function SwapIcon(): React.JSX.Element {
  return <IconWrapper Path={SwapPath} fill="fill-stone-100" className="size-10 stroke-stone-100 stroke-1"/>;
};

