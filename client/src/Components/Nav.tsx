import { useRecoilValue } from "recoil"
import { connectToMetaMask } from "../ContractUtils/connectToMetaMask"
import { ContractAtom } from "../Atoms/ContractAtom"


export const Nav = () => {

    const contract = useRecoilValue(ContractAtom);

    return <div className="h-20 flex justify-between items-center px-4 border-b border-gray-700 ">
        <div className="text-lg font-semibold">
            Decentralized Ticket Minting App
        </div>
        <div className="px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors cursor-pointer "
            onClick={connectToMetaMask}
        >
            {contract ? "Connected!" : "Connect Wallet!"}
        </div>
    </div>
}