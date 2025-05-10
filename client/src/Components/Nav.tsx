import { useRecoilValue } from "recoil"
import { connectToMetaMask } from "../ContractUtils/connectToMetaMask"
import { ContractAtom } from "../Atoms/ContractAtom"
import { useState } from "react";
import { AdminPanel } from "./AdminPanel";


export const Nav = () => {

    const contract = useRecoilValue(ContractAtom);
    const [adminPanel, setAdminPanel] = useState<boolean>();

    return <div className="h-20 flex justify-between items-center px-4 border-b border-gray-700 ">
        <div className="flex justify-center items-center gap-5 ">
            <div className="text-lg font-semibold">
                Decentralized Ticket Minting App
            </div>
        </div>
        <div className="flex items-center gap-3">
            <div className="bg-gray-900 px-3 py-2 rounded-lg cursor-pointer text-red-700 border border-gray-800 transition-colors "
                onClick={() => setAdminPanel(true)} 
            >
                Admin Controls
            </div>
            <div className={`px-4 py-2 rounded-lg border border-gray-700 transition-colors cursor-pointer flex justify-around items-center gap-2 `}
                onClick={connectToMetaMask}
            >
                <div className={`${contract ? "bg-green-600" : "bg-red-500"} h-2 w-2 rounded-full `} ></div>
                {contract ? "Connected!" : "Connect Wallet!"}
            </div>
        </div>
        {adminPanel && <AdminPanel disappearPanel={() => setAdminPanel(false)} /> }
    </div>
}