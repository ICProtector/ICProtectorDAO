import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '/logoo.png';
import icp from '/icp.png';
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
                            <h1 className="text-4xl font-bold tracking-tight dark:text-white text-gray-900 sm:text-6xl">Our Point System</h1>
                            <p className="mt-6 text-lg leading-8 dark:text-gray-300 text-gray-900">Unlock exclusive rewards and benefits with our innovative point system. Earn points for every action and redeem them for exciting rewards.</p>
                            <div className="mt-10 flex items-center justify-center gap-x-6">
                                <a href="#" className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Get started</a>
                                <a href="#" className="text-sm font-semibold leading-6 dark:text-gray-300">Learn more <span aria-hidden="true">→</span></a>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div className="py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl sm:text-center">
                        <h2 className="text-3xl font-bold tracking-tight dark:text-white text-gray-900 sm:text-4xl">Unlock Exciting Rewards with Our Point System</h2>
                        <p className="mt-6 text-lg leading-8 dark:text-white text-gray-900">
                           
                        </p>
                    </div>
                    <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
                        <div className="p-8 sm:p-10 lg:flex-auto">
                            <h3 className="text-2xl font-bold tracking-tight dark:text-white text-gray-900">Lifetime membership</h3>
                            <p className="mt-6 text-base leading-7 dark:text-white text-gray-900">
                            Join our loyalty program and start earning points with every purchase. Redeem your points for discounts, access exclusive deals, and enjoy personalized rewards tailored just for you.
                            </p>
                            <div className="mt-10 flex items-center gap-x-4">
                                <h4 className="flex-none text-sm font-semibold leading-6 text-indigo-600">What’s included</h4>
                                <div className="h-px flex-auto bg-gray-100" />
                            </div>
                            <ul
                                role="list"
                                className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 dark:text-white text-gray-900 sm:grid-cols-2 sm:gap-6"
                            >
                                {includedFeatures.map((feature) => (
                                    <li key={feature} className="flex gap-x-3">
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
                            <div className="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
                                <div className="mx-auto max-w-xs px-8">
                                    <p className="text-base font-semibold text-gray-900">Join Our Loyalty Program Today</p>
                                    <p className="mt-6 flex items-baseline justify-center gap-x-2">
                                        <span className="text-5xl font-bold tracking-tight text-gray-900">Free</span>
                                        <span className="text-sm font-semibold leading-6 tracking-wide text-gray-900">to join</span>
                                    </p>
                                    <a
                                        href="#"
                                        className="mt-10 block w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Join Now
                                    </a>
                                    <p className="mt-6 text-xs leading-5 dark:text-white text-gray-900">
                                        Already a member? <a href="#" className="text-indigo-600 underline">Sign in</a> to check your points balance.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PointSystemContent;
