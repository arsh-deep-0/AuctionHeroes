import getPlayerByOrder from "@/utils/getPlayerByOrder";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function ImageSection() {
  const searchParamms= useSearchParams();
  const roomID = searchParamms.get('roomID');
  const [isLoading, setIsLoading] = useState(true)
  
  const currentOrder = useSelector(
    (state) => state.currentBid.currentPlayerOrder
  );

  const [player, setPlayer] = useState(null); // Define player state

  useEffect(() => {
    const fetchPlayer = async () => {
      if (currentOrder) {
        // Check if currentOrder is defined
        setIsLoading(true);
        const playerInfo = await getPlayerByOrder(currentOrder,roomID);
        setPlayer(playerInfo); 
        setIsLoading(false)
      }
    };

    fetchPlayer();
  }, [currentOrder]); 

  if (isLoading) {
    return <div className="w-full h-full flex justify-center items-center text-black">
      <div>Loading...</div>
    </div>;
  }

  return (
    <div className="relative gray-border w-full flex justify-center  rounded-md h-full overflow-hidden bg-white">
      {player?.isSold && <img  className="absolute " src="/images/player-images/sold1.png" alt="" />}
      <img
        className="absolute  max-w-[90%] max-h-full bottom-0  object-cover z-10"
       src={player?.playerImgSrc}
        //src="https://res.cloudinary.com/djjlp95mb/image/upload/v1713723502/wvlpsbeb2dgdvzpoq2ny.webp"
        alt=""
      />
      <div className="absolute flex flex-col  w-full">
        <div className="flex text-black  justify-between w-full p-2 poppins-medium">
          <span>{player?.playerFirstName}</span>
          <span>{player?.playerLastName}</span>
        </div>
        <div className="flex text-black poppins-light justify-between w-full p-2 noto- text-[0.65rem] items-center">
          <div className="flex flex-col justify-between items-start">
            <span>{player?.nationality} </span>
            <span>{player?.role}</span>
          </div>
          <span className="bg-blue text-white px-2 rounded-md py-[0.1rem] border-b-2 border-white border-solid pink-shadow text-xs font-bold">₹{player?.basePrice} Cr</span>
        </div>
      </div>

      <div className="pt-[50%] w-full h-full absolute  flex justify-center   items-baseline">
        <div className="absolute bottom-0 min-h-[52%]  max-h-[53%] min-w-[57%] max-width-[58%] aspect-square bg-blue rounded-full blur-[10px]"></div>
      </div>
    </div>
  );
}
