import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { Contract } from "../ContractUtils/Contract";
import { ContractAtom } from "../Atoms/ContractAtom";
import DataNFTToken from "../contracts/DataNFTToken.json";

export const useContract = () => {
  const [contractAtom, setContractAtom] = useRecoilState<Contract | null>(ContractAtom);

  useEffect(() => {
    const initContract = async () => {
      if (!contractAtom) {
        try {
          const addr = import.meta.env.VITE_CONTRACT_ADDRESS;
          const contractInstance = await Contract.create(addr, DataNFTToken.abi);
          setContractAtom(contractInstance);
        } catch (error) {
          console.error("Failed to initialize contract:", error);
        }
      }
    };

    initContract(); // Call the async function inside useEffect
  }, [contractAtom, setContractAtom]);
};
