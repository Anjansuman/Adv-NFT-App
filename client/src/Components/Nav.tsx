import { connectToMetaMask } from "../ContractUtils/connectToMetaMask"


export const Nav = () => {
    return <div className="h-20 flex justify-between items-center px-4 border-b border-gray-700 ">
        <div className="text-lg font-semibold">
            Decentralized Ticket Minting App
        </div>
        <div className="px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors cursor-pointer "
            onClick={connectToMetaMask}
        >
            Connect Wallet!
        </div>
    </div>
}