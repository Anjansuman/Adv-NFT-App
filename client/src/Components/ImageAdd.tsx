import { useState, useRef } from "react";
import axios from "axios";

const PINATA_API_KEY = import.meta.env.VITE_PINATA_API_KEY;
const PINATA_SECRET_API_KEY = import.meta.env.VITE_PINATA_SECRET_KEY;

export const ImageAdd = () => {
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile && selectedFile.type.startsWith("image/")) {
            setFile(selectedFile);
            // Create preview URL
            const reader = new FileReader();
            reader.onload = () => {
                setPreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(selectedFile);
        } else {
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
            setFile(null);
            setPreviewUrl(null);
            alert("Please select a valid image file (JPEG, PNG, etc.)");
        }
    };

    const handleSubmit = async () => {
        if (!file) return;
        
        setIsUploading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const backend = import.meta.env.VITE_BACKEND_URL;
            console.log("Uploading to:", backend);
            const response = await axios.post(`${backend}/upload`, formData);
            
            const cid = response.data.cid;
            const ipfsUrl = `https://ipfs.io/ipfs/${cid}`;
            
            console.log("IPFS CID:", cid);
            alert(`Upload successful!\nCID: ${cid}\nView at: ${ipfsUrl}`);

        } catch (error) {
            console.error("Upload error:", error);
            alert("Upload failed. Please try again.");
        } finally {
            setIsUploading(false);
        }
    };

    const handleRemoveImage = () => {
        setFile(null);
        setPreviewUrl(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <div className="space-y-4 p-4 max-w-md mx-auto">
            {/* File input with preview */}
            <div className="flex flex-col items-center gap-4">
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="image-upload"
                    disabled={isUploading}
                />
                
                <label 
                    htmlFor="image-upload"
                    className={`w-full py-2 px-4 rounded-lg text-center cursor-pointer transition-colors ${
                        isUploading 
                            ? "bg-gray-300 cursor-not-allowed" 
                            : "bg-blue-500 hover:bg-blue-600 text-white"
                    }`}
                >
                    {isUploading ? "Uploading..." : "Choose Image"}
                </label>
                
                {previewUrl && (
                    <div className="relative w-full">
                        <div className="border-2 border-gray-200 rounded-lg overflow-hidden">
                            <img 
                                src={previewUrl} 
                                alt="Preview" 
                                className="w-full h-48 object-contain bg-gray-100"
                            />
                        </div>
                        {!isUploading && (
                            <button
                                onClick={handleRemoveImage}
                                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                                aria-label="Remove image"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                        )}
                    </div>
                )}
            </div>
            
            {/* File info */}
            {file && (
                <div className="text-sm text-gray-600 p-2 bg-gray-50 rounded">
                    <p><span className="font-medium">Name:</span> {file.name}</p>
                    <p><span className="font-medium">Size:</span> {(file.size / 1024).toFixed(2)} KB</p>
                    <p><span className="font-medium">Type:</span> {file.type}</p>
                </div>
            )}
            
            {/* Submit button */}
            <button
                onClick={handleSubmit}
                disabled={!file || isUploading}
                className={`w-full py-2 px-4 rounded-lg flex justify-center items-center ${
                    file && !isUploading
                        ? "bg-green-500 hover:bg-green-600 text-white cursor-pointer" 
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                } transition-colors`}
            >
                {isUploading ? (
                    <span className="flex items-center gap-2">
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Uploading...
                    </span>
                ) : (
                    "Upload to IPFS"
                )}
            </button>
        </div>
    );
};