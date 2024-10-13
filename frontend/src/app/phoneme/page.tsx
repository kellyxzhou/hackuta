"use client";
import Practice from "@/components/Practice";
import React from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/navbar";

export default function page() {
    const searchParams = useSearchParams(); // No destructuring

    return (
        <div>
            <Navbar />
            <Practice
                phoneme={searchParams.get("phoneme") || ""}
                sentence1={searchParams.get("sentence1") || ""}
                sentence2={searchParams.get("sentence2") || ""}
                sentence3={searchParams.get("sentence3") || ""}
                commonissues={searchParams.get("commonissues") || ""}
            />
        </div>
    );
}
