import { useState } from "react";
import axios from "axios";

const PINATA_API_KEY = import.meta.env.VITE_PINATA_API_KEY;
const PINATA_SECRET_API_KEY = import.meta.env.VITE_PINATA_SECRET_KEY;

export const ImageAdd = () => {
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile && selectedFile.type.startsWith("image/")) {
            alert("Image set");
            setFile(selectedFile);
        } else {
            event.target.value = "";
        }
    };

    const handleSubmit = async () => {
        if (!file) return;
        
        const formData = new FormData();
        formData.append('file', file);

        try {
            const backend = import.meta.env.VITE_BACKEND_URL;
            console.log(backend);
            const response = await axios.post(`${backend}/upload`, formData, {
                headers: {
                    "Content-Type": 'multipart/form-data'
                }
            });

            const cid = await response.data.cid;
            console.log(cid);
            alert(cid);

        } catch (error) {
            console.error("Error: ", error);
            alert(error);
        } finally {

        }
    };

    return (
        <div>
            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="bg-blue-500 py-3 px-4 rounded-lg cursor-pointer"
            />
            <div
                className="px-4 py-3 mt-3 bg-blue-600 rounded-lg cursor-pointer flex justify-center items-center"
                onClick={handleSubmit}
            >
                Submit
            </div>
        </div>
    );
};
