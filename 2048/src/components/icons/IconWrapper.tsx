


function IconWrapper(
  { Path, fill }: { Path: React.FC; fill: string }
): React.JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={`size-8 stroke-2 xs:size-8 stroke-stone-100 ${fill}`}
    >
      <Path/>
    </svg>
  )
}

export default IconWrapper;