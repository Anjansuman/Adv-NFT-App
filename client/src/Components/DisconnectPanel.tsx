import { connectToMetaMask } from "../ContractUtils/connectToMetaMask"
import { WalletIcon } from "./ui/SVGs/WalletIcon"


export const DisconnectPanel = () => {
    return <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center">
        <div className="bg-gray-900 text-white rounded-2xl shadow-xl p-8 w-full max-w-md flex flex-col items-center gap-6 border border-gray-700">
          <div className="w-20 h-20">
            <WalletIcon />
          </div>
          <div className="flex flex-col items-center">
              <h2 className="text-2xl font-bold text-center">
              Connect Your Wallet
            </h2>
            <div className="text-red-600 ">
              and switch to sepolia testnet
            </div>
          </div>
          <p className="text-sm text-center text-gray-300">
            To explore and purchase tickets, please connect your MetaMask wallet. This ensures a secure and personalized experience.
          </p>
          <button
            onClick={connectToMetaMask}
            className="bg-blue-600 hover:bg-blue-700 transition-colors px-5 py-3 rounded-lg text-white font-semibold cursor-pointer"
          >
            Connect MetaMask
          </button>
          <div className="flex">
              <div>
              Don't have a wallet
            </div>
            <button
              onClick={connectToMetaMask}
              className="bg-blue-600 hover:bg-blue-700 transition-colors px-5 py-3 rounded-lg text-white font-semibold cursor-pointer"
            >
              Connect MetaMask
            </button>
          </div>
        </div>
      </div>
}