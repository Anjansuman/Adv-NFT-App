import { ethers } from "ethers";
import { connectToMetaMask } from "./connectToMetaMask";



export class Contract {

    private contractAddress: string;
    private contractABI: ethers.InterfaceAbi;

    private signer: ethers.JsonRpcSigner | null = null;
    private contract: ethers.Contract | null = null;

    constructor(contractAddress: string, contractABI: ethers.InterfaceAbi) {
        this.contractAddress = contractAddress;
        this.contractABI = contractABI;
    }

    public static async create(contractAddress: string, contractABI: ethers.InterfaceAbi): Promise<Contract> {
        const instance = new Contract(contractAddress, contractABI);
        await instance.initialize(); // Await async init
        return instance;
    }

    private async initialize() {
        await this.connectToMetaMask();
    }

    private async connectToMetaMask() {
        try {
            
            const { signer }: {
                signer: ethers.JsonRpcSigner
            } = await connectToMetaMask();

            this.signer = signer;

            this.setContract();

        } catch (error) {
            this.throwError(error);
        }
    }

    private async setContract() {
        if(!this.signer) throw new Error("MetaMask not connected!");

        try {
            this.contract = new ethers.Contract(
                this.contractAddress,
                this.contractABI,
                this.signer
            );
        } catch (error) {
            this.throwError(error);
        }
    }

    public async createTicket(name: String, price: number, totalSupply: number, imageURI: String) {
        if(!this.contract) {
            alert(this.contract);
            throw new Error("MetaMask not connected! from create");
        }

        try {
            
            if(price < 0 || totalSupply < 1) throw new Error("Invalid data!");

            const _price = ethers.parseEther(price.toString());

            const txn = await this.contract.createTicket(name, _price, totalSupply, imageURI);
            const receipt = await txn.wait();
            return receipt;

        } catch (error) {
            this.throwError(error);
        }
    }

    public async getAllTickets() {
        if(!this.contract) throw new Error("Metamask not connected!");
        try {
            
            const tickets = await this.contract.getAllTickets();
            return tickets;

        } catch (error) {
            this.throwError(error);
        }
    }

    public async purchaseTicket(name: String, eth: number) {
        if(!this.contract) throw new Error("MetaMask not connected!");

        try {

            const txn = await this.contract.purchaseTicket(name, { value: eth });
            const receipt = await txn.wait();
            return receipt;

        } catch (error) {
            this.throwError(error);
        }
    }

    public async ticketsOfOwner() {
        if(!this.contract || !this.signer) throw new Error("MetaMask not connected!");

        try {
            
            return await this.contract.ticketsOfOwner(this.signer.address);

        } catch (error) {
            this.throwError(error);
        }
    }

    public async withdraw() {
        if(!this.contract) throw new Error("MetaMask not connected!");

        try {
            
            const txn = await this.contract.withdraw();
            const receipt = await txn.wait();
            return receipt;

        } catch (error) {
            this.throwError(error);
        }
    }

    public async isConnected() {
        return this.contract !== null;
    }

    public connectedWallet() {
        if(!this.contract || !this.signer) throw new Error("MetaMask not connected!, from connecteWallet");

        return this.signer.address;
    }

    public disconnect() {
        try {
            
            this.signer = null;

        } catch (error) {
            this.throwError(error);
        }
    }

    private throwError(error: unknown) {
        console.error("Contract Error: ", error);
        if(error instanceof Error) {
            throw new Error("Contract operation failed: " + error.message);
        }
        throw new Error("Unknown error occured: " + error);
    }

}