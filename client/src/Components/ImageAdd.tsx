import { useState, useRef } from "react";
import { useRecoilState } from "recoil";
import FileAtom from "../Atoms/FileAtom";

export const ImageAdd = () => {
    const [file, setFile] = useRecoilState(FileAtom);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
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

    return (
        <div className="space-y-4 max-w-md mx-auto">
            {/* File input with preview */}
            <div className="flex flex-col items-center gap-4">
                
                {previewUrl && (
                    <div className="relative w-full">
                        <div className="border-2 border-gray-200 rounded-lg overflow-hidden">
                            <img 
                                src={previewUrl} 
                                alt="Preview" 
                                className="w-full h-48 object-contain bg-gray-100"
                            />
                        </div>
                    </div>
                )}
                {/* File info */}
                {file && (
                    <div className="text-sm w-full text-gray-600 p-2 bg-gray-50 rounded">
                        <p><span className="font-medium">Name:</span> {file.name}</p>
                        <p><span className="font-medium">Size:</span> {(file.size / 1024).toFixed(2)} KB</p>
                        <p><span className="font-medium">Type:</span> {file.type}</p>
                    </div>
                )}

                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="image-upload"
                />
                
                <label 
                    htmlFor="image-upload"
                    className={`w-[410px] py-2 px-4 rounded-lg text-center cursor-pointer transition-colors bg-blue-500 hover:bg-blue-600 text-white `}
                >
                    Choose Image
                </label>
            </div>
            
        </div>
    );
};