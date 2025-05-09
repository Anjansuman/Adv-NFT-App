import { ethers } from "ethers";


declare global {
    export interface Window {
        ethereum?: any;
    }
}

export async function connectToMetaMask(): Promise<{ provider: ethers.BrowserProvider, signer: ethers.JsonRpcSigner }> {
    if(!window.ethereum) {
        throw new Error("MetaMask not found!");
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    return { provider, signer };
}