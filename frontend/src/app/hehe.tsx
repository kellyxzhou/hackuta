import Image from "next/image";

import { Jua } from "next/font/google";

const jua = Jua({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-jua",
    weight: ["400"],
});

export default function Home() {
    return (
        <div>
            <h1 className={`${jua.className}`}>Home</h1>
        </div>
    );
}
