"use client";
import { useRouter, useSearchParams } from "next/navigation";

export default function AuctionLayout({ children }) {
  const searchParams = useSearchParams();

  const roomID = searchParams.get("roomID");
  const router = useRouter();

  const gotoTeams = () => {
    router.push(`/auction-room/teams?roomID=${roomID}`);
  };

  const goToAuction = () => {
    router.push(`/auction-room/auction?roomID=${roomID}`);
  };
  return (
    <>
      <div className="min-h-screen h-screen max-h-screen  box-border flex flex-col min-w-full max-w-full bg-light-blue p-4 justify-between">
        <header className="bg-white shadow-lg text-black py-1 px-2 rounded-lg gray-border poppins-medium flex items-center justify-between ">
          <div className="flex items-center gap-2 ">
            <img
              className="h-8 w-8"
              src="/images/components/game-logo.svg"
              alt=""
            />
            <span className="text-blue ">Auction Heroes</span>
          </div>

          <img
            className="h-6 w-6 gray-border rounded-full"
            src="/images/components/profile.svg"
            alt=""
          />
        </header>
        <div className="flex flex-col gap-4 h-full lg:flex-row ">
          {children}
          <footer className="text-white flex justify-center  items-center ">
            <div className="flex items-center justify-between gray-border w-full rounded-md p-1 text-black poppins-light text-[0.7rem] text-blue lg:flex-col lg:max-h-[70%] lg:gap-4 lg:py-4 lg:px-2">
              <div className="flex flex-col items-center">
                <img src="/images/components/teams.svg" alt="" onClick={gotoTeams}/>
                <span>Teams</span>
              </div>
              {/* <div className="flex flex-col items-center">
                <img src="/images/components/player-cards.svg" alt="" />
                <span>Players</span>
              </div> */}
              <div className="flex flex-col items-center bg-blue text-white rounded-md px-2">
                <img src="/images/components/hammer.svg" alt="" onClick={goToAuction} />
                <span>Auction</span>
              </div>
              {/* <div className="flex flex-col items-center">
                <img src="/images/components/rules-book.svg" alt="" />
                <span>Rules</span>
              </div> */}
              <div className="flex flex-col items-center">
                <img src="/images/components/profile.svg" alt="" />
                <span>My Team</span>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}
