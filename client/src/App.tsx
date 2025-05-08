import { useState } from "react";
import { MintPage } from "./Components/MintPage";
import { Nav } from "./Components/Nav";

import { useContract } from "./hooks/useContract";
import { useRecoilValue } from "recoil";
import { ContractAtom } from "./Atoms/ContractAtom";

import { TicketsPage } from "./Components/TicketsPage";
import { BoughtTickets } from "./Components/BoughtTickets";

export default function App() {
  
  const [ownerPanel, setOwnerPanel] = useState<boolean>(false);

  const [createPanel, setCreatePanel] = useState<boolean>(false);
  const [ticketsPanel, setTicketsPanel] = useState<boolean>(false);
  const [boughtTicketsPanel, setBoughtTicketsPanel] = useState<boolean>(false);

  const contract = useRecoilValue(ContractAtom);
  useContract();

  const connected = () => {

    if(!contract || !contract.connectedWallet()) return false;

    return contract.connectedWallet() == import.meta.env.VITE_CONTRACT_OWNER;
  }

  const withdraw = async () => {
    if(!contract) return;

    const receipt = await contract.withdraw();
  }

  return (
      <div className="h-screen w-screen text-white ">
        <div>
        <Nav />
        {ownerPanel && <div className="px-4 py-2 bg-gray-900 flex justify-start items-center gap-4">
            <div className="px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors cursor-pointer "
              onClick={() => setCreatePanel(true)}
            >
              Create New Ticket
            </div>
            <div className="px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors cursor-pointer "
              onClick={withdraw}
            >
              Withdraw
            </div>
          </div>}
        {connected() && <div className="flex justify-center cursor-pointer"
          onClick={() => setOwnerPanel(t => !t)}
        >
          <div className="bg-gray-900 px-4 py-3 rounded-b-lg">
            Owner controls
          </div>
        </div>}
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

      {createPanel && <MintPage disappearPanel={() => setCreatePanel(false)} />}
      {ticketsPanel && <TicketsPage disappearPanel={() => setTicketsPanel(false)} />}
      {boughtTicketsPanel && <BoughtTickets disappearPanel={() => setBoughtTicketsPanel(false)} />}
    </div>
  )
}