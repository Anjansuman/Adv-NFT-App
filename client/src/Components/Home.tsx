import { useState } from "react";
import { Nav } from "./Nav";

import { useContract } from "../hooks/useContract";

import { TicketsPage } from "./TicketsPage";
import { BoughtTickets } from "./BoughtTickets";
import { Ticket } from "./ui/Ticket";

export const Home = () => {
  

  const [ticketsPanel, setTicketsPanel] = useState<boolean>(false);
  const [boughtTicketsPanel, setBoughtTicketsPanel] = useState<boolean>(false);

  useContract();

  return <div className="h-screen bg-[#0b1120] text-white ">
    <Nav />
    <div className=" flex flex-col gap-8 px-4 mt-10 ">
        <div className="flex flex-col gap-1 ">
            <div className="text-3xl font-bold ">
                Available Tickets
            </div>
            <div className="text-gray-600">
                Browse and view all available ticket NFTs
            </div>
        </div>
        <div className="w-fit bg-gray-900 flex justify-start items-center px-1 py-1 rounded-lg border border-[#1e293b] gap-0.5">
            <div className="hover:bg-gray-950 px-3 py-1.5 rounded-lg transition-colors duration-300 ease-in-out cursor-pointer ">All Tickets</div>
            <div className="hover:bg-gray-950 px-3 py-1.5 rounded-lg transition-colors duration-300 ease-in-out cursor-pointer ">Upcoming Tickets</div>
            <div className="hover:bg-gray-950 px-3 py-1.5 rounded-lg transition-colors duration-300 ease-in-out cursor-pointer ">Featured</div>
        </div>
        <div className="h-10 w-full grid grid-cols-12 gap-2 ">
            <input type="text" className="col-span-9 bg-gray-900 rounded-lg border border-[#1e293b] px-3 " placeholder={"Search tickets..."} />
            <div className="bg-gray-900 col-span-3 rounded-lg border border-[#1e293b] flex items-center px-3 ">
                All Tickets
            </div>
        </div>
        <Ticket name={"Blockchain"} price={0.1} leftTickets={2} imageURI={""} />
    </div>
  </div>
}

/*

(
      <div className="h-screen w-screen text-white ">
        <div>
        <Nav />
        <div className="px-4 py-2 bg-gray-900 flex justify-start items-center gap-4">
          <div className="px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors cursor-pointer "
            onClick={() => setTicketsPanel(true)}
          >
            Purchase Tickets
          </div>
          <div className="px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors cursor-pointer "
            onClick={() => setBoughtTicketsPanel(true)}
          >
            Bought Tickets
          </div>
        </div>
      </div>

      {ticketsPanel && <TicketsPage disappearPanel={() => setTicketsPanel(false)} />}
      {boughtTicketsPanel && <BoughtTickets disappearPanel={() => setBoughtTicketsPanel(false)} />}
    </div>
  )

*/