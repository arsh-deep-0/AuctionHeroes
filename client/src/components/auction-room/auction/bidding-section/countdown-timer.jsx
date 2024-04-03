import React, { useEffect, useRef } from "react";
import CircularProgressBarDiv from "../common-components/circular-progress-bar";
import { useDispatch, useSelector } from "react-redux";
import { reduceTimerCount } from "@/lib/features/timer/timerSlice";

export default function CountdownTimer() {
  const dispatch = useDispatch();
  const timerValue = useSelector((state) => state.timer.time);
  const isAuctionInProcess = useSelector(
    (state) => state.timer.auctionInProcess
  );

  useEffect(() => {
    if (isAuctionInProcess && timerValue > 0) {
      setTimeout(() => {
        dispatch(reduceTimerCount());
      }, 1000);
    }
  }, []);

  return (
    <>
      <div className="bg-white aspect-[3/2] rounded-lg pink-shadow mx-1  pt-1 pb-[2px] box-border flex flex-col justify-between items-center">
        <div className="w-[45%] relative flex items-center justify-center">
          <div className="absolute flex justify-center items-center flex-col text-white">
            <span
              className="poppins-light"
              style={{ fontSize: "clamp(1.2rem,4vw,2rem)" }}
            >
              {timerValue}
            </span>
          </div>
          <CircularProgressBarDiv
            percentage={75}
            circleColor={"#7d54f2"}
            progressBarColor={"black"}
          />
        </div>

        <span className="poppins-light bar-text text-black ">Timer</span>
      </div>
    </>
  );
}
