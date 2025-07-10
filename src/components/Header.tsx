


export default function Header(): React.JSX.Element {

  return (
    <header className="flex items-center justify-between px-4 py-3">
      <h1 className="text-xl font-bold text-stone-100">2048</h1>
      <button  
        className="px-4 py-2 rounded-lg bg-stone-700 text-stone-100 hover:bg-stone-600 transition"
      >
        New Game
      </button>
    </header>
  )
}