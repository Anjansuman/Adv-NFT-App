import { Home } from "./Components/Home";
import { connectToMetaMask } from "./ContractUtils/connectToMetaMask";
import { useRecoilValue } from "recoil";
import { ContractAtom } from "./Atoms/ContractAtom";
import { DisconnectPanel } from "./Components/DisconnectPanel";


export default function App() {

  const contract = useRecoilValue(ContractAtom);

return (
  <div>
    {!contract && (
      <DisconnectPanel onClick={connectToMetaMask} />
    )}
    <Home />
  </div>
);

}