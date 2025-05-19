import { Home } from "./Components/Home";
import { useRecoilValue } from "recoil";
import { ContractAtom } from "./Atoms/ContractAtom";
import { DisconnectPanel } from "./Components/DisconnectPanel";
import { useContract } from "./hooks/useContract";
import { Nav } from "./Components/Nav";


export default function App() {

  useContract();
  const contract = useRecoilValue(ContractAtom);

return (
  <div className="w-screen flex flex-col items-center bg-[#0b1120] overflow-hidden ">
    <Nav />
      <div className="w-[1300px] ">
        {
          contract ? <Home/> : <DisconnectPanel />
        }
      </div>
  </div>
);

}