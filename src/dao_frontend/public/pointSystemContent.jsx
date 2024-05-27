import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import icpdao3 from '/icpdao3.webp';
import vote from '/vote.png';
import { useTheme } from '../contexts/ThemeContext';

const PointSystemContent = () => {

    const { darkMode, toggleTheme } = useTheme();

    const includedFeatures = [
        "Earn points for every purchase",
        "Redeem points for discounts",
        "Access exclusive member-only deals",
        "Receive personalized rewards and offers",
        "Track your points and rewards easily",
    ];
    const gradientClass = darkMode ? 'bg-gradient-to-r from-gray-950 to-gray-950' : 'bg-gradient-to-b from-orange-200 to-orange-500';
    const buttonClass = darkMode ? 'bg-gradient-to-r from-red-600 to-red-900' : 'bg-gradient-to-r from-red-400 to-red-600';


    return (
        <>
            <div className="">
                <div className="relative isolate px-6  lg:px-8">

                    <div className="mx-auto max-w-2xl py-20 sm:py-20 lg:py-26">
                        <div className="hidden sm:mb-8 sm:flex sm:justify-center">

                        </div>
                        <div className="text-center">
                            <h1 className="text-4xl font-bold tracking-tight dark:text-white text-gray-900 sm:text-6xl">VP & Point System</h1>
                            <p className="mt-6 text-lg leading-8 dark:text-gray-300 text-gray-900">We ensures fair influence by granting each user a base VP, with NFT holders gaining additional VPs </p>
                        </div>
                    </div>

                </div>
            </div>
            <div className="py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl sm:text-center">
                        <h2 className="text-3xl font-bold tracking-tight dark:text-white text-gray-900 sm:text-4xl">Voting Power</h2>

                    </div>
                    <div className="grid max-w-none grid-cols-1 lg:grid-cols-2">
                        <div className="flex flex-col justify-center lg:pr-8 pt-6 lg:pt-4">
                            <div className="lg:max-w-lg">
                                <ul className="list-disc pl-5 mt-6 text-lg text-gray-900 dark:text-white">
                                    <li className='text-left mt-6 text-lg text-gray-900 dark:text-white'>Each user without a ICP Protector Genesis NFT will have 1 Voting Power.</li>
                                    <li className='text-left mt-2 text-lg text-gray-900 dark:text-white'>With 1 ICP Protector Genesis NFT, the User will have 3 Voting Power.</li>
                                    <li className='text-left mt-2 text-lg text-gray-900 dark:text-white'>
                                        A User can have a max Voting Power of 30. (Doesn't matter how many NFTs the User hold.
                                        (Reducing voting power if we see suspicious downvotes in the code or attempted bypassing the 30 voting power cap)
                                        For example:
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="flex items-center justify-center w-[100%] h-[100%] md:w-full">
                        
                        <img src={vote} alt="DAO Image" style={{ width: '70%' }} /></div>
                    </div>

                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">

                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 table-bordered">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-center dark:text-white">
                                        User
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-center dark:text-white">
                                        Genesis NFT
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-center dark:text-white">
                                        Count
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-center dark:text-white">
                                        Total VP
                                    </th>
                                </tr>
                            </thead>
                            <tbody className='mt-2'>

                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td scope="row" className="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Protector 1
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        No
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        0
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        1
                                    </td>
                                </tr>
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td scope="row" className="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Protector 2
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        Yes
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        1
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        3
                                    </td>
                                </tr>
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td scope="row" className="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Protector 3
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        Yes
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        5
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        15
                                    </td>
                                </tr>
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td scope="row" className="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Protector 4
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        Yes
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        11
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        30
                                    </td>
                                </tr>
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td scope="row" className="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Protector 5
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        Yes
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        15
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        30
                                    </td>
                                </tr>


                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div className="py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl sm:text-center">
                        <h2 className="text-3xl font-bold tracking-tight dark:text-white text-gray-900 sm:text-4xl">Point System</h2>

                    </div>
                    <div className="grid max-w-none grid-cols-1 lg:grid-cols-2 mt-5">
                        <div className="flex flex-col justify-center lg:pr-8 pt-6 lg:pt-4">
                            <div className="lg:max-w-lg">
                                <ul className="list-disc pl-5 mt-6 text-lg text-gray-900 dark:text-white">
                                    <li className='text-left mt-6 text-lg text-gray-900 dark:text-white'>Each User without an NFT will receive 1 Point for each vote.</li>
                                    <li className='text-left mt-2 text-lg text-gray-900 dark:text-white'>Each User with an NFT will receive 5 Points for each vote.</li>
                                    <li className='text-left mt-2 text-lg text-gray-900 dark:text-white'>
                                        Proposal creators will receive 2-20 Points depending on the following list:
                                        <ol className="list-decimal list-inside text-gray-900 dark:text-white">
                                            <li className="mb-2">
                                                <span className="font-bold text-blue-700 dark:text-blue-500">Hint:</span> Why a User thinks it's a scam.
                                            </li>
                                            <li className="mb-2">
                                                <span className="font-bold text-blue-700 dark:text-blue-500">Hint + Text:</span> Why a User thinks it's a scam.
                                            </li>
                                            <li className="mb-2">
                                                <span className="font-bold text-blue-700 dark:text-blue-500">Hint + Text + X handle:</span> Why a User thinks it's a scam + handle of the potential scam.
                                            </li>
                                            <li className="mb-2">
                                                <span className="font-bold text-blue-700 dark:text-blue-500">Hint + Text + X handle + Trading Investigations:</span> Why a User thinks it's a scam + handle of the potential scam + trading investigations.
                                            </li>
                                            <li className="mb-2">
                                                <span className="font-bold text-blue-700 dark:text-blue-500">Hint + Text + X handle + Trading + screenshots of the Trading history:</span> Why a User thinks it's a scam + handle of the potential scam + trading investigations + screenshots of the trading history.
                                            </li>
                                            <li className="mb-2">
                                                <span className="font-bold text-blue-700 dark:text-blue-500">Hint + Text + X handle + Trading + screenshots + Potential Insider Wallet:</span> Why a User thinks it's a scam + handle of the potential scam + trading investigations + screenshots of the trading history + potential insider wallet.
                                            </li>
                                            <li className="mb-2">
                                                <span className="font-bold text-blue-700 dark:text-blue-500">Hint + Text + X handle + Trading + screenshots + P.I Wallet + Proof of Scam Project Wallet:</span> Why a User thinks it's a scam + handle of the potential scam + trading investigations + screenshots of the trading history + potential insider wallet + proof of scam project wallet.
                                            </li>
                                        </ol>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="flex items-center justify-center w-[100%] h-[100%] md:w-full">                        
                        <img src={icpdao3} alt="DAO Image" style={{ width: '70%' }} /></div>
                    </div>

                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">

                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 table-bordered">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-center dark:text-white">
                                        User
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-center dark:text-white">
                                        Hint
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-center dark:text-white">
                                        Hint+Text
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-center dark:text-white">
                                        H+T+X
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-center dark:text-white">
                                        H+T+X+W
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-center dark:text-white">
                                        H+T+X+W+SC
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-center dark:text-white">
                                        H+T+X+W+SC+
                                        PIW
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-center dark:text-white">
                                        H+T+X+W+SC+

                                        PIW+PoS
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-center dark:text-white">
                                        Points
                                    </th>
                                </tr>
                            </thead>
                            <tbody className='mt-2'>

                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td scope="row" className="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        1
                                    </td>
                                    <td className="px-6 py-4 text-center dark:text-white">
                                        X
                                    </td>
                                    <td className="px-6 py-4 text-center dark:text-white">
                                    </td>
                                    <td className="px-6 py-4 text-center dark:text-white">
                                    </td>
                                    <td className="px-6 py-4 text-center dark:text-white">
                                    </td>
                                    <td className="px-6 py-4 text-center dark:text-white">
                                    </td>
                                    <td className="px-6 py-4 text-center dark:text-white">
                                    </td>
                                    <td className="px-6 py-4 text-center dark:text-white">
                                    </td>
                                    <td className="px-6 py-4 text-center dark:text-white">
                                        2
                                    </td>
                                </tr>
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td scope="row" className="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        2
                                    </td>
                                    <td className="px-6 py-4 text-center dark:text-white">

                                    </td>
                                    <td className="px-6 py-4 text-center dark:text-white">X
                                    </td>
                                    <td className="px-6 py-4 text-center dark:text-white">
                                    </td>
                                    <td className="px-6 py-4 text-center dark:text-white">
                                    </td>
                                    <td className="px-6 py-4 text-center dark:text-white">
                                    </td>
                                    <td className="px-6 py-4 text-center dark:text-white">
                                    </td>
                                    <td className="px-6 py-4 text-center dark:text-white">
                                    </td>
                                    <td className="px-6 py-4 text-center dark:text-white">
                                        4
                                    </td>
                                </tr>
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td scope="row" className="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        3
                                    </td>
                                    <td className="px-6 py-4 text-center dark:text-white">

                                    </td>
                                    <td className="px-6 py-4 text-center dark:text-white">
                                    </td>
                                    <td className="px-6 py-4 text-center dark:text-white">X
                                    </td>
                                    <td className="px-6 py-4 text-center dark:text-white">
                                    </td>
                                    <td className="px-6 py-4 text-center dark:text-white">
                                    </td>
                                    <td className="px-6 py-4 text-center dark:text-white">
                                    </td>
                                    <td className="px-6 py-4 text-center dark:text-white">
                                    </td>
                                    <td className="px-6 py-4 text-center dark:text-white">
                                        6
                                    </td>
                                </tr>
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td scope="row" className="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        4
                                    </td>
                                    <td className="px-6 py-4 text-center dark:text-white">

                                    </td>
                                    <td className="px-6 py-4 text-center dark:text-white">
                                    </td>
                                    <td className="px-6 py-4 text-center dark:text-white">
                                    </td>
                                    <td className="px-6 py-4 text-center dark:text-white">
                                        X
                                    </td>
                                    <td className="px-6 py-4 text-center dark:text-white">
                                    </td>
                                    <td className="px-6 py-4 text-center dark:text-white">
                                    </td>
                                    <td className="px-6 py-4 text-center dark:text-white">
                                    </td>
                                    <td className="px-6 py-4 text-center dark:text-white">
                                        8
                                    </td>
                                </tr>
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td scope="row" className="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        5
                                    </td>
                                    <td className="px-6 py-4 text-center dark:text-white">
                                    </td>
                                    <td className="px-6 py-4 text-center dark:text-white">
                                    </td>
                                    <td className="px-6 py-4 text-center dark:text-white">
                                    </td>
                                    <td className="px-6 py-4 text-center dark:text-white">
                                    </td>
                                    <td className="px-6 py-4 text-center dark:text-white">
                                        X
                                    </td>
                                    <td className="px-6 py-4 text-center dark:text-white">
                                    </td>
                                    <td className="px-6 py-4 text-center dark:text-white">
                                    </td>
                                    <td className="px-6 py-4 text-center dark:text-white">
                                        10
                                    </td>
                                </tr>
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td scope="row" className="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        6
                                    </td>
                                    <td className="px-6 py-4 text-center dark:text-white">
                                    </td>
                                    <td className="px-6 py-4 text-center dark:text-white">
                                    </td>
                                    <td className="px-6 py-4 text-center dark:text-white">
                                    </td>
                                    <td className="px-6 py-4 text-center dark:text-white">
                                    </td>
                                    <td className="px-6 py-4 text-center dark:text-white">
                                    </td>
                                    <td className="px-6 py-4 text-center dark:text-white">
                                        X
                                    </td>
                                    <td className="px-6 py-4 text-center dark:text-white">
                                    </td>
                                    <td className="px-6 py-4 text-center dark:text-white">
                                        15
                                    </td>
                                </tr>
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td scope="row" className="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        7
                                    </td>
                                    <td className="px-6 py-4 text-center dark:text-white">
                                    </td>
                                    <td className="px-6 py-4 text-center dark:text-white">
                                    </td>
                                    <td className="px-6 py-4 text-center dark:text-white">
                                    </td>
                                    <td className="px-6 py-4 text-center dark:text-white">
                                    </td>
                                    <td className="px-6 py-4 text-center dark:text-white">
                                    </td>
                                    <td className="px-6 py-4 text-center dark:text-white">
                                    </td>
                                    <td className="px-6 py-4 text-center dark:text-white">
                                        X
                                    </td>
                                    <td className="px-6 py-4 text-center dark:text-white">
                                        20
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PointSystemContent;
