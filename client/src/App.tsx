import { useEffect, useState } from "react";
import { MintPage } from "./Components/MintPage";
import { Nav } from "./Components/Nav";
import { Contract } from "./ContractUtils/Contract";
import DataNFTToken from "./contracts/DataNFTToken.json";

export default function App() {
  
  const [ownerPanel, setOwnerPanel] = useState<boolean>(false);
  const [contract, setContract] = useState<Contract>();
  
  useEffect(() => {
    
    const addr = import.meta.env.VITE_CONTRACT_ADDRESS;
    const c = new Contract(addr, DataNFTToken.abi);
    setContract(c);

  }, []);

  const connected = () => {

    if(!contract) return false;

    return contract.connectedWallet() === '0x8366AB6Bec4e7e35fbCF900F511ec32D558De683';
  }

  return <div className="h-screen w-screen bg-gray-800 text-white ">
    {/* <div>
      <Nav />
      {ownerPanel && <div className="px-4 py-2 bg-gray-900 flex justify-start items-center gap-4">
          <div className="px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors cursor-pointer ">
            Create New Ticket
          </div>
          <div className="px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors cursor-pointer ">
            Withdraw
          </div>
        </div>}
      {connected() === import.meta.env.VITE_CONTRACT_OWNER && <div className="flex justify-center cursor-pointer"
        onClick={() => setOwnerPanel(t => !t)}
      >
        <div className="bg-gray-900 px-4 py-3 rounded-b-lg">
          Owner controls
        </div>
      </div>}
    </div> */}

    <MintPage />
  </div>
}