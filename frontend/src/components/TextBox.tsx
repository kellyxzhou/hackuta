import React from "react";
import Image from "next/image";

const TextBox = () => {
    return (
        <div className="border-2 w-5/6 border-grey rounded-xl p-4 shadow-xl mx-16 text-gray-800">
            <div className="flex items-center ml-3 mt-3">
                <Image src="/Logo.png" width={30} height={20} alt={"logo"} />
                <div className="rounded-xl px-5 py-2 text-black">hehe</div>
            </div>
            <div className="bg-gray-100 ml-32 rounded-xl px-5 py-2 text-black mt-8">
                Waiting for user input...
            </div>
        </div>
    );
};

export default TextBox;
