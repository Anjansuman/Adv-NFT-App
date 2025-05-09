import axios from "axios";
import FormData from "form-data";


export const PinataUpload = async (fileBuffer: Buffer<ArrayBuffer>, fileName: string, fileContentType: string) => {
    // Create FormData
    const formData = new FormData();
    formData.append('file', fileBuffer, {
    filename: fileName,
    contentType: fileContentType
    });

    // Upload to Pinata
    const response = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS',
    formData,
    {
        headers: {
        ...formData.getHeaders(),
        'pinata_api_key': process.env.PINATA_API_KEY,
        'pinata_secret_api_key': process.env.PINATA_SECRET_KEY
        },
        maxContentLength: Infinity,
        maxBodyLength: Infinity
    }
    );

    return await response.data.IpfsHash;

}