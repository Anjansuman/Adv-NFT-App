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
            const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
                maxContentLength: Infinity,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'pinata_api_key': PINATA_API_KEY,
                    'pinata_secret_api_key': PINATA_SECRET_API_KEY,
                },
            });

            console.log("IPFS Hash:", res.data.IpfsHash);
            alert(`Uploaded successfully! IPFS CID: ${res.data.IpfsHash}`);
        } catch (err) {
            console.error("Error uploading:", err);
            alert("Upload failed. See console for error.");
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
