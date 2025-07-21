

function CreditLink({ link, txt }: {link: string; txt: string}): React.JSX.Element {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="underline hover:text-stone-200 transition-colors"
    >
      {txt}
    </a>
  )
}

export default function Credits(): React.JSX.Element {

  return (
    <footer className="flex flex-col items-center gap-1 text-xs text-stone-400 py-2">
      <p>
        View source code on{' '}
        <CreditLink link="https://github.com/rmejia4209/2048" txt="Github"/>
      </p>
      <p>
        Inspired by{' '}
        <CreditLink link="https://play2048.co/" txt="the original 2048"/>
      </p>
  </footer>
  )

}