import { useRecoilValue } from "recoil"
import { CrossIcon } from "./ui/SVGs/CrossIcon"
import { ContractAtom } from "../Atoms/ContractAtom"
import { useEffect, useState } from "react"
import { Ticket } from "./ui/Ticket"


interface BoughtTicketsProps {
    disappearPanel: () => void
}

export const BoughtTickets = ({ disappearPanel }: BoughtTicketsProps) => {

    const contract = useRecoilValue(ContractAtom);
    const [boughtTickets, setBoughtTickets] = useState<{ name: string, price: number, totalSupply: number, sold: number, imageURI: string }[] | null>();

    useEffect(() => {
        if(!contract) throw new Error("MetaMask not connected!");
        const tickets = async () => {
            const t = await contract.ticketsOfOwner();
            setBoughtTickets(t);
        }
        tickets();

    }, []);

    return <div className="h-[80%] w-[80%] border border-white bg-gray-800 rounded-3xl absolute left-1/2 top-1/2 -translate-1/2 p-4">
    <div className="flex justify-between items-center ">
        <div className="text-2xl font-bold">
            Bought Tickets
        </div>
        <div>
            <CrossIcon size={30} onClick={disappearPanel} />
        </div>
        </div>
        <div className="flex gap-2">
            {
                boughtTickets?.map(({ name, price, imageURI }) => (
                    <Ticket name={name} price={price} imageURI={imageURI} />
                ))
            }
        </div>
    </div>
}