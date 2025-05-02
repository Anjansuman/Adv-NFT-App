import { atom } from "recoil";
import { Contract } from "../ContractUtils/Contract";

export const ContractAtom = atom<Contract | null>({
    key: "ContractAtom",
    default: null
})