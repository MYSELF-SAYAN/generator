import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GrUpload } from "react-icons/gr";
import { MdOutlineCancel } from "react-icons/md";
import { FaCopy } from "react-icons/fa";
import { TiTick } from "react-icons/ti";
const ColorCodeGenerator = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [response, setResponse] = useState([]);
    const [upload, setUpload] = useState(false);
    const [loading, setLoading] = useState(false);
    const [copiedIndex, setCopiedIndex] = useState(null); // New state to track copied text index
    const genAI = new GoogleGenerativeAI("AIzaSyB1SHupOSqhJ-OnaIZ5JKa0NNBd8uvBCF8");

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
            setUpload(true);
            setLoading(true);
            const imagePart = await fileToGenerativePart(file);
            await run(imagePart);
            setLoading(false);
        }
    };

    const fileToGenerativePart = async (file) => {
        const base64EncodedDataPromise = new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result.split(',')[1]);
            reader.readAsDataURL(file);
        });
        return {
            inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
        };
    };

    const run = async (imagePart) => {
        const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
        const prompt = "Give all accurate color codes from the image give only color codes:";
        const result = await model.generateContent([prompt, imagePart]);
        const response = await result.response;
        const text = response.text();
        const colorCodesArray = text.split('\n').filter(code => code.trim() !== '');
        colorCodesArray.shift();
        colorCodesArray.pop();
        setResponse([...new Set(colorCodesArray)]);
    };

    const handleCopyText = async (code, index) => {
        await navigator.clipboard.writeText(code);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000); // Reset copiedIndex after 2 seconds
    };

    return (
        <div className="container mx-auto p-4 flex flex-col items-center">
            <label className={`flex ${upload ? "hidden" : "true"} items-center space-x-2 cursor-pointer flex-col`}>
                <span className="p-3 rounded-full bg-gray-200">
                    <GrUpload className=" text-black" />
                </span>
                <span>Upload Image</span>
                <input
                    type="file"
                    onChange={handleImageChange}
                    accept=".png, .jpg, .jpeg"
                    className="hidden"
                />
            </label>
            <div className={`${upload ? "block" : "hidden"}`}>
                {selectedImage && <div className="mt-4">
                    <p className="text-lg font-bold text-center ">Selected Image:</p>
                    <div className="relative">
                        <img src={URL.createObjectURL(selectedImage)} alt="Selected" className="mt-2 rounded w-[350px]" />
                        <span className="absolute top-2 right-2 p-2 bg-black text-white rounded-full" onClick={() => { setUpload(false) }}><MdOutlineCancel /></span>
                    </div>
                </div>}
            </div>

            {loading ? (
                <div className="mt-4 text-center">
                    <p className="text-lg font-bold">Loading...</p>
                    <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col gap-2 mt-4 max-h-[300px] w-full overflow-y-auto p-5 border border-black rounded-3xl ">
                    {response.map((code, index) => (
                        <div key={index} className="flex">
                            <div className={`min-h-[100px] w-full text-white flex  items-center justify-center rounded-l-3xl`} style={{ backgroundColor: code }}>
                                <p>{code}</p>
                            </div>
                            <span className="w-10 flex items-center justify-center border border-black cursor-pointer rounded-r-3xl" onClick={() => handleCopyText(code, index)}>
                                {copiedIndex === index ? <TiTick className=" text-5xl text-green-600"/> : <FaCopy />}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ColorCodeGenerator;
