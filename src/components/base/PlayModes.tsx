import type { GameModes } from "@/components/context/GameContext";
import { useGameContext } from "@/components/context/GameContext";
import PowerIcon from "@/components/icons/PowerIcon";
import RobotIcon from "@/components/icons/RobotIcon";

type PlayModePropTypes = {
  Icon: React.FC;
  mode: GameModes;
  title: string;
  description: string;
  closeMenu: () => void;
}


function PlayMode(
  { Icon, mode, title, description, closeMenu }: PlayModePropTypes
): React.JSX.Element {
  
  const { currGameMode, setGameMode } = useGameContext();

  const handleSelection = () => {
    if (currGameMode !== mode) setGameMode(mode);
    closeMenu();
  }

  return (
    <div
      className={`
        flex flex-row gap-1 rounded-2xl px-3 py-1 items-center hover:cursor-pointer
        ${
          mode === currGameMode
          ? "bg-neutral-700 opacity-80 hover:opacity-100"
          : "hover:bg-neutral-700"}
      `}
      onClick={handleSelection}
    >
      <Icon/>
      <div className="flex flex-col text-stone-100">
        <span className="text-lg font-semibold ">{title}</span>
        <span className="text-sm">{description}</span>
      </div>  
    </div>  
  )
}

export default function PlayModes(
  { closeMenu }: { closeMenu: () => void; }
): React.JSX.Element {

  return (
    <div className="flex flex-col gap-1">
      <PlayMode
        Icon={PowerIcon}
        mode="power"
        title="Power"
        description="With great power, comes great scores"
        closeMenu={closeMenu}
      />
      <PlayMode
        Icon={RobotIcon}
        mode="ai"
        title="A.I."
        description="Sit back, crack open a beer, and watch A.I. play"
        closeMenu={closeMenu}
      />
    </div>
  )

}
