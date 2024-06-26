import React, { useEffect, useRef, useState } from "react";
import CircularProgressBarDiv from "../common-components/circular-progress-bar";
import { useDispatch, useSelector } from "react-redux";
import { reduceTimerCount } from "@/lib/features/timer/timerSlice";
import { eventTypes } from "@/constants/eventTypes";
import { useSearchParams } from "next/navigation";
import Cookies from "universal-cookie";

export default function CountdownTimer() {
  const dispatch = useDispatch();
  const [countdown, setCountdown] = useState(60);
  const timerValue = useSelector((state) => state.timer.time);
  const auctionInProcess = useSelector((state) => state.timer.auctionInProcess);
  console.log("auctionInprogress state:", auctionInProcess);

  const searchParams = useSearchParams();
  const roomID = searchParams.get("roomID");
  const cookies = new Cookies(null, { path: "/" });
  const currentBidValue = useSelector((state) => state.currentBid.amount);

  const currentState=useSelector(state=>state)
  console.log('current State:',currentState)

  const currentBid = useSelector((state) => state.currentBid);
  const playerOrder = currentBid.currentPlayerOrder
  // const fullName = cookies.get("fullName");
  const teamLogo = cookies.get("teamLogo");
  const userID = cookies.get("userID");

  useEffect(() => {
    let intervalId1;
    let intervalId2;
    console.log("auctionInProgess:", auctionInProcess);
    if (!auctionInProcess) {
      const timer = Date.now();
      intervalId1 = setInterval(() => {
        const elapsedSeconds = Math.floor((Date.now() - timer) / 1000);
        const newCountdown = 45 - elapsedSeconds;
        if (newCountdown >= 0) {
          setCountdown(newCountdown);
        } else {
          console.log("auctionInPogress", auctionInProcess);
          if (!auctionInProcess && teamLogo == "mi") {
            dispatch(nextPlayer());
          }
          setCountdown(null);
          clearInterval(intervalId1);
        }
      }, 1000);
    }

    if (timerValue !== null && auctionInProcess) {
      intervalId2 = setInterval(() => {
        const elapsedSeconds = Math.floor((Date.now() - timerValue) / 1000);
        const newCountdown = 15 - elapsedSeconds;
        if (newCountdown >= 0) {
          setCountdown(newCountdown);
        } else {
          console.log("auctionInPogress", auctionInProcess);
          if (auctionInProcess && userID == currentBid.currentBidderID) {
            dispatch(sellPlayer());
          }
          setCountdown(null);
          clearInterval(intervalId2);
        }
      }, 1000);
    }

    return () => {clearInterval(intervalId1);
    clearInterval(intervalId2)}
  }, [timerValue, auctionInProcess, playerOrder]);

  const sellPlayer = () => {
    return {
      type: eventTypes.SELL_PLAYER,
      payload: {
        auctionRoomID: roomID,
        sellingAmount: currentBidValue,
        buyerID: currentBid.currentBidderID,
        currentPlayerOrder: currentBid.currentPlayerOrder,
        buyerName: currentBid.currentBidderName,
        buyerLogo: currentBid.currentBidderLogo,
        playersSold:currentBid.playersSold,
        playersUnsold:currentBid.playersUnsold
      },
    };
  };

  const nextPlayer = () => {
    return {
      type: eventTypes.SKIP_PLAYER,
      payload: {
        auctionRoomID: roomID,
        sellingAmount: currentBidValue,
        buyerID: currentBid.currentBidderID,
        currentPlayerOrder: currentBid.currentPlayerOrder,
        buyerName: currentBid.currentBidderName,
        buyerLogo: currentBid.currentBidderLogo,
        playersSold:currentBid.playersSold,
        playersUnsold:currentBid.playersUnsold
      },
    };
  };

  return (
    <>
      <div className="bg-white aspect-[3/2] sm:aspect-[4] lg:aspect-square rounded-lg pink-shadow mx-1  pt-1 pb-[2px] box-border flex flex-col justify-between items-center lg:p-2 lg:justify-center">
      <div className="w-[45%] sm:w-[20%] lg:w-[50%] relative flex items-center justify-center">
  <div className="absolute flex justify-center items-center flex-col text-white bottom-0 right-0 w-full h-full ">
    <span className="poppins-light text-lg bottom-4 right-4">
      {countdown}
    </span>
  </div>
  <CircularProgressBarDiv
    percentage={(countdown * 100) / 15}
    circleColor={countdown > 5 || countdown == null ? "#7d54f2" : "red"}
    progressBarColor={"black"}
  />
</div>


        <span className="poppins-light bar-text text-black sm:hidden">Timer</span>
      </div>
    </>
  );
}
