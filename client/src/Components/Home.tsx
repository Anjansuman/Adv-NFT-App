import { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { ContractAtom } from "../Atoms/ContractAtom";
import { Ticket } from "./ui/Ticket";
import toast, { Toaster } from "react-hot-toast";

interface Ticket {
  name: string;
  price: number;
  totalSupply: number;
  sold: number;
  imageURI: string;
}

export const Home = () => {

  const [tickets, setTickets] = useState<Ticket[] | null>(null);
  const [searchedTickets, setSearchedTickets] = useState<Ticket[] | null>(null);

  const [ownedTickets, setOwnedTickets] = useState<Ticket[] | null>(null);
  // this is for switching over All Tickets and My Tickets
  const [switchTickets, setSwitchTickets] = useState<boolean>(false);
  const searchRef = useRef<HTMLInputElement>(null);

  const contract = useRecoilValue(ContractAtom);

  const searchChange = () => {
    const curr = searchRef.current?.value.trim().toLowerCase();
    if (!curr || !tickets) {
      setSearchedTickets(null);
      return;
    }
    const filtered = tickets.filter((t) =>
      t.name.toLowerCase().includes(curr)
    );
    setSearchedTickets(filtered);
  };

useEffect(() => {
  if (!contract) {
    toast.error("Wallet not connected!")
    return;
  }

  const fetchTickets = async () => {
    const rawTickets = await contract.getAllTickets();
    const parsed = rawTickets.map((t: any) => ({
      name: t.name,
      price: t.price,
      totalSupply: t.totalSupply,
      sold: t.sold,
      imageURI: t.imageURI,
    }));
    setTickets(parsed);
  };

  const fetchOwnedTickets = async () => {
    const raw = await contract.ticketsOfOwner();
    const parsed = raw.map((t: any) => ({
      name: t.name,
      price: t.price,
      totalSupply: t.totalSupply,
      sold: t.sold,
      imageURI: t.imageURI,
    }));
    setOwnedTickets(parsed);
  };

  fetchTickets();
  fetchOwnedTickets();
}, [contract]);


  const ticketsToShow = searchedTickets ?? tickets;

  return (
    <div
      className="h-screen text-white relative overflow-x-hidden overflow-y-auto [::-webkit-scrollbar]:hidden [scrollbar-width:none]"
      style={{
        backgroundColor: "#0b1120",
        backgroundImage:
          "radial-gradient(circle at top, #111827 0%, rgba(11, 17, 32, 0.95) 40%, #0b1120 95%)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
      }}
    >
      <Toaster />
      <div className="w-full flex justify-center">
        <div className="min-w-full max-w-100 flex flex-col gap-8 px-4 mt-10">
          <div className="flex flex-col gap-1">
            <div className="text-3xl font-bold">Available Tickets</div>
            <div className="text-gray-600">
              Browse and view all available ticket NFTs
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="w-fit bg-gray-900 flex justify-start items-center px-1 py-1 rounded-lg border border-[#1e293b] gap-0.5">
            <div className={`${!switchTickets ? "bg-gray-950" : ""} px-3 py-1.5 rounded-lg cursor-pointer`}
                onClick={() => setSwitchTickets(false)}
            >
              All Tickets
            </div>
            <div className={`${switchTickets ? "bg-gray-950" : ""} px-3 py-1.5 rounded-lg cursor-pointer`}
                onClick={() => setSwitchTickets(true)}
            >
              My Tickets
            </div>
          </div>

          {/* Search Bar */}
          <div className="h-10 w-full grid grid-cols-12 gap-2">
            <input
              type="text"
              className="col-span-10 bg-gray-900 rounded-lg border border-[#1e293b] px-3"
              placeholder="Search tickets..."
              ref={searchRef}
              onChange={searchChange}
            />
            <div className="bg-gray-900 col-span-2 rounded-lg border border-[#1e293b] flex items-center px-3">
              All Tickets
            </div>
          </div>

          {/* Ticket Grid */}
          <div className="grid sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 w-max mx-auto">
            {
                !switchTickets ? ticketsToShow?.map(({ name, price, totalSupply, sold, imageURI }, index) => (
                    <Ticket
                        name={name}
                        price={price}
                        leftTickets={totalSupply - sold}
                        imageURI={imageURI}
                        key={index}
                    />
                    )) : 
                    ownedTickets?.map(({ name, price, totalSupply, sold, imageURI }, index) => (
                    <Ticket
                        name={name}
                        price={price}
                        leftTickets={totalSupply - sold}
                        imageURI={imageURI}
                        key={index}
                    />
                    ))
            }
          </div>
        </div>
      </div>
    </div>
  );
};
