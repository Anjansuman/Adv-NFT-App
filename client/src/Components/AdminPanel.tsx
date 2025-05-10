import { useState } from "react";
import { LogoButton } from "./ui/LogoButton"
import { CrossIcon } from "./ui/SVGs/CrossIcon"
import { MintPage } from "./MintPage";
import { useRecoilValue } from "recoil";
import { ContractAtom } from "../Atoms/ContractAtom";

interface AdminPanelProps {
    disappearPanel: () => void,
}

export const AdminPanel = ({ disappearPanel }: AdminPanelProps) => {

    const contract = useRecoilValue(ContractAtom);
    const [createPanel, setCreatePanel] = useState<boolean>(false);

    const withdraw = async () => {
        if(!contract) throw new Error("MetaMask not connecte!");

        const receipt = await contract.withdraw();
    }

    return <div className="h-[80%] w-[80%] border border-white bg-gray-800 rounded-3xl absolute left-1/2 top-1/2 -translate-1/2 p-4">
        <div className="pb-4 flex justify-between items-center border-b ">
            <div></div>
            <div className="text-2xl font-bold text-white ">
                Admin Controls
            </div>
            <div>
                <CrossIcon size={30} onClick={disappearPanel} />
            </div>
        </div>
        <div className="flex py-2 gap-2">
            <LogoButton name={"Create"} onClick={() => setCreatePanel(true)} />
            <LogoButton name={"Withdraw"} onClick={withdraw} />
        </div>
        {createPanel && <MintPage disappearPanel={() => setCreatePanel(false)} />}
    </div>
}