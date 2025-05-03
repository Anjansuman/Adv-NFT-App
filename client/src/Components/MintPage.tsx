import { useRef } from "react";
import { ImageAdd } from "./ImageAdd";
import { useRecoilValue } from "recoil";
import FileAtom from "../Atoms/FileAtom";
import axios from "axios";
import { ContractAtom } from "../Atoms/ContractAtom";
import { CrossIcon } from "./ui/SVGs/CrossIcon";


interface MintPageProps {
    disappearPanel: () => void
}

export const MintPage = ({ disappearPanel }: MintPageProps) => {

    const name = useRef<HTMLInputElement>(null);
    const price = useRef<HTMLInputElement>(null);
    const totalSupply = useRef<HTMLInputElement>(null);

    const file = useRecoilValue(FileAtom);
    const contract = useRecoilValue(ContractAtom);

    const submit = async () => {
        try {

            if(!contract) {
                alert("Metamask not connected!");
                return;
            }

            if(!file) {
                alert("Please select an image");
                return;
            }

            if(!name.current?.value || !price.current?.value || !totalSupply.current?.value) {
                alert("Inputs error!");
                return;
            }

            const _name = name.current.value;
            const _price = parseInt(price.current.value);
            const _totalSupply = parseInt(totalSupply.current.value);

            if(isNaN(_price) || isNaN(_totalSupply)) {
                alert("Enter valid numbers!");
                return;
            }
            
            const backend = import.meta.env.VITE_BACKEND_URL;
            console.log(backend);

            const formData = new FormData();
            formData.append('file', file);

            const response = await axios.post(`${backend}/create-ticket/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const data = await response.data;
            alert(data.message);

            const hash = data.hash;
            
            const receipt = await contract.createTicket(_name, _price, _totalSupply, hash);

            if(!receipt || receipt.status === 0) {
                alert("Token creation failed!");
            }

            alert("tickets created");

        } catch (error) {
            alert(error)
        }
    }

    return <div className="h-[80%] w-[80%] border border-white bg-gray-800 rounded-3xl absolute left-1/2 top-1/2 -translate-1/2 p-4">
        <div className="text-4xl font-bold mb-14 flex justify-between items-center px-1 ">
            <div>
                Create a New Ticket
            </div>
            <div>
                <CrossIcon size={34} onClick={disappearPanel} />
            </div>
        </div>
        <div className="flex justify-center gap-10">
            <div className="flex items-end ">
                <ImageAdd />
            </div>
            <div className="flex flex-col gap-y-4">
                <div>
                    <div className="text-lg font-semibold">
                        Name:
                    </div>
                    <input type="text" className="bg-gray-900 h-10 w-80 rounded-lg border border-gray-700 px-2"
                        ref={name}    
                    />
                </div>
                <div>
                    <div className="text-lg font-semibold">
                        Price (in Rs.):
                    </div>
                    <input type="number" className="bg-gray-900 h-10 w-80 rounded-lg border border-gray-700 px-2" 
                        ref={price}
                    />
                </div>
                <div>
                    <div className="text-lg font-semibold">
                        total supply:
                    </div>
                    <input type="number" className="bg-gray-900 h-10 w-80 rounded-lg border border-gray-700 px-2" 
                        ref={totalSupply}
                    />
                </div>
                <div className="flex justify-center bg-green-500 hover:bg-green-600 transition-colors py-2 px-4 rounded-lg cursor-pointer " 
                    onClick={submit}
                >
                    Submit
                </div>
            </div>
        </div>
    </div>
}