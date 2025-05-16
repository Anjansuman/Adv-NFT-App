import { create } from "zustand";
import { Contract } from "../ContractUtils/Contract";

type Icontract = {
    contract: Contract | null
}

export const useContractBear = create<Icontract>()((set) => {
    contract: null,
    setContract: () => {}
})