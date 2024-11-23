import React, { useState, useEffect } from 'react';
import icpdao3 from '/icpdao3.webp';
import vote from '/vote.png';
import { Users, List, Award, Star, Table } from "lucide-react";

const PointSystemContent = () => {

    return (
        <>
            <div className="bg-white dark:bg-gray-800 py-20">
                <div className="relative isolate px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl">
                        <div className="text-center">
                            {/* Icon Added */}
                            <div className="flex justify-center mb-4">
                                <Award className="w-12 h-12 text-orange-500 dark:text-orange-400" />
                            </div>
                            <h1 className="text-4xl font-bold tracking-tight dark:text-white text-gray-900 sm:text-6xl">
                                VP & Point System
                            </h1>
                            <p className="mt-6 text-lg leading-8 dark:text-gray-300 text-gray-900">
                                We ensure fair influence by granting each user a base VP, with NFT holders gaining additional VPs.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="py-12 sm:py-22 bg-gray-50 dark:bg-gray-900">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    {/* Header Section */}
                    <div className="mx-auto max-w-2xl sm:text-center mb-10">
                        <h2 className="text-4xl font-bold tracking-tight flex items-center justify-center gap-2 dark:text-white text-gray-900">
                            <Users className="w-8 h-8 text-orange-500 dark:text-orange-400" />
                            Voting Power
                        </h2>
                    </div>

                    {/* Content Section */}
                    <div className="grid max-w-none grid-cols-1 lg:grid-cols-2 gap-10">
                        <div className="flex flex-col justify-center lg:pr-8">
                            <div className="lg:max-w-lg">
                                <ul className="list-disc pl-6 text-lg text-gray-900 dark:text-gray-300">
                                    <li>
                                        Each user without an ICP Protector Genesis NFT will have 1
                                        Voting Power.
                                    </li>
                                    <li className="mt-4">
                                        With 1 ICP Protector Genesis NFT, the user will have 3 Voting
                                        Power.
                                    </li>
                                    <li className="mt-4">
                                        A user can have a max Voting Power of 30 regardless of the
                                        number of NFTs held. Suspicious downvotes or attempts to
                                        bypass the cap will result in reduced voting power.
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="flex items-center justify-center">
                            <img
                                src={vote}
                                alt="Voting Power"
                                className="rounded-lg shadow-lg w-3/4"
                            />
                        </div>
                    </div>
                    <div className="relative overflow-x-auto shadow-lg sm:rounded-lg mt-10 bg-white dark:bg-gray-800">
                        <table className="w-full text-sm text-gray-800 dark:text-gray-300">
                            <thead className="text-xs uppercase bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800">
                                <tr>
                                    {["User", "Genesis NFT", "Count", "Total VP"].map((header) => (
                                        <th
                                            key={header}
                                            className="px-6 py-4 text-center font-semibold text-gray-900 dark:text-white"
                                        >
                                            {header}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { user: "Protector 1", nft: "No", count: 0, vp: 1 },
                                    { user: "Protector 2", nft: "Yes", count: 1, vp: 3 },
                                    { user: "Protector 3", nft: "Yes", count: 5, vp: 15 },
                                    { user: "Protector 4", nft: "Yes", count: 11, vp: 30 },
                                    { user: "Protector 5", nft: "Yes", count: 15, vp: 30 },
                                ].map(({ user, nft, count, vp }, index) => (
                                    <tr
                                        key={user}
                                        className={`hover:scale-[1.01] transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-700 ${index % 2 === 0
                                            ? "bg-gray-50 dark:bg-gray-900"
                                            : "bg-white dark:bg-gray-800"
                                            }`}
                                    >
                                        <td className="px-6 py-4 text-center font-medium">{user}</td>
                                        <td className="px-6 py-4 text-center">
                                            {nft === "Yes" ? (
                                                <span className="inline-block px-2 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full dark:text-green-200 dark:bg-green-800">
                                                    Yes
                                                </span>
                                            ) : (
                                                <span className="inline-block px-2 py-1 text-xs font-semibold text-red-700 bg-red-100 rounded-full dark:text-red-200 dark:bg-red-800">
                                                    No
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-center">{count}</td>
                                        <td className="px-6 py-4 text-center font-bold text-blue-700 dark:text-blue-400">
                                            {vp}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
            <div className="py-24 sm:py-32 bg-gray-50 dark:bg-gray-900">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    {/* Section Header */}
                    <div className="mx-auto max-w-2xl sm:text-center">
                        <h2 className="text-4xl font-bold tracking-tight flex items-center justify-center gap-2 dark:text-white text-gray-900">
                            <Star className="w-8 h-8 text-orange-500 dark:text-orange-400" />
                            Point System
                        </h2>
                    </div>

                    {/* Content Section */}
                    <div className="grid max-w-none grid-cols-1 lg:grid-cols-2 mt-10 gap-10">
                        <div className="flex flex-col justify-center lg:pr-8">
                            <div className="lg:max-w-lg">
                                <ul className="space-y-6 text-lg text-gray-800 dark:text-gray-300">
                                    <li className="flex items-start gap-3">
                                        <span className="inline-block p-2 rounded-full bg-orange-200 dark:bg-orange-500">
                                            <Star className="w-6 h-6 text-orange-600 dark:text-white" />
                                        </span>
                                        <span>Each user without an NFT will receive 1 Point for each vote.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="inline-block p-2 rounded-full bg-orange-200 dark:bg-orange-500">
                                            <Star className="w-6 h-6 text-orange-600 dark:text-white" />
                                        </span>
                                        <span style={{ textAlign:'start' }}>Each user with an NFT will receive 5 Points for each vote.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="inline-block p-2 rounded-full bg-orange-200 dark:bg-orange-500">
                                            <Star className="w-6 h-6 text-orange-600 dark:text-white" />
                                        </span>
                                        <span style={{ textAlign:'start' }}>
                                            Proposal creators will receive 2-20 Points depending on their contributions:
                                            <ol className="list-decimal pl-8 mt-4 space-y-3 text-gray-700 dark:text-gray-400">
                                                {[
                                                    "Why a User thinks it's a scam.",
                                                    "Explanation with detailed reasons.",
                                                    "Includes potential scam handles.",
                                                    "Trading-related findings.",
                                                    "Includes trading history screenshots.",
                                                    "Potential insider connections.",
                                                    "Verified scam project wallets.",
                                                ].map((item, index) => (
                                                    <li key={index}>
                                                        <span className="font-bold text-blue-700 dark:text-blue-500">
                                                            Hint {"+".repeat(index)}:
                                                        </span>{" "}
                                                        {item}
                                                    </li>
                                                ))}
                                            </ol>
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="flex items-center justify-center">
                            <img
                                src={icpdao3}
                                alt="DAO System"
                                className="rounded-lg shadow-lg"
                                style={{ width: "70%" }}
                            />
                        </div>
                    </div>

                    {/* Points Table */}
                    <div className="relative overflow-x-auto shadow-lg sm:rounded-lg mt-16 bg-white dark:bg-gray-800">
                        <div className="p-4 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 flex items-center gap-2">
                            <Table className="w-6 h-6 text-gray-800 dark:text-gray-200" />
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Point Allocation Table</h3>
                        </div>
                        <table className="w-full text-sm text-gray-800 dark:text-gray-300">
                            <thead className="text-xs uppercase bg-gray-100 dark:bg-gray-700">
                                <tr>
                                    {[
                                        "User",
                                        "Hint",
                                        "Hint+Text",
                                        "H+T+X",
                                        "H+T+X+W",
                                        "H+T+X+W+SC",
                                        "H+T+X+W+SC+PIW",
                                        "H+T+X+W+SC+PIW+PoS",
                                        "Points",
                                    ].map((header) => (
                                        <th
                                            key={header}
                                            className="px-4 py-3 text-center font-semibold text-gray-900 dark:text-white"
                                        >
                                            {header}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { user: 1, hint: "X", hintText: "", htx: "", htW: "", htSC: "", piw: "", pos: "", points: 2 },
                                    { user: 2, hint: "", hintText: "X", htx: "", htW: "", htSC: "", piw: "", pos: "", points: 4 },
                                    { user: 3, hint: "", hintText: "", htx: "X", htW: "", htSC: "", piw: "", pos: "", points: 6 },
                                    { user: 4, hint: "", hintText: "", htx: "", htW: "X", htSC: "", piw: "", pos: "", points: 8 },
                                    { user: 5, hint: "", hintText: "", htx: "", htW: "", htSC: "X", piw: "", pos: "", points: 10 },
                                    { user: 6, hint: "", hintText: "", htx: "", htW: "", htSC: "", piw: "X", pos: "", points: 15 },
                                    { user: 7, hint: "", hintText: "", htx: "", htW: "", htSC: "", piw: "", pos: "X", points: 20 },
                                ].map(({ user, hint, hintText, htx, htW, htSC, piw, pos, points }, index) => (
                                    <tr
                                        key={user}
                                        className={`hover:bg-gray-100 dark:hover:bg-gray-700 ${index % 2 === 0 ? "bg-gray-50 dark:bg-gray-900" : "bg-white dark:bg-gray-800"
                                            }`}
                                    >
                                        <td className="px-4 py-4 text-center">{user}</td>
                                        <td className="px-4 py-4 text-center">{hint}</td>
                                        <td className="px-4 py-4 text-center">{hintText}</td>
                                        <td className="px-4 py-4 text-center">{htx}</td>
                                        <td className="px-4 py-4 text-center">{htW}</td>
                                        <td className="px-4 py-4 text-center">{htSC}</td>
                                        <td className="px-4 py-4 text-center">{piw}</td>
                                        <td className="px-4 py-4 text-center">{pos}</td>
                                        <td className="px-4 py-4 text-center font-bold text-blue-700 dark:text-blue-400">
                                            {points}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </>
    );
};

export default PointSystemContent;
