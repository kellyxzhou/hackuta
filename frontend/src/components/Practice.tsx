import React from "react";

export default function Practice(props: any) {
    return (
        <div className="mx-auto mt-16 max-w-6xl p-8 bg-white rounded-lg shadow-2xl">
            <h1 className="text-4xl font-extrabold text-center mb-8 text-gray-800">
                Practice "{props.phoneme}"
            </h1>
            <p className="text-lg text-gray-600 mb-4 text-center">
                Practice the phoneme "
                <span className="font-semibold">{props.phoneme}</span>" by
                saying the following sentences:
            </p>

            <div className="space-y-6">
                <p className="text-xl text-gray-700 font-medium">
                    {props.sentence1}
                </p>
                <p className="text-xl text-gray-700 font-medium">
                    {props.sentence2}
                </p>
                <p className="text-xl text-gray-700 font-medium">
                    {props.sentence3}
                </p>
            </div>

            <div className="mt-8 p-4 bg-red-100 border-l-4 border-red-400 rounded-lg">
                <h2 className="text-lg font-semibold text-primary">
                    Common Issues:
                </h2>
                <p className="text-gray-600">{props.commonissues}</p>
            </div>
        </div>
    );
}
