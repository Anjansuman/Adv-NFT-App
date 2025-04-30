import { useRef } from "react";
import { ImageAdd } from "./ImageAdd";


export const MintPage = () => {

    const name = useRef<HTMLInputElement>(null);
    const price = useRef<HTMLInputElement>(null);
    const totalSupply = useRef<HTMLInputElement>(null);


    return <div className="h-full w-full p-4">
        <div className="text-4xl font-bold mb-14">
            Create a New Ticket
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
                        onChange={(e) => {
                            if (name.current) {
                                name.current.value = e.target.value;
                            }
                        }}
                    />
                </div>
                <div>
                    <div className="text-lg font-semibold">
                        Price (in Rs.):
                    </div>
                    <input type="number" className="bg-gray-900 h-10 w-80 rounded-lg border border-gray-700 px-2" 
                        onChange={(e) => {
                            if (price.current) {
                                price.current.value = e.target.value;
                            }
                        }}
                    />
                </div>
                <div>
                    <div className="text-lg font-semibold">
                        total supply:
                    </div>
                    <input type="number" className="bg-gray-900 h-10 w-80 rounded-lg border border-gray-700 px-2" 
                        onChange={(e) => {
                            if (totalSupply.current) {
                                totalSupply.current.value = e.target.value;
                            }
                        }}
                    />
                </div>
                <div className="flex justify-center bg-green-500 hover:bg-green-600 transition-colors py-2 px-4 rounded-lg cursor-pointer " >
                    Submit
                </div>
            </div>
        </div>
    </div>
}