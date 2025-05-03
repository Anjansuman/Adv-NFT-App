import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { ContractAtom } from "../Atoms/ContractAtom";
import { Ticket } from "./ui/Ticket";
import { CrossIcon } from "./ui/SVGs/CrossIcon";

interface TicketsPageProps {
    disappearPanel: () => void
}

export const TicketsPage = ({ disappearPanel }: TicketsPageProps) => {

    const [allTickets, setAllTickets] = useState<{ name: string, price: number, totalSupply: number, sold: number, imgHash: string }[] | null>(null);
    const contract = useRecoilValue(ContractAtom);
      

    const getTickets = async () => {
        if(!contract) return;
    
        try {
            const tickets = await contract.getAllTickets();
            console.log(tickets);
            setAllTickets(tickets);
            console.log(tickets);
        } catch (error) {
            alert(error);
        }
      }
    
      useEffect(() => {
        getTickets();
      }, [contract]);

    return <div className="h-[80%] w-[80%] border border-white bg-gray-800 rounded-3xl absolute left-1/2 top-1/2 -translate-1/2 p-4">
        <div className="flex justify-between items-center ">
            <div className="text-2xl font-bold">
                Purchase Tickets
            </div>
            <div>
                <CrossIcon size={30} onClick={disappearPanel} />
            </div>
        </div>
        {allTickets ? allTickets.map(({ name, price, totalSupply, sold, imgHash }) => (
                <Ticket name={name} price={price} leftTickets={totalSupply - sold} imgHash={imgHash} />
        )) : ""}
    </div>
}