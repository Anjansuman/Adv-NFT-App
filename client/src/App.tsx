import { Home } from "./Components/Home";
import { connectToMetaMask } from "./ContractUtils/connectToMetaMask";
import { useRecoilValue } from "recoil";
import { ContractAtom } from "./Atoms/ContractAtom";


export default function App() {

  const contract = useRecoilValue(ContractAtom);

  return <div>
    {
    !contract && <div className="h-screen w-screen bg-black/85 absolute z-10">
      <div className="h-96 w-96 bg-gray-600 rounded-xl relative left-1/2 top-1/2 -translate-1/2 text-white flex flex-col justify-center gap-3 items-center p-4 ">
        <div className="text-xl font-semibold break-words text-center ">
          Connect your MetaMask to access all features
        </div>
        <button className="bg-blue-500 px-3 py-3 rounded-lg"
          onClick={connectToMetaMask}
        >
          Connect Your Wallet
        </button>
      </div>
    </div>
    }
    <Home />
  </div>
}