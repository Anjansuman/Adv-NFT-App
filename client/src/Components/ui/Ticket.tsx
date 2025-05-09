import { useRecoilValue } from "recoil"
import { ContractAtom } from "../../Atoms/ContractAtom"

interface TicketProps {
    name: String,
    price: number,
    leftTickets?: number,
    imageURI: string
}

export const Ticket = ({ name, price, leftTickets, imageURI }: TicketProps) => {

    const contract = useRecoilValue(ContractAtom);

    const buy = async () => {
        if(!contract) {
            alert("Metamask not connected!");
            throw new Error("MetaMask is not connected!");
        }

        const receipt = await contract.purchaseTicket(name, price.toString());
    }

    return <div className="h-90 w-70 border-2 border-[#202B44] mr-3 mt-3 rounded-2xl p-4 shadow-md transition-all duration-400 ease-in-out hover:-translate-y-1 hover:shadow-xl bg-[#162037] cursor-pointer "
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
}