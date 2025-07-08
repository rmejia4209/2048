

interface PropTypes {
  Path: React.FC;
  fill: string;
  className?: string
}

function IconWrapper(
  { Path, fill, className }: PropTypes
): React.JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={
        `${fill}
        ${
          className 
          ? className
          : "stroke-stone-100 size-8 stroke-2 xs:size-8"
        }
      `}
    >
      <Path/>
    </svg>
  )
}

export default IconWrapper;