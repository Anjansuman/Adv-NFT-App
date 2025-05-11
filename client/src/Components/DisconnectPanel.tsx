import { connectToMetaMask } from "../ContractUtils/connectToMetaMask"
import { WalletIcon } from "./ui/SVGs/WalletIcon"


export const DisconnectPanel = () => {
    return <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center">
        <div className="bg-gray-900 text-white rounded-2xl shadow-xl p-8 w-full max-w-md flex flex-col items-center gap-6 border border-gray-700">
          {/* Wallet SVG */}
          <div className="w-20 h-20">
            <WalletIcon />
          </div>

          {/* Heading */}
          <h2 className="text-2xl font-bold text-center">
            Connect Your Wallet
          </h2>

          {/* Message */}
          <p className="text-sm text-center text-gray-300">
            To explore and purchase tickets, please connect your MetaMask wallet. This ensures a secure and personalized experience.
          </p>

          {/* Button */}
          <button
            onClick={connectToMetaMask}
            className="bg-blue-600 hover:bg-blue-700 transition-colors px-5 py-3 rounded-lg text-white font-semibold cursor-pointer"
          >
            Connect MetaMask
          </button>
        </div>
      </div>
}