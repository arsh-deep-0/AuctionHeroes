import getPlayerByOrder from "@/utils/getPlayerByOrder";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Stats() {
  const searchParamms= useSearchParams();
  const roomID = searchParamms.get('roomID');
  const currentOrder = useSelector(
    (state) => state.currentBid.currentPlayerOrder
  );

  const [player, setPlayer] = useState(null); // Define player state

  useEffect(() => {
    const fetchPlayer = async () => {
      if (currentOrder) {
        const playerInfo = await getPlayerByOrder(currentOrder,roomID);
        console.log("playerInfo: ", playerInfo);
        setPlayer(playerInfo);
      }
    };

    fetchPlayer();
    console.log("Player:", player);
  }, [currentOrder]);
  return (
    <>
      <div className="grid grid-flow-row grid-cols-3 w-full gap-2 h-full">
        <div className="bg-blue  rounded-md  items-center gray-border poppins-medium text-sm gap- grid grid-cols-2 px-[0.2rem]">
          <img className="scale-110" src="/images/components/bat.svg" alt="" />
          <span className="stats-text text-center">
            {player?.battingPoints}
          </span>
        </div>
        <div className="bg-blue  rounded-md  justify-center items-center gray-border  poppins-medium text-sm gap-1 grid grid-cols-2 px-[0.2rem]">
          <img className="scale-110" src="/images/components/bowl.svg" alt="" />
          <span className="stats-text text-center">
            {player?.bowlingPoints}
          </span>
        </div>
        <div className="bg-blue  rounded-md  justify-center items-center gray-border  poppins-medium text-sm gap-1 grid grid-cols-2 px-[0.2rem]">
          <img className="scale-110" src="/images/components/wicket.svg" alt="" />
          <span className="stats-text text-center">{player?.wkPoints}</span>
        </div>
      </div>
      <div className="mt-4 text-black poppins-bold text-xl text-center">#{player?.order}</div>
    </>
  );
}
