import { useRecoilValue } from "recoil"
import { ContractAtom } from "../../Atoms/ContractAtom"
import { TicketIcon } from "./SVGs/TicketIcon";
import { ethers } from "ethers";
import toast, { Toaster } from "react-hot-toast";

interface TicketProps {
    name: String,
    price: number,
    leftTickets?: number,
    imageURI: string
}

export const Ticket = ({ name, price, leftTickets, imageURI }: TicketProps) => {

    const c = useRecoilValue(ContractAtom);

    const calculatedPrice = () => {
        const calPrice = ethers.formatEther(price.toString());
        return calPrice;
    }

    const purchase = async () => {
        if(!c) {
            toast.error("Metamask not connected!");
            throw new Error("MetaMask is not connected!");
        }

        const receipt = await c.purchaseTicket(name, price);
        
        receipt.status === 1 ? toast.success("Payment successfull!") : toast.error("Payment failed!");
    }

    return <div className="h-90 w-80 bg-[#111827] rounded-xl border border-gray-800  ">
        <Toaster />
        <div className="h-36 w-full bg-gradient-to-r from-[#111827] to-[#2563eb] flex justify-center items-center overflow-hidden ">
            {imageURI ? 
                <img src={`https://ipfs.io/ipfs/${imageURI}`} alt="" /> :
                <TicketIcon />
            }
        </div>
        <div className="h-[216px] p-4 flex flex-col justify-between ">
            <div>
                <div className="text-xl font-semibold">
                    {name}
                </div>
                <div className="text-gray-600">
                    {leftTickets?.toString() + " left"}
                </div>
            </div>
            <div className="flex justify-between items-end ">
                <div className="text-xl font-semibold text-[#2563eb] break-words ">
                    {calculatedPrice() + " ETH"} 
                </div>
                <div className="bg-gray-800 px-3 py-2 rounded-lg border border-gray-700 hover:bg-gray-600 transition-colors cursor-pointer "
                    onClick={purchase}
                >
                    Purchase
                </div>
            </div>
        </div>
    </div>
}

/*

<div className="h-90 w-70 border-2 border-[#202B44] mr-3 mt-3 rounded-2xl p-4 shadow-md transition-all duration-400 ease-in-out hover:-translate-y-1 hover:shadow-xl bg-[#162037] cursor-pointer "
        onClick={buy}
    >
        <div className="w-full h-[70%] rounded-2xl shadow-sm overflow-hidden bg-[#202B44] ">
            <img src={`https://ipfs.io/ipfs/${imageURI}`} alt="" />
        </div>
        <div className="mt-1 font-semibold text-lg ml-1 ">
            {name}
        </div>
        <div className="mt-1 font-semibold text-lg ml-1">
            Price: {" " + price}
        </div>
        {
        leftTickets ? <div className="mt-1 font-semibold text-lg ml-1 ">
            Tickets left: {" " + leftTickets}
        </div> : ""
        }
    
</div>

*/