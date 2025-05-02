import { useEffect, useState } from "react";
import { MintPage } from "./Components/MintPage";
import { Nav } from "./Components/Nav";

import { useContract } from "./hooks/useContract";
import { useRecoilValue } from "recoil";
import { ContractAtom } from "./Atoms/ContractAtom";
import { Contract } from "ethers";
import { Ticket } from "./Components/ui/Ticket";

export default function App() {
  
  const [ownerPanel, setOwnerPanel] = useState<boolean>(false);
  const contract = useRecoilValue(ContractAtom);
  useContract();

  const getTickets = async () => {
    const tickets = await contract.
  }

  const connected = () => {

    if(!contract || !contract.connectedWallet()) return false;

    return contract.connectedWallet() == import.meta.env.VITE_CONTRACT_OWNER;
  }

  return (
      <div className="h-screen w-screen text-white ">
        <div>
        <Nav />
        {ownerPanel && <div className="px-4 py-2 bg-gray-900 flex justify-start items-center gap-4">
            <div className="px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors cursor-pointer ">
              Create New Ticket
            </div>
            <div className="px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors cursor-pointer ">
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
      </div>
      <Ticket />

      {/* <MintPage /> */}
    </div>
  )
}